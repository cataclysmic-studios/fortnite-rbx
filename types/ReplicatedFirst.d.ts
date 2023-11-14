interface ReplicatedFirst extends Instance {
  Assets: Folder & {
    BattleBus: Model & {
      Balloon: MeshPart;
      Body: MeshPart;
      Extras: MeshPart;
      Flame: Part;
    };
    VFX: Folder & {
      ItemGlow: ParticleEmitter;
    };
    UI: Folder & {
      ItemPickupPrompt: ProximityPrompt & {
        PromptUI: BillboardGui & {
          Action: Frame & {
            Title: TextLabel;
            Keybind: TextLabel;
          };
          Info: Frame & {
            Title: TextLabel;
            UIGradient: UIGradient;
          };
          Rarity: Frame & {
            UIGradient: UIGradient;
          };
        };
      };
      Star: ImageLabel;
    };
  };
}
