import { Controller, OnInit } from "@flamework/core";
import { Workspace as World, RunService as Runtime } from "@rbxts/services";
import { Character, Player } from "shared/utilities/client";
import { Assets } from "shared/utilities/shared";
import { Events } from "client/network";

import CameraMode from "shared/structs/camera-mode";
import GameStatus from "shared/structs/game-status";
import Log from "shared/logger";

import type { MouseController } from "./mouse-controller";
import type { CameraController } from "./camera-controller";
import type { UIController } from "./ui-controller";

const { gameStatusUpdate } = Events;

@Controller()
export class CharacterController implements OnInit {
  private currentModel?: ModelWithRoot = Character;

  public constructor(
    private readonly mouse: MouseController,
    private readonly camera: CameraController,
    private readonly ui: UIController
  ) {}

  public onInit(): void {
    Character.Destroying.Connect(() => this.currentModel = undefined);
    Player.CharacterAdded.Connect(char => this.currentModel = <ModelWithRoot>char);

    let playerOnBus = false;
    let heartbeat: RBXScriptConnection;
    heartbeat = Runtime.Heartbeat.Connect(() => {
      if (!playerOnBus) return;
      const bus = <(typeof Assets)["BattleBus"]>World.GameObjects.WaitForChild("BattleBus");
      Character.PivotTo(bus.Body.CFrame);
    });

    let lastStatus: Maybe<GameStatus>;
    gameStatusUpdate.connect(status => {
      if (![GameStatus.Jumping, GameStatus.StormTransition].includes(status)) return;
      if (status === GameStatus.StormTransition && lastStatus !== GameStatus.Jumping) return;

      playerOnBus = status === GameStatus.Jumping;
      if (!playerOnBus)
        heartbeat.Disconnect();

      lastStatus = status;
    });

    this.setDeployed(false);
  }

  public setDeployed(on: boolean): void {
    this.mouse.setBehavior(on ? Enum.MouseBehavior.LockCenter : Enum.MouseBehavior.Default);
    this.camera.setMode(on ? CameraMode.Character : CameraMode.Lobby);

    const hotbar = this.ui.main.getHotbar();
    const buildingHotbar = this.ui.main.getBuildingHotbar();
    if (on) {
      hotbar.selectSlot(1);
      this.ui.setScreen("Main");
      Log.debug("Character deployed");
    } else {
      hotbar.deselectAll();
      buildingHotbar.deselectAll();
    }
  }

  public getRoot(): Maybe<BasePart> {
    return this.currentModel?.PrimaryPart;
  }
}