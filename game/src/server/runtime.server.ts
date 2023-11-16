import { Flamework } from "@flamework/core";
import { FlameworkIgnitionException } from "common/exceptions";

try {
	Flamework.addPaths("game/src/server/components");
	Flamework.addPaths("game/src/server/services");
	Flamework.ignite();
} catch (e) {
	throw new FlameworkIgnitionException(<string>e);
}
