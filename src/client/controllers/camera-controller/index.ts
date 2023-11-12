import { Controller, OnRender } from "@flamework/core";
import { Workspace as World } from "@rbxts/services";
import { TweenInfoBuilder } from "@rbxts/builders";
import { ThirdPersonCamera } from "./third-person-camera";
import { Character } from "shared/utilities/client";
import { tween } from "shared/utilities/ui";
import CAMERA_OFFSETS from "./offsets";
import CameraMode from "./mode";
import Log from "shared/logger";

@Controller()
export class CameraController implements OnRender {
  private readonly camera = World.CurrentCamera!;
  private readonly currentOffset = new Instance("CFrameValue");
  private mode = CameraMode.Character;
  private subject?: BasePart;

  public onRender(): void {
    if (this.mode === CameraMode.Character) return;
    if (!this.subject) 
      return Log.warning("No camera subject!");

    this.camera.CFrame = this.subject.CFrame.mul(this.currentOffset.Value);
  }

  public setMode(mode: CameraMode, transitionTweenInfo?: TweenInfoBuilder): void {
    switch(mode) {
      case CameraMode.Character: {
        this.subject = Character.PrimaryPart;
        return ThirdPersonCamera.Start();
      }
      case CameraMode.Lobby: {
        this.subject = World.Lobby.Camera;
        break;
      }
      default: {
        Log.warning(`Unhandled camera mode: ${CameraMode[mode]}`);
        break;
      }
    }
    
    const lastMode = this.mode;
    if (lastMode === CameraMode.Character)
      ThirdPersonCamera.End();

    const tweenInfo = transitionTweenInfo ?? new TweenInfoBuilder().SetTime(0.35);
    const offset = CAMERA_OFFSETS[this.mode] ?? new CFrame;
    tween(this.currentOffset, tweenInfo, {
      Value: offset
    });

    this.mode = mode;
  }
}