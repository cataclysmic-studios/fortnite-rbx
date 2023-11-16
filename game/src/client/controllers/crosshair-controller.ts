import { Controller } from "@flamework/core";
import Crosshair from "shared/structs/crosshair";

import type { UIController } from "./ui-controller";
import type { MouseController } from "./mouse-controller";

@Controller()
export class CrosshairController {
  private readonly crosshairs: Frame[];
  private crosshairsUsed: Crosshair[] = [];

  public constructor(
    ui: UIController,
    private readonly mouse: MouseController
  ) {
    this.crosshairs = ui.main.getCrosshairs();
  }

  public disable(): void {
    for (const crosshair of this.crosshairs)
      crosshair.Visible = false;
  }

  public setLast(): void {
    const last = this.crosshairsUsed[this.crosshairsUsed.size() - 2];
    if (!last) return;

    this.crosshairsUsed.clear();
    this.set(last);
  }

  public set(crosshair: Crosshair): void {
    this.mouse.toggleIcon(false);
    this.disable();
    if (crosshair === Crosshair.None) return;

    const crosshairName = Crosshair[crosshair];
    const crosshairFrame = this.crosshairs.find(crosshair => crosshair.Name === crosshairName)!;
    crosshairFrame.Visible = true;

    this.crosshairsUsed.push(crosshair);
  }
}