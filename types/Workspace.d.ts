interface Workspace extends WorldModel {
  Lobby: Folder & {
    Camera: Part;
  };
  GameObjects: Folder & {
    Storm: Part & { Mesh: SpecialMesh };
  }
}