import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Object from "@rbxts/object-utils";

import { Functions } from "server/network";
import { toSeconds } from "shared/utilities/shared";
import { tween } from "shared/utilities/ui";
import STORM_PHASES from "./phases";
import GameStatus from "shared/structs/game-status";
import Log from "shared/logger";

import type { GameService } from "server/services/game-service";

const { getCurrentStormPhase } = Functions;

const STORM_HEIGHT = 2750;

@Component({ tag: "Storm" })
export class Storm extends BaseComponent<{}, Workspace["GameObjects"]["Storm"]> implements OnStart {
  private currentPhase = STORM_PHASES[0];

  public constructor(
    private readonly gameService: GameService
  ) { super(); }

  public onStart(): void {
    getCurrentStormPhase.setCallback(() => this.currentPhase);

    let conn: RBXScriptConnection;
    conn = this.gameService.statusUpdated.Connect(status => {
      if (status !== GameStatus.StormTransition) return;
      conn.Disconnect();
      task.spawn(() => this.startCycle());
    });
  }

  private startCycle(): void {
    for (const [i, phase] of Object.entries(STORM_PHASES)) {
      this.currentPhase = phase;
      this.gameService.setStatus(GameStatus.StormTransition);
      Log.debug(`(Storm) Began phase ${i}`);
      Log.debug(`(Storm) Time until shrink: ${phase.transitionTime}`);
      Log.debug(`(Storm) Time until fully shrunk: ${phase.shrinkTime}`);

      this.instance.Mesh.Scale = new Vector3(phase.radius, STORM_HEIGHT, phase.radius);
      task.wait(toSeconds(phase.transitionTime));

      Log.debug("(Storm) Began shrinking");
      this.gameService.setStatus(GameStatus.Storm);

      const nextPhase = STORM_PHASES[i];
      const tweenInfo = new TweenInfo((toSeconds(phase.shrinkTime)) * (1 / (phase.speedMultiplier ?? 1)));
      const nextPhaseScale = new Vector3(nextPhase.radius, STORM_HEIGHT, nextPhase.radius);
      const offsetX = this.instance.Mesh.Scale.X / 2;
      const randomX = math.random(this.instance.Position.X - offsetX, this.instance.Position.X + offsetX) / 2;
      const offsetZ = this.instance.Mesh.Scale.Z / 2;
      const randomZ = math.random(this.instance.Position.Z - offsetZ, this.instance.Position.Z + offsetZ) / 2;
      const goalPosition = new Vector3(randomX, this.instance.Position.Y, randomZ);
      // tween(this.instance, tweenInfo, { Position: goalPosition });
      tween(this.instance.Mesh, tweenInfo, { Scale: nextPhaseScale }).Completed.Wait();
    }
    Log.debug("(Storm) Phases completed");
  }
}