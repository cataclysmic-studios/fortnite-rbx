import type { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import Object from "@rbxts/object-utils";

import { Player } from "common/utilities/client";
import { Build } from "shared/structs/build";
import Crosshair from "shared/structs/crosshair";
import type SelectableSlot from "shared/structs/instances/selectable-slot";

import BaseHotbar from "./base-hotbar";
import type { UIController } from "client/controllers/ui-controller";
import type { MouseController } from "client/controllers/mouse-controller";
import type { CrosshairController } from "client/controllers/crosshair-controller";

@Component({
  tag: "MainUI_BuildingHotbar",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class BuildingHotbar extends BaseHotbar<PlayerGui["Main"]["BuildingHotbar"]> implements OnStart {
  public buildModeActive = false;

  public constructor(
    ui: UIController,
    mouse: MouseController,
    private readonly crosshair: CrosshairController
  ) { super(ui, mouse, "Building"); }

  public onStart(): void {
    this.input.Bind("F", () => this.selectBuild(Build.Wall));
    this.input.Bind("Z", () => this.selectBuild(Build.Floor));
    this.input.Bind("C", () => this.selectBuild(Build.Stair));
    this.input.Bind("X", () => this.selectBuild(Build.Pyramid));
    this.input.Bind("T", () => this.selectBuild(Build.Trap));
  }

  public exitBuildMode(): void {
    const mainHotbar = this.ui.main.getHotbar();
    mainHotbar.toggleFocus(true);

    this.deselectAll();
    this.toggleFocus(false);
    this.crosshair.setLast();
    this.instance.Trap.SelectionStroke.Enabled = true;
    this.buildModeActive = false;
  }

  private selectBuild(build: Build): void {
    const buildName = Build[build];
    const selectedSlotFrame = <SelectableSlot>this.instance.WaitForChild(buildName);
    if (build === Build.Trap && selectedSlotFrame.GetAttribute("Empty")) return;

    this.crosshair.set(Crosshair.BuildMode);
    for (const [i, slotFrame] of Object.entries(this.slotFrames)) {
      this.toggleSlotFrameSelected(i, slotFrame, slotFrame.Name === buildName);
      this.instance.Trap.SelectionStroke.Enabled = true;
    }

    const mainHotbar = this.ui.main.getHotbar();
    mainHotbar.deselectAll();
    mainHotbar.toggleFocus(false);
    this.toggleFocus(true);
    this.buildModeActive = true;
  }
}