import { Service, type OnInit } from "@flamework/core";
import { Events, Functions } from "server/network";
import type { OnPlayerJoin } from "server/hooks";

import type Party from "shared/structs/party";
import GameMode from "shared/structs/game-mode";

const { joinParty, leaveParty, partyUpdate } = Events;
const { getParty } = Functions;

@Service()
export class PartyService implements OnInit, OnPlayerJoin {
  private readonly parties: Party[] = [];

  public onInit(): void {
    joinParty.connect((player, partyHost) => this.join(player, this.getByMember(partyHost)));
    leaveParty.connect(player => this.leave(player, this.getByMember(player)));
    getParty.setCallback(player => this.getByMember(player));
  }

  public onPlayerJoin(player: Player): void {
    this.create(GameMode.Solo, player);
  }

  private join(player: Player, party: Party): void {
    this.modify(party, () => party.members.push(player));
  }

  private leave(player: Player, party: Party): void {
    this.modify(party, () => party.members.remove(party.members.indexOf(player)));
  }

  private modify(party: Party, executeChange: () => void): void {
    executeChange();
    this.parties[this.parties.indexOf(party)] = party;
    partyUpdate.fire(party.members, party);
  }

  private create(mode: GameMode, host: Player): Party {
    const party = {
      mode, host,
      members: [ host ]
    };

    this.parties.push(party);
    return party;
  }

  private getByMember(member: Player): Party {
    return this.parties.find(party => party.members.includes(member))!;
  }
}