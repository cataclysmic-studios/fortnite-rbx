import { ReplicatedStorage } from "@rbxts/services";
import InventoryItem from "shared/structs/items/inventory-item";

export function getItemByName(name: string): Maybe<InventoryItem> {
  const itemStructs = <Folder>ReplicatedStorage.WaitForChild("TS").WaitForChild("structs").WaitForChild("items");
  const infoModule = <Maybe<ModuleScript>>itemStructs.FindFirstChild(name, true);
  if (!infoModule || name === "inventory-item") return;

  return (<{ default: InventoryItem }>require(infoModule)).default;
}