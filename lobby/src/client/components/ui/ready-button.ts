import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Events } from "client/network";

import { PlayerGui } from "common/utilities/client";
import GameMode from "shared/structs/game-mode";

const { partyUpdate } = Events;

@Component({
  tag: "LobbyUI_ReadyButton",
  ancestorWhitelist: [ PlayerGui ]
})
export class ReadyButton extends BaseComponent<{}, TextButton & { Title: ImageLabel }> implements OnStart {
  private readonly playText = "rbxassetid://15343979352";
  private readonly readyText = "rbxassetid://15343979352";

  public onStart(): void {
    this.maid.GiveTask(partyUpdate.connect(party => this.instance.Title.Image = party.mode === GameMode.Solo ? this.playText : this.readyText));
    this.maid.GiveTask(this.instance.MouseButton1Click.Connect(() => {
      // ready shit
    }));
  }
}