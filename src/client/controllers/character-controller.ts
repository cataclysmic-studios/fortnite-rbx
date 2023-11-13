import { Controller, OnInit } from "@flamework/core";
import { Character, Player } from "shared/utilities/client";
import CameraMode from "./camera-controller/mode";

import type { MouseController } from "./mouse-controller";
import type { CameraController } from "./camera-controller";
import type { UIController } from "./ui-controller";

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
    } else {
      hotbar.deselectAll();
      buildingHotbar.deselectAll();
    }
  }

  public getRoot(): Maybe<BasePart> {
    return this.currentModel?.PrimaryPart;
  }
}