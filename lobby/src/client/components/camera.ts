import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Workspace as World } from "@rbxts/services";

@Component({ tag: "Camera" })
export class Camera extends BaseComponent<{}, Part> implements OnStart {
  public onStart(): void {
    const camera = World.CurrentCamera!;
    camera.CameraType = Enum.CameraType.Scriptable;
    camera.CFrame = this.instance.CFrame;
  }
}