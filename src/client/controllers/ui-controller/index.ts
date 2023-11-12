import { Controller, OnInit } from "@flamework/core";
import { Player } from "shared/utilities/client";

import type { MainUIController } from "./main";

@Controller()
export class UIController implements OnInit {
  private readonly screens = <PlayerGui>Player.WaitForChild("PlayerGui");

  public constructor(
    public readonly main: MainUIController
  ) {}

  public onInit(): void {
    this.setScreen("Menu");
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
    const screens = <ScreenGui[]>this.screens.GetChildren()
    for (const screen of screens)
      screen.Enabled = screen.Name === name;
  }

  public getScreen(name: ExtractKeys<PlayerGui, ScreenGui>): PlayerGui[typeof name] {
    return <PlayerGui[typeof name]>this.screens.WaitForChild(name);
  }
}