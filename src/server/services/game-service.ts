import { Service, type OnInit } from "@flamework/core";
import { Players, Workspace as World } from "@rbxts/services";
import type { Components } from "@flamework/components";
import Signal from "@rbxts/signal";

import { Events } from "server/network";
import type { OnPlayerJoin } from "server/hooks";
import type { Storm } from "server/components/storm";

import GameStatus from "shared/structs/game-status";
import Log from "shared/logger";

const { gameStatusUpdate, setGameStatus } = Events;

const REQUIRED_PLAYERS_TO_START = 1;

@Service()
export class GameService implements OnInit, OnPlayerJoin {
  public readonly statusUpdated = new Signal<(newStatus: GameStatus) => void>;
  public currentStatus = GameStatus.Waiting;

  public constructor(
    private readonly components: Components
  ) {}

  public onInit(): void {
    setGameStatus.connect((_, newStatus) => this.setStatus(newStatus));
    this.setStatus(GameStatus.Waiting);
  }

  public onPlayerJoin(): void {
    if (!this.canStart()) return;
    this.setStatus(GameStatus.Bus);
  }

  public setStatus(status: GameStatus): void {
    Log.debug(`Game status updated: ${GameStatus[status]}`);
    this.currentStatus = status;
    this.statusUpdated.Fire(status);
    gameStatusUpdate.broadcast(status);
  }

  public getStorm(): Storm {
    return this.components.getComponent<Storm>(World.GameObjects.Storm)!;
  }

  private canStart(): boolean {
    return Players.GetPlayers().size() >= REQUIRED_PLAYERS_TO_START;
  }
}