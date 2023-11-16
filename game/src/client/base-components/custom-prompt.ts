import type { OnStart } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { ProximityPromptService } from "@rbxts/services";
import Signal from "@rbxts/signal";

type CustomPromptInstance = ProximityPrompt & {
  PromptUI: BillboardGui;
};

export default class CustomPrompt<I extends CustomPromptInstance> extends BaseComponent<{}, I> implements OnStart {
  protected readonly prompt: I["PromptUI"] = this.instance.PromptUI;
  protected readonly shown = new Signal;

  public onStart(): void {
    this.maid.GiveTask(this.shown);
    this.maid.GiveTask(ProximityPromptService.PromptShown.Connect(prompt => {
      if (prompt.Style !== Enum.ProximityPromptStyle.Custom) return;
      this.prompt.Enabled = true;
      this.shown.Fire();
    }));
    this.maid.GiveTask(ProximityPromptService.PromptHidden.Connect(prompt => {
      if (prompt.Style !== Enum.ProximityPromptStyle.Custom) return;
      this.prompt.Enabled = false;
    }));
  }
}