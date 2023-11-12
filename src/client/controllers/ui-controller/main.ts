import type { Components } from "@flamework/components";
import { Controller } from "@flamework/core";
import { Player } from "shared/utilities/client";

import type { Hotbar } from "client/components/ui/main/hotbar";
import type { Minimap } from "client/components/ui/main/minimap";

@Controller()
export class MainUIController {
  private readonly screens = <PlayerGui>Player.WaitForChild("PlayerGui");
  public readonly screen = <typeof this.screens.Main>this.screens.WaitForChild("Main");

  public constructor(
    private readonly components: Components
  ) {}

  public getHotbar(): Hotbar {
    return this.components.getComponent<Hotbar>(this.screen.Hotbar)!;
  }

  public getMinimap(): Minimap {
    return this.components.getComponent<Minimap>(this.screen.Minimap)!;
  }

  public getCrosshairs(): Frame[] {
    return this.screens.Main.Crosshairs
      .GetChildren()
      .filter((instance): instance is Frame => instance.IsA("Frame"));
  }
}