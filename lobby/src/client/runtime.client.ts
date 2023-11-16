import { Flamework } from "@flamework/core";
import { FlameworkIgnitionException } from "common/exceptions";

try {
	Flamework.addPaths("lobby/src/client/components");
	Flamework.ignite();
} catch (e) {
	throw new FlameworkIgnitionException(<string>e);
}
