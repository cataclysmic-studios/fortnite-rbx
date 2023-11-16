import type { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { Workspace as World } from "@rbxts/services";

import { Assets } from "common/utilities/shared";
import Searchable from "server/base-components/searchable";


@Component({ tag: "Chest" })
export class Chest extends Searchable<{}, MeshPart> implements OnStart {
  // TODO: loot pool system

  public onStart(): void {
    const prompt = this.createPrompt();
    prompt.HoldDuration = 1;

    this.maid.GiveTask(prompt.Triggered.Once(() => this.destroy()));
    this.maid.GiveTask(() => {
      const searchedChestModel = Assets.SearchedChest.Clone();
      searchedChestModel.CFrame = this.instance.CFrame;
      searchedChestModel.Parent = World.Map;

      // TODO: drop loot
    });
    this.maid.GiveTask(this.instance);
  }
}