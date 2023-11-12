import { Controller, OnInit } from "@flamework/core";
import { Character, Player } from "shared/utilities/client";
import CameraMode from "./camera-controller/mode";

import type { MouseController } from "./mouse-controller";
import type { CameraController } from "./camera-controller";

@Controller()
export class CharacterController implements OnInit {
  private currentModel?: ModelWithRoot = Character;

  public constructor(
    private readonly mouse: MouseController,
    private readonly camera: CameraController
  ) {}

  public onInit(): void {
    Character.Destroying.Connect(() => this.currentModel = undefined);
    Player.CharacterAdded.Connect(char => this.currentModel = <ModelWithRoot>char);
  }

  public setDeployed(on: boolean): void {
    this.mouse.setBehavior(on ? Enum.MouseBehavior.LockCenter : Enum.MouseBehavior.Default);
    this.camera.setMode(on ? CameraMode.Character : CameraMode.Lobby);
  }

  public getRoot(): Maybe<BasePart> {
    return this.currentModel?.PrimaryPart
  }
}