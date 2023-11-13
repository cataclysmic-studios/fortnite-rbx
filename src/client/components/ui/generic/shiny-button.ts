import type { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { tween } from "shared/utilities/ui";

@Component({ tag: "ShinyButton" })
export class ShinyButton extends BaseComponent<{}, GuiButton> implements OnStart {
  public onStart(): void {
    const bounds = 1;
    const startPosition = UDim2.fromScale(-bounds, 0.5);
    const shine = new Instance("ImageLabel");
    shine.AnchorPoint = new Vector2(0, 0.5);
    shine.Position = startPosition;
    shine.Size = UDim2.fromScale(0.75, 1.5);
    shine.Image = "rbxassetid://14998238141";
    shine.Parent = this.instance;

    task.spawn(() => {
      while (task.wait(math.random(5, 20)))
        tween(shine, new TweenInfo(0.25), {
          Position: UDim2.fromScale(bounds, 0.5)
        }).Completed.Once(() => shine.Position = startPosition);
    });
  }
}