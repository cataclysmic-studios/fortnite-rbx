import type { OnStart } from "@flamework/core";
import { Component, BaseComponent, type Components } from "@flamework/components";

import { Player } from "shared/utilities/client";

import type { UIController } from "client/controllers/ui-controller";

@Component({
  tag: "LobbyUI_TopbarButton",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class LobbyTopbarButton extends BaseComponent<{}, TextButton> implements OnStart {
  private readonly defaultTrans = this.instance.Transparency;
  private readonly defaultColor = this.instance.BackgroundColor3;
  private readonly pages: Folder;
  private currentPage = "Play";

  public selected = false;

  public constructor(
    private readonly components: Components,
    private readonly ui: UIController
  ) {
    super();
    this.pages = (<PlayerGui["Lobby"]>this.ui.getScreen("Lobby")).Padded.Pages;
  }

  public onStart(): void {
    if (this.instance.Name === "Play")
      this.onClick(); // select lobby button automatically

    this.maid.GiveTask(this.instance.MouseButton1Click.Connect(() => this.onClick()));
    this.maid.GiveTask(this.instance.MouseEnter.Connect(() => {
      if (this.selected) return;
      this.instance.BackgroundColor3 = Color3.fromHex("#A9A9A9"); // grey
    }));
    this.maid.GiveTask(this.instance.MouseLeave.Connect(() => {
      if (this.selected) return;
      this.deselect();
    }));
  }
  
  private onClick(): void {
    this.select();
    this.selected = true;
    this.currentPage = this.instance.Name;

    for (const page of <Frame[]>this.pages.GetChildren())
      page.Visible = page.Name === this.currentPage;

    for (const topbarButton of this.components.getAllComponents<LobbyTopbarButton>()) {
      if (topbarButton === this) continue;
      topbarButton.deselect();
      topbarButton.selected = false;
    }
  }

  private select(): void {
    this.instance.BackgroundColor3 = Color3.fromHex("#FCF201"); // yellow
    this.instance.TextColor3 = new Color3;
    this.instance.BackgroundTransparency = 0;
  }

  private deselect(): void {
    this.instance.BackgroundColor3 = this.defaultColor;
    this.instance.TextColor3 = new Color3(1, 1, 1);
    this.instance.BackgroundTransparency = this.defaultTrans;
  }
}