import { Service } from "@flamework/core";
import { StrictMap } from "@rbxts/strict-map";
import { Events } from "server/network";
import type { OnPlayerJoin } from "server/hooks";
import GameStats from "shared/structs/game-stats";

const { eliminationAdded } = Events;

@Service()
export class GameStatsService implements OnPlayerJoin {
  private readonly playerStats = new StrictMap<Player, GameStats>;

  public onPlayerJoin(player: Player): void {
    // setup default stats
    this.playerStats.set(player, {
      eliminations: 0,
      distanceTraveled: 0
    });
  }

  public addElimination(player: Player): void {
    const stats = this.playerStats.mustGet(player);
    this.modify(player, stats, () => stats.eliminations += 1);
    eliminationAdded(player, stats.eliminations);
  }

  private modify(player: Player, stats: GameStats, executeChange: () => void): void {
    executeChange();
    this.playerStats.set(player, stats);
  }
}