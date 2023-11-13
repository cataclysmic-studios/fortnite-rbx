import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

import { Player } from "shared/utilities/client";
import { Events } from "client/network";

const { eliminationAdded } = Events;

@Component({
  tag: "MainUI_EliminationCount",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class EliminationCount extends BaseComponent<{}, PlayerGui["Main"]["Minimap"]["GameInfo"]["PlayerCount"]> implements OnStart {
  public onStart(): void {
    this.maid.GiveTask(eliminationAdded.connect(currentElims => this.instance.Value.Text = tostring(currentElims)));
  }
}