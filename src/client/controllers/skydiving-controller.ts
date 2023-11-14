import { Controller, type OnInit } from "@flamework/core";
import { Events } from "client/network";
import GameStatus from "shared/structs/game-status";
import { UIController } from "./ui-controller";

const { gameStatusUpdate } = Events;

@Controller()
export class SkydivingController implements OnInit {
  public constructor(
    private readonly ui: UIController
  ) {}

  public onInit(): void {


    let lastStatus: Maybe<GameStatus>;
    gameStatusUpdate.connect(status => {
      if (![GameStatus.Jumping, GameStatus.StormTransition].includes(status)) return;
      if (status === GameStatus.StormTransition && lastStatus !== GameStatus.Jumping) return;

      if (status === GameStatus.Jumping) { // on the bus

      } else { // off the bus

      }

      lastStatus = status;
    });
  }
}