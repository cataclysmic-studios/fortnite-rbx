import type { OnRender } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Player } from "shared/utilities/client";

import type { CharacterController } from "client/controllers/character-controller";

interface Attributes {}

@Component({
  tag: "MainUI_Minimap",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class Minimap extends BaseComponent<Attributes, PlayerGui["Main"]["Minimap"]> implements OnRender {
  public constructor(
    private readonly character: CharacterController
  ) { super(); }

  public onRender(): void {
    if (!this.character.getRoot()) return;
    this.instance.Content.Me.Rotation = -this.character.getRoot()!.Orientation.Y;
  }
}