import { Components } from "@flamework/components";
import { Controller } from "@flamework/core";
import { Player } from "shared/utilities/client";
import type { Hotbar } from "client/components/ui/main/hotbar";

@Controller()
export class UIController {
  private readonly screens = <PlayerGui>Player.WaitForChild("PlayerGui");
  private readonly main = <typeof this.screens.Main>this.screens.WaitForChild("Main");

  public constructor(
    private readonly components: Components
  ) {}

  public getHotbar(): Hotbar {
    return this.components.getComponent<Hotbar>(this.main.Hotbar)!;
  }
}