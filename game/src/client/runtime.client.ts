import { Flamework } from "@flamework/core";
import { FlameworkIgnitionException } from "common/exceptions";

try {
	Flamework.addPaths("game/src/client/components");
	Flamework.addPaths("game/src/client/controllers");
	Flamework.ignite();
} catch (e) {
	throw new FlameworkIgnitionException(<string>e);
}
