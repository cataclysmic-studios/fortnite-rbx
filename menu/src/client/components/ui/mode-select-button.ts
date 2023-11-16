import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ReplicatedFirst } from "@rbxts/services";

import { Player } from "common/utilities/client";

@Component({
  tag: "MenuUI_ModeSelectButton",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class ModeSelectButton extends BaseComponent<{}, ImageButton & { Text: ImageLabel }> implements OnStart {
  public onStart(): void {
    const defaultColor = this.instance.ImageColor3;
    const defaultTextImage = this.instance.Text.Image;
    const invertedTextImage = <string>this.instance.Text.GetAttribute("InvertedVersion");
    const hoverColor = Color3.fromHex("#FCE345");

    this.maid.GiveTask(this.instance.MouseEnter.Connect(() => {
      this.instance.ImageColor3 = hoverColor;
      this.instance.Text.Image = invertedTextImage;
    }));
    this.maid.GiveTask(this.instance.MouseLeave.Connect(() => {
      this.instance.ImageColor3 = defaultColor;
      this.instance.Text.Image = defaultTextImage;
    }));
    this.maid.GiveTask(this.instance.MouseButton1Click.Connect(() => {
      this.destroy();

      const tp = <RemoteEvent>ReplicatedFirst.WaitForChild("Teleport");
      tp.FireServer(this.instance.Name);
    }));
  }
}