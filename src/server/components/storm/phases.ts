import type StormPhase from "shared/structs/storm-phase";

const STORM_PHASES: StormPhase[] = [
  {
    radius: 4096,
    timeUntilShrinking: "2m",
    shrinkTime: "2m 45s"
  }, {
    radius: 1700,
    timeUntilShrinking: "1m 30s",
    shrinkTime: "2m"
  }, {
    radius: 900,
    timeUntilShrinking: "1m 30s",
    shrinkTime: "1m 30s"
  }, {
    radius: 400,
    timeUntilShrinking: "1m 30s",
    shrinkTime: "1m"
  }, {
    radius: 150,
    timeUntilShrinking: "1m",
    shrinkTime: "45s"
  }
];

export default STORM_PHASES;