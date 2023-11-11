import { Controller, OnInit } from "@flamework/core";
import { Workspace as World } from "@rbxts/services";
import { TweenInfoBuilder } from "@rbxts/builders";
import { Player } from "shared/utilities/helpers";
import { tween } from "shared/utilities/ui";
import CAMERA_OFFSETS from "./offsets";
import CameraMode from "./mode";

@Controller()
export class CameraController implements OnInit {
  private readonly camera = World.CurrentCamera!;
  private readonly currentOffset = new Instance("CFrameValue");
  private mode = CameraMode.Character;

  public subject = Player.Character!.PrimaryPart!;

  public onInit(): void {
    this.camera.CameraType = Enum.CameraType.Custom;
  }

  public onRender(): void {
    this.camera.CFrame = this.subject.CFrame.mul(this.currentOffset.Value);
  }

  public setMode(mode: CameraMode, transitionTweenInfo?: TweenInfo | TweenInfoBuilder): void {
    this.mode = mode;

    const tweenInfo = (transitionTweenInfo instanceof TweenInfoBuilder ? transitionTweenInfo.Build() : transitionTweenInfo) ?? new TweenInfo(0.5);
    const offset = CAMERA_OFFSETS[this.mode];
    tween(this.currentOffset, tweenInfo, {
      Value: offset
    });
  }
}