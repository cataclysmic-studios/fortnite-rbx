import Rarity from "../rarity";
import Crosshair from "../crosshair";
import RARITY_COLORS from "../rarity-colors";

export default class InventoryItem {
  public readonly rarityColor: Color3;

  public constructor(
    public readonly name: string,
    public readonly icon: string,
    public readonly rarity: Rarity,
    public readonly mouseIconWhenHolding: Crosshair
  ) {
    this.rarityColor = RARITY_COLORS[this.rarity];
  }
}