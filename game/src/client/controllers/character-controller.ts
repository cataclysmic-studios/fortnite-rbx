import { Controller, OnInit } from "@flamework/core";
import { Workspace as World, RunService as Runtime } from "@rbxts/services";
import { Events } from "client/network";

import { Character, Player } from "common/utilities/client";
import { Assets } from "common/utilities/shared";
import CameraMode from "shared/structs/camera-mode";
import GameStatus from "shared/structs/game-status";

import type { MouseController } from "./mouse-controller";
import type { CameraController } from "./camera-controller";

const { gameStatusUpdate } = Events;

@Controller()
export class CharacterController implements OnInit {
  private currentModel?: ModelWithRoot = Character;

  public constructor(
    private readonly mouse: MouseController,
    private readonly camera: CameraController
  ) {}

  public onInit(): void {
    this.mouse.setBehavior(Enum.MouseBehavior.LockCenter);
    this.camera.setMode(CameraMode.Character);

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
  }

  public getRoot(): Maybe<BasePart> {
    return this.currentModel?.PrimaryPart;
  }
}