interface Workspace extends WorldRoot {
  GameObjects: Folder & {
    BusPath: Model & {
      Start: Part;
      End: Part;
    };
    Storm: Part & {
      Mesh: SpecialMesh;
    };
  };
}