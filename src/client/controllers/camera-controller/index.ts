import { Controller, OnRender, OnStart } from "@flamework/core";
import { Workspace as World } from "@rbxts/services";
import { TweenInfoBuilder } from "@rbxts/builders";
import { ThirdPersonCamera } from "./third-person-camera";
import { tween } from "shared/utilities/ui";
import CAMERA_OFFSETS from "./offsets";
import CameraMode from "./mode";
import Log from "shared/logger";

import type { MouseController } from "../mouse-controller";

@Controller()
export class CameraController implements OnStart, OnRender {
  private readonly camera = World.CurrentCamera!;
  private readonly currentOffset = new Instance("CFrameValue");
  private mode = CameraMode.Character;
  private subject?: BasePart;

  public constructor(
    private readonly mouse: MouseController
  ) {}

  public onStart(): void {
    this.camera.CameraType = Enum.CameraType.Scriptable;
    this.mouse.setBehavior(Enum.MouseBehavior.LockCenter);
    this.setMode(CameraMode.Character);
  }

  public onRender(): void {
    if (this.mode === CameraMode.Character) return;
    if (!this.subject) 
      return Log.warning("No camera subject!");

  }

  public setMode(mode: CameraMode, transitionTweenInfo?: TweenInfoBuilder): void {
    if (mode === CameraMode.Character)
      return ThirdPersonCamera.Start();
    
    const lastMode = this.mode;
    if (lastMode === CameraMode.Character)
      ThirdPersonCamera.End();

    const tweenInfo = transitionTweenInfo ?? new TweenInfoBuilder().SetTime(0.5);
    const offset = CAMERA_OFFSETS[this.mode];
    tween(this.currentOffset, tweenInfo, {
      Value: offset
    });

    this.mode = mode;
  }
}