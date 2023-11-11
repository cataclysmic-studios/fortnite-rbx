import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximityPromptService } from "@rbxts/services";
import { Assets } from "shared/utilities/shared";
import { Player } from "shared/utilities/client";
import { getItemByName } from "shared/utilities/game";
import type InventoryItem from "shared/structs/items/inventory-item";
import Log from "shared/logger";

import type { UIController } from "client/controllers/ui-controller";
import type { Hotbar } from "../main/hotbar";

@Component({ tag: "ItemPickupPrompt" })
export class ItemPickupPrompt extends BaseComponent<{}, typeof Assets.UI.ItemPickupPrompt> implements OnStart {
  private readonly prompt = this.instance.PromptUI;
  private readonly hotbar: Hotbar;
  
  public constructor(
    private readonly ui: UIController
  ) {
    super();
    this.hotbar = this.ui.getHotbar();
  }

  public onStart(): void {
    this.maid.GiveTask(this.instance.Parent!);
    this.maid.GiveTask(this.instance.Triggered.Connect(() => this.pickUp()));
    this.maid.GiveTask(ProximityPromptService.PromptShown.Connect(prompt => {
      if (prompt.Style !== Enum.ProximityPromptStyle.Custom) return;
      this.prompt.Enabled = true;
      this.update();
    }));
    this.maid.GiveTask(ProximityPromptService.PromptHidden.Connect(prompt => {
      if (prompt.Style !== Enum.ProximityPromptStyle.Custom) return;
      this.prompt.Enabled = false;
    }));

    this.update();
  }

  private pickUp(): void {
    const itemInfo = this.getItemInfo();
    if (!itemInfo)
      return Log.warning(`Failed to pick up "${this.getItemName()}": Could not find item info`);
  
    Log.debug(`${Player} picked up ${this.getItemName()}`);
    this.hotbar.pushItem(itemInfo);
    this.destroy();
  }

  private update(): void {
    this.prompt.Rarity.GetChildren()
      .filter(instance => instance.Name === "Star")
      .forEach(star => star.Destroy());
      
    const itemInfo = this.getItemInfo();
    if (!itemInfo) return;

    this.prompt.Info.Title.Text = itemInfo.name;
    this.prompt.Info.BackgroundColor3 = itemInfo.rarityColor;
    this.prompt.Rarity.BackgroundColor3 = itemInfo.rarityColor;

    const starAmount = itemInfo.rarity + 1;
    for (let i = 1; i <= starAmount; i++)
      Assets.UI.Star.Clone().Parent = this.prompt.Rarity;
  }

  private getItemInfo(): Maybe<InventoryItem> {
    const itemName = this.getItemName();
    if (!itemName) return;

    return getItemByName(itemName);
  }

  private getItemName(): Maybe<string> {
    return <Maybe<string>>this.prompt?.Adornee?.GetAttribute("ItemName");
  }
}