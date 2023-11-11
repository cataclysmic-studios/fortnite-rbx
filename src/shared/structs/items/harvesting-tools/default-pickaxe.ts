import ItemMouseIcon from "shared/structs/item-mouse-icon";
import InventoryItem from "../inventory-item";
import Rarity from "shared/structs/rarity";

const DefaultPickaxe = new InventoryItem(
  "Default Pickaxe",
  "rbxassetid://15322955396",
  Rarity.Common,
  ItemMouseIcon.HarvestingTool
);

export default DefaultPickaxe;