import type { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";

import { Assets } from "common/utilities/shared";
import { tween } from "common/utilities/ui";
import CustomPrompt from "client/base-components/custom-prompt";

@Component({ tag: "SearchPrompt" })
export class SearchPrompt extends CustomPrompt<typeof Assets.UI.SearchPrompt> implements OnStart {
  public onStart(): void {
    const tweenInfo = new TweenInfo(this.instance.HoldDuration / 2, Enum.EasingStyle.Linear);
    const radialBar = this.instance.PromptUI.Action.RadialBar;
    const gradient1 = radialBar.Half1.Frame.UIStroke.UIGradient;
    const gradient2 = radialBar.Half2.Frame.UIStroke.UIGradient;
    const defaultRotation1 = 0.1;
    const defaultRotation2 = 180;
    gradient1.Rotation = defaultRotation1;
    gradient2.Rotation = defaultRotation2;
    radialBar.Half2.Visible = false;

    let searched = false;
    this.maid.GiveTask(this.instance.PromptButtonHoldBegan.Connect(() => {
      tween(gradient1, tweenInfo, {
        Rotation: defaultRotation1 + 180
      }).Completed.Once(() => {
        radialBar.Half2.Visible = true;
        tween(gradient2, tweenInfo, {
          Rotation: defaultRotation2 + 180
        }).Completed.Once(() => {
          this.instance.PromptUI.Enabled = false;
          searched = true;
        });
      });
    }));
    this.maid.GiveTask(this.instance.PromptButtonHoldEnded.Connect(() => {
      if (searched) return;

      tween(gradient2, tweenInfo, {
        Rotation: defaultRotation2
      }).Completed.Once(() => {
        radialBar.Half2.Visible = false;
        tween(gradient1, tweenInfo, {
          Rotation: defaultRotation1
        });
      });
    }));
  }
}