import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ReplicatedStorage, ProximityPromptService } from "@rbxts/services";
import { Player } from "shared/utilities/client";
import { Assets } from "shared/utilities/shared";
import type InventoryItem from "shared/structs/items/inventory-item";
import Log from "shared/logger";

@Component({ tag: "ItemPickupPrompt" })
export class ItemPickupPrompt extends BaseComponent<{}, typeof Assets.UI.ItemPickupPrompt> implements OnStart {
  private readonly ui = this.instance.PromptUI;

  public onStart(): void {
    this.maid.GiveTask(ProximityPromptService.PromptShown.Connect(prompt => {
      if (prompt.Style !== Enum.ProximityPromptStyle.Custom) return;
      this.ui.Enabled = true;
      this.update();
    }));
    this.maid.GiveTask(ProximityPromptService.PromptHidden.Connect(prompt => {
      if (prompt.Style !== Enum.ProximityPromptStyle.Custom) return;
      this.ui.Enabled = false;
    }));
    this.maid.GiveTask(this.instance.Triggered.Connect(player => {
      Log.debug(`${player} picked up ${this.getItemName()}`);
    }));

    this.update();
  }

  private update(): void {
    this.ui.Rarity.GetChildren()
      .filter(instance => instance.Name === "Star")
      .forEach(star => star.Destroy());
      
    const itemInfo = this.getItemInfo();
    if (!itemInfo) return;

    this.ui.Info.Title.Text = itemInfo.name;
    this.ui.Info.BackgroundColor3 = itemInfo.rarityColor;
    this.ui.Rarity.BackgroundColor3 = itemInfo.rarityColor;

    const starAmount = itemInfo.rarity + 1;
    for (let i = 1; i <= starAmount; i++)
      Assets.UI.Star.Clone().Parent = this.ui.Rarity;
  }

  private getItemInfo(): Maybe<InventoryItem> {
    const itemName = this.getItemName();
    if (!itemName) return;

    const itemStructs = <Folder>ReplicatedStorage.WaitForChild("TS").WaitForChild("structs").WaitForChild("items");
    const infoModule = <Maybe<ModuleScript>>itemStructs.FindFirstChild(itemName, true);
    if (!infoModule || itemName === "inventory-item") return;

    return (<{ default: InventoryItem }>require(infoModule)).default;
  }

  private getItemName(): Maybe<string> {
    return <Maybe<string>>this.ui?.Adornee?.GetAttribute("ItemName");
  }
}