interface Workspace extends WorldRoot {
  Map: Folder;
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