import Crosshair from "shared/structs/crosshair";
import InventoryItem from "../inventory-item";
import Rarity from "shared/structs/rarity";

const DefaultPickaxe = new InventoryItem(
  "Default Pickaxe",
  "rbxassetid://15322955396",
  Rarity.Common,
  Crosshair.HarvestingTool
);

export default DefaultPickaxe;