import { Controller, type OnInit, type OnRender } from "@flamework/core";
import { Workspace as World } from "@rbxts/services";
import { TweenInfoBuilder } from "@rbxts/builders";
import { Events } from "client/network";

import { tween } from "common/utilities/ui";
import { Character } from "common/utilities/client";
import { ThirdPersonCamera } from "./third-person-camera";
import CameraMode from "shared/structs/camera-mode";
import CAMERA_OFFSETS from "./offsets";
import Log from "common/logger";

const { setCameraMode } = Events;

@Controller()
export class CameraController implements OnInit, OnRender {
  private readonly camera = World.CurrentCamera!;
  private readonly currentOffset = new Instance("CFrameValue");
  private mode = CameraMode.Character;
  private subject?: BasePart;

  public onInit(): void {
    setCameraMode.connect(mode => this.setMode(mode));
  }

  public onRender(): void {
    if (this.mode === CameraMode.Character) return;
    if (!this.subject)
      return Log.warning("No camera subject!");

    this.camera.CFrame = this.subject.CFrame.mul(this.currentOffset.Value);
  }

  public setMode(mode: CameraMode, transitionTweenInfo?: TweenInfoBuilder): void {
    Log.debug(`Set camera mode to: ${CameraMode[mode]}`);
    const lastMode = this.mode;
    if (lastMode === CameraMode.Character)
      ThirdPersonCamera.End();

    this.mode = mode;
    switch(mode) {
      case CameraMode.Character: {
        this.camera.CameraType = Enum.CameraType.Scriptable;
        this.subject = Character.PrimaryPart;
        return ThirdPersonCamera.Start();
      }
      case CameraMode.BattleBus: {
        this.camera.CameraType = Enum.CameraType.Orbital;
        this.subject = (<Model>World.GameObjects.WaitForChild("BattleBus")).PrimaryPart;
        break;
      }

      default:
        return Log.warning(`Unhandled camera mode: ${CameraMode[mode]}`);
    }

    const tweenInfo = transitionTweenInfo ?? new TweenInfoBuilder().SetTime(0.35);
    const offset = CAMERA_OFFSETS[this.mode] ?? new CFrame;
    tween(this.currentOffset, tweenInfo, {
      Value: offset
    });
  }
}