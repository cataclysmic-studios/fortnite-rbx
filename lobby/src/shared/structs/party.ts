import type GameMode from "./game-mode";

export default interface Party {
  readonly mode: GameMode;
  readonly host: Player;
  readonly members: Player[];
}