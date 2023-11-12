import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Context as InputContext } from "@rbxts/gamejoy";
import Object from "@rbxts/object-utils";

import { tween } from "shared/utilities/ui";
import { Build } from "shared/structs/builds";
import { Player } from "shared/utilities/client";
import type SelectableSlot from "shared/structs/selectable-slot";

import type { UIController } from "client/controllers/ui-controller";
import type { MouseController } from "client/controllers/mouse-controller";

interface Attributes {}

@Component({
  tag: "MainUI_BuildingHotbar",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class BuildingHotbar extends BaseComponent<Attributes, PlayerGui["Main"]["BuildingHotbar"]> implements OnStart {
  private slotFrameOrigins: UDim2[] = [];
  private slotFrameKeybindOrigins: UDim2[] = [];
  private readonly slotFrames = this.instance.GetChildren().filter((instance): instance is SelectableSlot => instance.IsA("Frame"));
  private readonly input = new InputContext({
    ActionGhosting: 0,
    Process: false,
    RunSynchronously: true
  });

  public constructor(
    private readonly ui: UIController,
    private readonly mouse: MouseController
  ) { super(); }

  public onStart(): void {
    this.slotFrameOrigins = this.slotFrames.map(frame => frame.Position);
    this.slotFrameKeybindOrigins = this.slotFrames.map(frame => frame.Keybind.Position);

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

  private exitBuildMode(): void {

  }

  private selectBuild(build: Build): void {
    const buildName = Build[build];
    const selectedSlotFrame = <SelectableSlot>this.instance.WaitForChild(buildName);
    if (build === Build.Trap && selectedSlotFrame.GetAttribute("Empty")) return;

    this.toggleCrosshair(true);
    for (const [i, slotFrame] of Object.entries(this.slotFrames)) {
      const selectedSlot = slotFrame.Name === buildName;
      slotFrame.SelectionStroke.Enabled = selectedSlot;
      slotFrame.ZIndex = selectedSlot ? 2 : 1;

      const origin = this.slotFrameOrigins[i - 1];
      const keybindOrigin = this.slotFrameKeybindOrigins[i - 1];
      const tweenInfo = new TweenInfo(0.1);
      const offset = UDim2.fromScale(0, 0.075);
      tween(slotFrame, tweenInfo, {
        Position: selectedSlot ? origin.sub(offset) : origin
      });
      tween(slotFrame.Keybind, tweenInfo, {
        Position: selectedSlot ? keybindOrigin.add(offset) : keybindOrigin
      });
    }
  }
}