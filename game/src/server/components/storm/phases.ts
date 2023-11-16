import type StormPhase from "shared/structs/storm-phase";

const STORM_PHASES: StormPhase[] = [
  {
    radius: 4096,
    transitionTime: "2m",
    shrinkTime: "2m 45s",
    damage: 1
  }, {
    radius: 1700,
    transitionTime: "1m 30s",
    shrinkTime: "2m",
    damage: 1
  }, {
    radius: 900,
    transitionTime: "1m 30s",
    shrinkTime: "1m 30s",
    damage: 2
  }, {
    radius: 400,
    transitionTime: "1m 30s",
    shrinkTime: "1m",
    damage: 2
  }, {
    radius: 150,
    transitionTime: "1m",
    shrinkTime: "45s",
    damage: 5
  }, {
    radius: 100,
    transitionTime: "45s",
    shrinkTime: "45s",
    damage: 10
  }
];

export default STORM_PHASES;