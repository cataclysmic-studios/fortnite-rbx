interface ReplicatedFirst extends Instance {
	Assets: Folder & {
		UI: Folder & {
			ItemPickupPrompt: ProximityPrompt & {
				PromptUI: BillboardGui & {
					Rarity: Frame & {
						UIListLayout: UIListLayout;
						UIGradient: UIGradient;
					};
					Info: Frame & {
						UIGradient: UIGradient;
						Title: TextLabel & {
							UIPadding: UIPadding;
						};
					};
					Action: Frame & {
						Title: TextLabel & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIStroke: UIStroke;
						};
						Keybind: TextLabel & {
							UIAspectRatioConstraint: UIAspectRatioConstraint;
							UIPadding: UIPadding;
						};
					};
				};
			};
			Star: ImageLabel & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
			};
		};
		VFX: Folder & {
			ItemGlow: ParticleEmitter;
		};
		BattleBus: Model & {
			Balloon: MeshPart;
			Flame: Part & {
				Smoke3: ParticleEmitter;
				Embers: ParticleEmitter;
				Glow: ParticleEmitter;
				FireCore: ParticleEmitter;
				Fire4: ParticleEmitter;
				Fire: ParticleEmitter;
				Fire2: ParticleEmitter;
				PointLight: PointLight;
			};
			Extras: MeshPart;
			Body: MeshPart & {
				Balloon: Motor6D;
				Flame: Motor6D;
				Extras: Motor6D;
			};
		};
	};
}
