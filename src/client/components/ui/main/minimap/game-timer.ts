import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Timer } from "@rbxts/timer";
import { Events, Functions } from "client/network";

import { Player } from "shared/utilities/client";
import { toSeconds, toTimerFormat } from "shared/utilities/shared";
import GameStatus from "shared/structs/game-status";
import Log from "shared/logger";

const { gameStatusUpdate, setGameStatus } = Events;
const { getCurrentStormPhase } = Functions;

const BUS_COUNTDOWN_LENGTH = 10;

interface Attributes {
  readonly BusColor: Color3;
  readonly BusIcon: string;
  readonly BusIconScale: number;
  readonly StormColor: Color3;
  readonly StormIcon: string;
  readonly StormIconPosition: UDim2;
  readonly StormIconScale: number;
  readonly WaitingColor: Color3;
  readonly WaitingIcon: string;
  readonly WaitingIconScale: number;
}

@Component({
  tag: "MainUI_GameTimer",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class GameTimer extends BaseComponent<Attributes, PlayerGui["Main"]["Minimap"]["GameInfo"]["Timer"]> implements OnStart {
  public onStart(): void {
    this.update(GameStatus.Waiting);
    this.maid.GiveTask(gameStatusUpdate.connect(status => this.update(status)));
  }

  private async update(status: GameStatus): Promise<void> {
    Log.debug(`(GameTimer) Received game status update: ${GameStatus[status]}`);
    const [statusName] = GameStatus[status].gsub("StormTransition", "Waiting");
    const color = <Color3>this.attributes[<keyof typeof this.attributes>(statusName + "Color")];
    const icon = <string>this.attributes[<keyof typeof this.attributes>(statusName + "Icon")];
    const iconScale = <number>this.attributes[<keyof typeof this.attributes>(statusName + "IconScale")];
    const position = <Maybe<UDim2>>this.attributes[<keyof typeof this.attributes>(statusName + "IconPosition")];
    this.instance.IconBackground.ImageColor3 = color;
    this.instance.IconBackground.Icon.Image = icon;
    this.instance.IconBackground.Icon.Size = UDim2.fromScale(iconScale, iconScale);
    this.instance.IconBackground.Icon.Position = position ?? UDim2.fromScale(0.5, 0.5);
    this.instance.Value.Visible = status !== GameStatus.Waiting;

    if (status === GameStatus.Waiting) return;
    switch(status) {
      case GameStatus.Bus: {
        const timer = new Timer(BUS_COUNTDOWN_LENGTH);
        timer.completed.Connect(async () => await setGameStatus(GameStatus.StormTransition));
        this.connectTimerUpdates(timer);
        break;
      }
      case GameStatus.Storm:
      case GameStatus.StormTransition: {
        const stormPhase = await getCurrentStormPhase();
        const timerLength = toSeconds(status === GameStatus.Storm ? stormPhase.shrinkTime : stormPhase.timeUntilShrinking);
        const timer = new Timer(timerLength);
        this.connectTimerUpdates(timer);
        break;
      }
    }
  }

  private connectTimerUpdates(timer: Timer): void {
    timer.secondReached.Connect(() => this.instance.Value.Text = toTimerFormat(math.round(timer.getTimeLeft())));
    timer.completed.Connect(() => timer.destroy());
    timer.start();
  }
}