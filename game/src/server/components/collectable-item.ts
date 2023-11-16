import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Assets } from "common/utilities/shared";

interface Attributes {
  readonly ItemName: string;
}

@Component({ tag: "CollectableItem" })
export class CollectableItem extends BaseComponent<Attributes, BasePart> implements OnStart {
  public onStart(): void {
    Assets.VFX.ItemGlow.Clone().Parent = this.instance;

    const pickupPrompt = Assets.UI.ItemPickupPrompt.Clone();
    pickupPrompt.PromptUI.Adornee = this.instance;
    pickupPrompt.Parent = this.instance;
  }
}