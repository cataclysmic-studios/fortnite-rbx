import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Player } from "shared/utilities/client";

import type { UIController } from "client/controllers/ui-controller";

interface Attributes {}

@Component({
  tag: "MenuUI_ModeButton",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class ModeButton extends BaseComponent<Attributes, ImageButton & { Text: ImageLabel }> implements OnStart {
  public constructor(
    private readonly ui: UIController
  ) { super(); }
  
  public onStart(): void {
    const defaultColor = this.instance.ImageColor3;
    const defaultTextImage = this.instance.Text.Image;
    const invertedTextImage = <string>this.instance.Text.GetAttribute("InvertedVersion");
    const hoverColor = Color3.fromHex("#FCE345");

    this.instance.MouseEnter.Connect(() => {
      this.instance.ImageColor3 = hoverColor;
      this.instance.Text.Image = invertedTextImage;
    });
    this.instance.MouseLeave.Connect(() => {
      this.instance.ImageColor3 = defaultColor;
      this.instance.Text.Image = defaultTextImage;
    });
    this.instance.MouseButton1Click.Connect(() => {
      switch(this.instance.Name) {
        case "BattleRoyale": {
          this.ui.setScreen("Lobby");
          break;
        }
      }
    });
  }
}