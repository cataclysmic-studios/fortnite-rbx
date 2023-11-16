import { Component, BaseComponent } from "@flamework/components";

@Component({ tag: "Storm" })
export class Storm extends BaseComponent<{}, Workspace["GameObjects"]["Storm"]> {
  public isInside(part: BasePart): boolean {
    const offset = part.Position.sub(this.instance.Position);
    const halfHeight = this.instance.Mesh.Scale.Y / 2;
    const radius = this.instance.Mesh.Scale.X;
    const distanceSquared = offset.X * offset.X + offset.Z * offset.Z;
    return !(offset.Y > -halfHeight && offset.Y < halfHeight && distanceSquared < radius * radius);
  }
}