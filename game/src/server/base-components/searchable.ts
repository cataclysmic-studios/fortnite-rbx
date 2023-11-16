import { BaseComponent } from "@flamework/components";

import { Assets } from "common/utilities/shared";

export default class Searchable<
  A extends object = {},
  I extends BasePart = BasePart
> extends BaseComponent<A, I> {

  protected createPrompt(): typeof Assets.UI.SearchPrompt {
    const searchPrompt = Assets.UI.SearchPrompt.Clone();
    searchPrompt.PromptUI.Adornee = this.instance;
    searchPrompt.Parent = this.instance;
    this.maid.GiveTask(searchPrompt);

    return searchPrompt;
  }
}