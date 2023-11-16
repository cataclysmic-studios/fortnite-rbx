export default interface StormPhase {
  readonly radius: number;
  readonly transitionTime: string;
  readonly shrinkTime: string;
  readonly damage: number;
  readonly speedMultiplier?: number;
  readonly travelDistance?: number;
}