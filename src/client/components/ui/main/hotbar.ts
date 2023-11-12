import type { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { type RawActionEntry } from "@rbxts/gamejoy";
import type { Action } from "@rbxts/gamejoy/out/Actions";
import Object from "@rbxts/object-utils";

import { toSnakeCase } from "shared/utilities/shared";
import { getItemByName } from "shared/utilities/game";
import { Player } from "shared/utilities/client";
import type SelectableSlot from "shared/structs/selectable-slot";
import type InventoryItem from "shared/structs/items/inventory-item";
import DefaultPickaxe from "shared/structs/items/harvesting-tools/default-pickaxe";
import ItemCrosshair from "shared/structs/item-mouse-icon";
import Log from "shared/logger";

import BaseHotbar from "./base-hotbar";
import { UIController } from "client/controllers/ui-controller";
import { MouseController } from "client/controllers/mouse-controller";

@Component({
  tag: "MainUI_Hotbar",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class Hotbar extends BaseHotbar<PlayerGui["Main"]["Hotbar"]> implements OnStart {
  public constructor(ui: UIController, mouse: MouseController) {
    super(ui, mouse, "Main");
  }

  public onStart(): void {
    for (let i = 1; i <= 6; i++)
      this.input.Bind(<Action<RawActionEntry>><unknown>tostring(i), () => this.selectSlot(i));

    this.setHarvestingTool(DefaultPickaxe);
  }

  public setHarvestingTool(pickaxe: InventoryItem): void {
    const { regular: harvestingToolSlotFrame } = this.getSlotFrames(1);
    harvestingToolSlotFrame.Icon.Image = pickaxe.icon;
    harvestingToolSlotFrame.BackgroundColor3 = pickaxe.rarityColor;
    harvestingToolSlotFrame.SetAttribute("ItemName", pickaxe.name);
  }

  public pushItem(item: InventoryItem): void {
    const slot = this.getFirstEmptySlot();
    if (!slot) return;

    this.addItem(slot, item);
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
    this.selectSlot(1);
  }

  public selectSlot(slot: number): void {
    const slotName = this.getSlotName(slot);
    const { empty: emptySlotFrame } = this.getSlotFrames(slot);
    const slotEmpty = slotName !== "HarvestingTool" && emptySlotFrame.Visible;
    if (slotEmpty) return;

    const item = this.getItemInfoFromSlot(slot);
    if (!item)
      return Log.warning(`Failed to select slot ${slot}: Could not fetch item info`);

    this.setCrosshair(item.mouseIconWhenHolding);
    for (const [i, slotFrame] of Object.entries(this.slotFrames))
      this.toggleSlotFrameSelected(i, slotFrame, slotFrame.Name === slotName);

    const buildingHotbar = this.ui.main.getBuildingHotbar();
    buildingHotbar.exitBuildMode();
  }

  private setCrosshair(icon: ItemCrosshair): void {
    this.mouse.toggleIcon(false);
    const crosshairs = this.ui.main.getCrosshairs();
    for (const crosshair of crosshairs)
      crosshair.Visible = false;
    
    if (icon === ItemCrosshair.None) return;
    const crosshairName = ItemCrosshair[icon];
    const crosshair = this.ui.main.getCrosshairs().find(crosshair => crosshair.Name === crosshairName)!;
    crosshair.Visible = true;
  }

  private getFirstEmptySlot(): Maybe<number> {
    const firstEmptySlot = this.instance.EmptySlots.GetChildren()
      .filter((slot): slot is Frame => slot.IsA("Frame") && slot.Visible)
      .sort((a, b) => a.LayoutOrder < b.LayoutOrder)[0];

    if (!firstEmptySlot) return;
    const slot = tonumber(firstEmptySlot.Name.split("Slot")[1]);
    return slot ? slot + 1 : undefined;
  }

  private getItemInfoFromSlot(slot: number): Maybe<InventoryItem> {
    const { regular } = this.getSlotFrames(slot);
    const itemName = <string>regular.GetAttribute("ItemName");
    return getItemByName(toSnakeCase(itemName).gsub("_", "-")[0]);
  }

  private getSlotFrames(slot: number): { empty: Frame, regular: SelectableSlot } {
    const slotName = this.getSlotName(slot);
    const isHarvestingTool = slotName === "HarvestingTool";
    const empty = isHarvestingTool ? this.instance.HarvestingTool : <Frame>this.instance.EmptySlots.FindFirstChild(slotName);
    const regular = isHarvestingTool ? this.instance.HarvestingTool : <SelectableSlot>this.instance.Slots.WaitForChild(slotName);
    return { empty, regular };
  }

  private getSlotName(slot: number): string {
    return slot === 1 ? "HarvestingTool" : `Slot${slot - 1}`;
  }
}