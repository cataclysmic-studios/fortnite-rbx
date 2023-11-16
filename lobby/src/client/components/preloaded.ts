import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ContentProvider } from "@rbxts/services";

type Preloadable =
  | ImageLabel
  | ImageButton
  | Texture
  | Decal
  | FileMesh
  | MeshPart
  | Sound
  | Animation
  | ParticleEmitter;

@Component({ tag: "Preloaded" })
export class Preloaded extends BaseComponent<{}, Preloadable> implements OnStart {
  public onStart(): void {
    task.spawn(() => ContentProvider.PreloadAsync([ this.instance ]));
  }
}