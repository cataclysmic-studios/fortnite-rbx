import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players, Workspace as World } from "@rbxts/services";

import { Events } from "server/network";
import { Assets } from "common/utilities/shared";
import { tween } from "common/utilities/ui";
import GameStatus from "shared/structs/game-status";
import CameraMode from "shared/structs/camera-mode";

import type { GameService } from "server/services/game-service";
import STATUS_TIMER_PRESETS from "shared/structs/status-timer-presets";
import Log from "common/logger";

const { setCameraMode } = Events;
const { rad, random } = math;

@Component({ tag: "BattleBus" })
export class BattleBus extends BaseComponent<{}, typeof Assets.BattleBus> implements OnStart {
  private readonly path = World.GameObjects.BusPath;
  private readonly pathHeight = this.path.Start.Position.Y;
  private readonly height = 2500 - this.pathHeight;
  private readonly direction = CFrame.Angles(0, rad(random(-90, 90)), 0);
  private readonly rotationOffset = CFrame.Angles(0, rad(-90), 0);
  private readonly heightOffset = new Vector3(0, this.height, 0);
  private readonly playersOnBus: Player[] = [];

  public constructor(
    private readonly gameService: GameService
  ) { super(); }

  public onStart(): void {
    this.maid.GiveTask(this.gameService.statusUpdated.Connect(status => {
      if (status !== GameStatus.Jumping) return;
      this.launch();
    }));
    this.maid.GiveTask(() => {
      for (const player of this.playersOnBus)
        this.jump(player);
    });

    // set random direction
    this.path.Start.GetPropertyChangedSignal("CFrame")
      .Once(() => this.instance.PivotTo(this.path.Start.CFrame
        .mul(this.rotationOffset)
        .add(this.heightOffset)));

    this.path.PivotTo(this.direction.add(new Vector3(0, this.pathHeight, 0)));
  }

  public jump(player: Player): void {
    Log.debug(`${player} jumped from battle bus`);
    setCameraMode(player, CameraMode.Character);
    this.playersOnBus.remove(this.playersOnBus.indexOf(player));
  }

  public launch(): void {
    Log.debug("Launching battle bus");
    this.instance.Parent = World.GameObjects;
    for (const player of Players.GetPlayers())
      this.playersOnBus.push(player);

    setCameraMode.broadcast(CameraMode.BattleBus);

    const busCFrame = new Instance("CFrameValue");
    busCFrame.Value = this.instance.Body.CFrame;
    busCFrame.GetPropertyChangedSignal("Value")
      .Connect(() => this.instance.Body.CFrame = busCFrame.Value);

    this.maid.GiveTask(busCFrame);
    this.maid.GiveTask(tween(busCFrame, new TweenInfo(STATUS_TIMER_PRESETS.jumping), {
      Value: this.path.End.CFrame
        .mul(this.rotationOffset)
        .add(this.heightOffset)
    }).Completed.Connect(() => this.destroy()));
  }
}