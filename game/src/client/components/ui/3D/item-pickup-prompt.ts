import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";

import { Assets } from "common/utilities/shared";
import { Player } from "common/utilities/client";
import Log from "common/logger";

import { getItemByName } from "shared/utilities";
import CustomPrompt from "client/base-components/custom-prompt";
import type InventoryItem from "shared/structs/items/inventory-item";

import type { UIController } from "client/controllers/ui-controller";
import type { Hotbar } from "../hotbar";

@Component({ tag: "ItemPickupPrompt" })
export class ItemPickupPrompt extends CustomPrompt<typeof Assets.UI.ItemPickupPrompt> implements OnStart {
  private readonly hotbar: Hotbar;

  public constructor(
    private readonly ui: UIController
  ) {
    super();
    this.hotbar = this.ui.main.getHotbar();
  }

  public onStart(): void {
    this.maid.GiveTask(this.instance.Parent!);
    this.maid.GiveTask(this.instance.Triggered.Connect(() => this.pickUp()));
    this.maid.GiveTask(this.shown.Connect(() => this.update()));
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