import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players } from "@rbxts/services";

import { Player } from "shared/utilities/client";

@Component({
  tag: "MainUI_PlayerCount",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class PlayerCount extends BaseComponent<{}, PlayerGui["Main"]["Minimap"]["GameInfo"]["PlayerCount"]> implements OnStart {
  public onStart(): void {
    const update = () => this.instance.Value.Text = tostring(Players.GetPlayers().size());
    this.maid.GiveTask(Players.PlayerAdded.Connect(update));
    this.maid.GiveTask(Players.PlayerRemoving.Connect(update));
    update();
  }
}