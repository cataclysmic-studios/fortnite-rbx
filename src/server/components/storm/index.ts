import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { toSeconds } from "shared/utilities/shared";
import { tween } from "shared/utilities/ui";
import STORM_PHASES from "./phases";
import Object from "@rbxts/object-utils";
import Log from "shared/logger";

interface Attributes {}

const STORM_HEIGHT = 2500;

@Component({ tag: "Storm" })
export class Storm extends BaseComponent<Attributes, BasePart & { Mesh: SpecialMesh }> implements OnStart {
  public onStart(): void {
    task.spawn(() => this.startCycle());
  }

  private startCycle(): void {
    for (const [i, phase] of Object.entries(STORM_PHASES)) {
      Log.debug(`Began storm phase ${i}`);
      Log.debug(`Time until storm shrinks: ${phase.timeUntilShrinking}`);
      Log.debug(`Time until storm has fully shrunk: ${phase.shrinkTime}`);

      this.instance.Mesh.Scale = new Vector3(phase.radius, STORM_HEIGHT, phase.radius)
      task.wait(toSeconds(phase.timeUntilShrinking) / 5);

      Log.debug("Storm has began shrinking");
      const nextPhase = STORM_PHASES[i];
      const tweenInfo = new TweenInfo(toSeconds(phase.shrinkTime) / 5);
      const nextPhaseScale = new Vector3(nextPhase.radius, STORM_HEIGHT, nextPhase.radius);
      const offsetX = this.instance.Mesh.Scale.X / 2;
      const randomX = math.random(this.instance.Position.X - offsetX, this.instance.Position.X + offsetX);
      const offsetZ = this.instance.Mesh.Scale.Z / 2;
      const randomZ = math.random(this.instance.Position.Z - offsetZ, this.instance.Position.Z + offsetZ);
      const goalPosition = new Vector3(randomX, this.instance.Position.Y, randomZ);
      // tween(this.instance, tweenInfo, { Position: goalPosition });
      tween(this.instance.Mesh, tweenInfo, { Scale: nextPhaseScale }).Completed.Wait();
    }
    Log.debug(`Storm phases completed`);
  }

  public isInSafeZone(part: BasePart): boolean {
    const offset = part.Position.sub(this.instance.Position);
    const halfHeight = this.instance.Mesh.Scale.Y / 2;
    const radius = this.instance.Mesh.Scale.X;
    const distanceSquared = offset.X * offset.X + offset.Z * offset.Z;
    return offset.Y > -halfHeight && offset.Y < halfHeight && distanceSquared < radius * radius;
  }
}