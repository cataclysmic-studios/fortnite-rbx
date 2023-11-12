import type { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import Object from "@rbxts/object-utils";

import { Build } from "shared/structs/builds";
import { Player } from "shared/utilities/client";
import type SelectableSlot from "shared/structs/selectable-slot";

import type { UIController } from "client/controllers/ui-controller";
import type { MouseController } from "client/controllers/mouse-controller";
import BaseHotbar from "./base-hotbar";

@Component({
  tag: "MainUI_BuildingHotbar",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class BuildingHotbar extends BaseHotbar<PlayerGui["Main"]["BuildingHotbar"]> implements OnStart {
  public buildModeActive = false;

  public constructor(ui: UIController, mouse: MouseController) {
    super(ui, mouse, "Building");
  }

  public onStart(): void {
    this.input.Bind("F", () => this.selectBuild(Build.Wall));
    this.input.Bind("Z", () => this.selectBuild(Build.Floor));
    this.input.Bind("C", () => this.selectBuild(Build.Stair));
    this.input.Bind("X", () => this.selectBuild(Build.Pyramid));
    this.input.Bind("T", () => this.selectBuild(Build.Trap));
  }

  private toggleCrosshair(on: boolean): void {
    this.mouse.toggleIcon(!on);
    const crosshairs = this.ui.main.getCrosshairs();
    for (const crosshair of crosshairs)
      crosshair.Visible = !on;
    
    const crosshair = this.ui.main.getCrosshairs().find(crosshair => crosshair.Name === "BuildMode")!;
    crosshair.Visible = on;
  }

  public exitBuildMode(): void {
    const mainHotbar = this.ui.main.getHotbar();
    mainHotbar.toggleFocus(true);

    this.deselectAll();
    this.toggleFocus(false);
    this.buildModeActive = false;
  }

  private selectBuild(build: Build): void {
    const buildName = Build[build];
    const selectedSlotFrame = <SelectableSlot>this.instance.WaitForChild(buildName);
    if (build === Build.Trap && selectedSlotFrame.GetAttribute("Empty")) return;

    this.toggleCrosshair(true);
    for (const [i, slotFrame] of Object.entries(this.slotFrames))
      this.toggleSlotFrameSelected(i, slotFrame, slotFrame.Name === buildName);

    const mainHotbar = this.ui.main.getHotbar();
    mainHotbar.deselectAll();
    mainHotbar.toggleFocus(false);
    this.toggleFocus(true);
    this.buildModeActive = true;
  }
}