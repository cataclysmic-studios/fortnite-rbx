import { Service, type OnInit } from "@flamework/core";
import { TeleportService as RbxTeleportService } from "@rbxts/services";
import { Events } from "server/network";

const { teleport } = Events;

@Service()
export class TeleportService implements OnInit {
  public onInit(): void {
    teleport.connect(player => RbxTeleportService.TeleportAsync(15366209296, [player]));
  }
}