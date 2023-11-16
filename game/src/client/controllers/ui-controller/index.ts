import { Controller } from "@flamework/core";
import { Player } from "common/utilities/client";
import Log from "common/logger";

import type { MainUIController } from "./main";

@Controller()
export class UIController {
  private readonly screens = <PlayerGui>Player.WaitForChild("PlayerGui");

  public constructor(
    public readonly main: MainUIController
  ) {}

  public removeScreen(name: ExtractKeys<PlayerGui, ScreenGui>): void {
    this.getScreen(name).Destroy();
  }

  public clearScreens(): void {
    const screens = <ScreenGui[]>this.screens.GetChildren()
    for (const screen of screens)
      screen.Enabled = false;
  }

  public pushScreen(name: ExtractKeys<PlayerGui, ScreenGui>): void {
    this.getScreen(name).Enabled = true;
  }

  public setScreen(name: ExtractKeys<PlayerGui, ScreenGui>): void {
    Log.debug(`Setting screen to ${name}`);
    const screens = <ScreenGui[]>this.screens.GetChildren()
    for (const screen of screens)
      screen.Enabled = screen.Name === name;
  }

  public getScreen(name: ExtractKeys<PlayerGui, ScreenGui>): PlayerGui[typeof name] {
    return <PlayerGui[typeof name]>this.screens.WaitForChild(name);
  }
}