import { BaseComponent } from "@flamework/components";
import { Context as InputContext } from "@rbxts/gamejoy";
import Object from "@rbxts/object-utils";

import { tween } from "shared/utilities/ui";
import type SelectableSlot from "shared/structs/instances/selectable-slot";

import type { UIController } from "client/controllers/ui-controller";
import type { MouseController } from "client/controllers/mouse-controller";

interface Attributes {
  readonly FocusedScale: number;
  readonly UnfocusedScale: number;
}

export default class BaseHotbar<I extends Frame = Frame> extends BaseComponent<Attributes, I> {
  private slotFrameOrigins: UDim2[] = [];
  private slotFrameKeybindOrigins: UDim2[] = [];
  private readonly defaultPosition = this.instance.Position;
  protected readonly slotFrames: SelectableSlot[];
  protected readonly input = new InputContext({
    ActionGhosting: 0,
    Process: false,
    RunSynchronously: true
  });

  public constructor(
    protected readonly ui: UIController,
    protected readonly mouse: MouseController,
    private readonly hotbarType: "Main" | "Building"
  ) {

    super();
    this.slotFrames = hotbarType === "Main" ?
      <SelectableSlot[]>this.instance.WaitForChild("Slots").GetChildren()
      : this.instance.GetChildren().filter((instance): instance is SelectableSlot => instance.IsA("Frame"));

    if (hotbarType === "Main")
      this.slotFrames.push(<SelectableSlot>this.instance.WaitForChild("HarvestingTool"));

    this.slotFrameOrigins = this.slotFrames.map(frame => frame.Position);
    this.slotFrameKeybindOrigins = this.slotFrames.map(frame => frame.Keybind.Position);
  }

  public toggleFocus(on: boolean): void {
    const scaleAttributeName = on ? "FocusedScale" : "UnfocusedScale";
    const scale = <number>this.instance.GetAttribute(scaleAttributeName);
    const tweenInfo = new TweenInfo(0.08, Enum.EasingStyle.Sine);
    tween(<Frame>this.instance, tweenInfo, {
      Size: UDim2.fromScale(scale, scale)
    });

    if (this.hotbarType !== "Main") return;
    const offset = <number>this.instance.GetAttribute("FocusedScale") / 6;
    tween(<Frame>this.instance, tweenInfo, {
      Position: on ? this.defaultPosition : this.defaultPosition.sub(UDim2.fromScale(0, offset))
    });
  }

  public deselectAll(): void {
    for (const [i, slotFrame] of Object.entries(this.slotFrames))
      this.toggleSlotFrameSelected(i, slotFrame, false);
  }

  protected toggleSlotFrameSelected(i: number, slotFrame: SelectableSlot, selected: boolean): void {
    slotFrame.SelectionStroke.Enabled = selected;
    slotFrame.ZIndex = selected ? 2 : 1;

    const origin = this.slotFrameOrigins[i - 1];
    const keybindOrigin = this.slotFrameKeybindOrigins[i - 1];
    const tweenInfo = new TweenInfo(0.1);
    const offset = UDim2.fromScale(0, 0.075);
    tween(slotFrame, tweenInfo, {
      Position: selected ? origin.sub(offset) : origin
    });
    tween(slotFrame.Keybind, tweenInfo, {
      Position: selected ? keybindOrigin.add(offset) : keybindOrigin
    });
  }
}