interface ReplicatedFirst extends Instance {
  Assets: Folder & {
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