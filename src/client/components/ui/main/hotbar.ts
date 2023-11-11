import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Context as InputContext, RawActionEntry } from "@rbxts/gamejoy";
import { Action } from "@rbxts/gamejoy/out/Actions";
import { tween } from "shared/utilities/ui";
import Object from "@rbxts/object-utils";
import InventoryItem from "shared/structs/items/inventory-item";
import DefaultPickaxe from "shared/structs/items/harvesting-tools/default-pickaxe";

interface Attributes {}

interface SelectableSlot extends Frame {
  SelectionStroke: UIStroke;
  Icon: ImageLabel;
  Keybind: TextLabel;
}

interface HotbarFrame extends Frame {
  Slots: Folder & {
    Slot1: SelectableSlot;
    Slot2: SelectableSlot;
    Slot3: SelectableSlot;
    Slot4: SelectableSlot;
    Slot5: SelectableSlot;
  };
  EmptySlots: Folder & {
    Slot1: Frame;
    Slot2: Frame;
    Slot3: Frame;
    Slot4: Frame;
    Slot5: Frame;
  }
  HarvestingTool: SelectableSlot;
}

@Component({ tag: "MainUI_Hotbar" })
export class Hotbar extends BaseComponent<Attributes, HotbarFrame> implements OnStart {
  private slotFrameOrigins: UDim2[] = [];
  private slotFrameKeybindOrigins: UDim2[] = [];
  private readonly allSlotFrames = <SelectableSlot[]>this.instance.Slots.GetChildren();
  private readonly input = new InputContext({
    ActionGhosting: 0,
    Process: false,
    RunSynchronously: true
  });

  public onStart(): void {
    this.allSlotFrames.push(this.instance.HarvestingTool);
    this.slotFrameOrigins = this.allSlotFrames.map(frame => frame.Position);
    this.slotFrameKeybindOrigins = this.allSlotFrames.map(frame => frame.Keybind.Position);
    for (let i = 1; i <= 6; i++)
      this.input.Bind(<Action<RawActionEntry>><unknown>tostring(i), () => this.selectSlot(i));

    this.setHarvestingTool(DefaultPickaxe);
    this.selectSlot(1);
  }

  public setHarvestingTool(pickaxe: InventoryItem): void {
    const { regular: harvestingToolSlotFrame } = this.getSlotFrames(1);
    harvestingToolSlotFrame.Icon.Image = pickaxe.icon;
    harvestingToolSlotFrame.BackgroundColor3 = pickaxe.rarityColor;
    harvestingToolSlotFrame.SetAttribute("HarvestingToolName", pickaxe.name);
  }

  public addItem(slot: number, item: InventoryItem): void {
    if (slot === 1) return; // dont add shit to pickaxe slot
    const slotFrames = this.getSlotFrames(slot);
    slotFrames.regular.Icon.Image = item.icon;
    slotFrames.regular.BackgroundColor3 = item.rarityColor;
    slotFrames.regular.SetAttribute("ItemName", item.name);
    slotFrames.empty.Visible = false;
    slotFrames.regular.Visible = true;
  }

  public removeItem(slot: number): void {
    if (slot === 1) return; // dont remove shit from pickaxe slot
    const slotFrames = this.getSlotFrames(slot);
    slotFrames.regular.SetAttribute("ItemName", undefined);
    slotFrames.empty.Visible = true;
    slotFrames.regular.Visible = false;
  }

  private selectSlot(slot: number): void {
    const slotName = this.getSlotName(slot);
    const { empty: emptySlotFrame } = this.getSlotFrames(slot);
    const slotEmpty = slotName !== "HarvestingTool" && emptySlotFrame.Visible;
    if (slotEmpty) return;

    for (const [i, slotFrame] of Object.entries(this.allSlotFrames)) {
      const selectedSlot = slotFrame.Name === slotName;
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

  private getSlotFrames(slot: number): { empty: Frame, regular: SelectableSlot } {
    const slotName = this.getSlotName(slot);
    const isHarvestingTool = slotName === "HarvestingTool";
    const empty = isHarvestingTool ? this.instance.HarvestingTool : <Frame>this.instance.EmptySlots.FindFirstChild(slotName);
    const regular = isHarvestingTool ? this.instance.HarvestingTool : <SelectableSlot>this.instance.EmptySlots.WaitForChild(slotName);
    return { empty, regular };
  }

  private getSlotName(slot: number): string {
    return slot === 1 ? "HarvestingTool" : `Slot${slot - 1}`;
  }
}