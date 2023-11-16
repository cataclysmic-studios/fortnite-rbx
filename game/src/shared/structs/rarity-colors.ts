import Rarity from "./rarity";

const RARITY_COLORS = {
  [Rarity.Common]: Color3.fromRGB(199, 199, 199),
  [Rarity.Uncommon]: Color3.fromRGB(108, 199, 28),
  [Rarity.Rare]: Color3.fromRGB(25, 145, 230),
  [Rarity.Epic]: Color3.fromRGB(177, 71, 217),
  [Rarity.Legendary]: Color3.fromRGB(252, 148, 74),
  [Rarity.Mythic]: Color3.fromRGB(238, 206, 110),
};

export default RARITY_COLORS;