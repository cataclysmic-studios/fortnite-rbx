import { Controller, OnInit } from "@flamework/core";
import { Character, Player } from "shared/utilities/client";

@Controller()
export class CharacterController implements OnInit {
  private currentModel?: ModelWithRoot = Character;

  public onInit(): void {
    Character.Destroying.Connect(() => this.currentModel = undefined);
    Player.CharacterAdded.Connect(char => this.currentModel = <ModelWithRoot>char);
  }

  public getRoot(): Maybe<BasePart> {
    return this.currentModel?.PrimaryPart
  }
}