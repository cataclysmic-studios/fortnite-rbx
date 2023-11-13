export default interface StormPhase {
  readonly radius: number;
  readonly timeUntilShrinking: string;
  readonly shrinkTime: string;
  readonly speedMultiplier?: number;
  readonly travelDistance?: number;
}