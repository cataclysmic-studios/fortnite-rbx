import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Events } from "client/network";

import { Player } from "shared/utilities/client";
import GameMode from "shared/structs/game-mode";

import type { CharacterController } from "client/controllers/character-controller";

const { partyUpdate } = Events;

@Component({
  tag: "LobbyUI_ReadyButton",
  ancestorWhitelist: [ Player.WaitForChild("PlayerGui") ]
})
export class ReadyButton extends BaseComponent<{}, TextButton & { Title: ImageLabel }> implements OnStart {
  private readonly playText = "rbxassetid://15343979352";
  private readonly readyText = "rbxassetid://15343979352";

  public constructor(
    private readonly character: CharacterController
  ) { super(); }

  public onStart(): void {
    this.maid.GiveTask(partyUpdate.connect(party => this.instance.Title.Image = party.mode === GameMode.Solo ? this.playText : this.readyText));
    this.maid.GiveTask(this.instance.MouseButton1Click.Connect(() => this.character.setDeployed(true))); // temporary
  }
}