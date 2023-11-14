import { Networking } from "@flamework/networking";
import type { DataKey, DataValue, GameDataModel } from "./data-models/generic";
import type Party from "./structs/party";
import type GameStatus from "./structs/game-status";
import type StormPhase from "./structs/storm-phase";
import type CameraMode from "shared/structs/camera-mode";

interface ServerEvents {
  initializeData(): void;
  dataLoaded(): void;
  setData(key: DataKey, value: DataValue): void;
  incrementData(key: ExtractKeys<GameDataModel, number>, amount?: number): void;
  joinParty(host: Player): void;
  leaveParty(): void;
  setGameStatus(newStatus: GameStatus): void;
}

interface ClientEvents {
  dataUpdate(key: DataKey, value: DataValue): void;
  partyUpdate(party: Party): void;
  gameStatusUpdate(newStatus: GameStatus): void;
  eliminationAdded(currentEliminations: number): void;
  setCameraMode(mode: CameraMode): void;
  setMouseBehavior(behaviour: Enum.MouseBehavior): void;
}

interface ServerFunctions {
  getData(key: DataKey): DataValue;
  getParty(): Party;
  getCurrentStormPhase(): StormPhase;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
