interface PlayerGui extends BasePlayerGui {
	Lobby: ScreenGui & {
		BottomBar: Frame & {
			UIGradient: UIGradient;
		};
		Padded: Frame & {
			Topbar: Frame & {
				ItemShop: TextButton & {
					UICorner: UICorner;
					UIPadding: UIPadding;
				};
				Store: TextButton & {
					UIPadding: UIPadding;
					UICorner: UICorner;
				};
				Locker: TextButton & {
					UIPadding: UIPadding;
					UICorner: UICorner;
				};
				Leaderboards: TextButton & {
					UIPadding: UIPadding;
					UICorner: UICorner;
				};
				UIListLayout: UIListLayout;
				Profile: TextButton & {
					UIPadding: UIPadding;
					UICorner: UICorner;
				};
				Play: TextButton & {
					UIPadding: UIPadding;
					UICorner: UICorner;
				};
				BattlePass: TextButton & {
					UIPadding: UIPadding;
					UICorner: UICorner;
				};
			};
			UIPadding: UIPadding;
			Pages: Folder & {
				ItemShop: Frame;
				BattlePass: Frame;
				Store: Frame;
				Leaderboards: Frame;
				Profile: Frame;
				Play: Frame & {
					GameControls: Frame & {
						Top: Frame & {
							Title: TextLabel;
							Mode: ImageLabel;
							UIPadding: UIPadding;
							ChangeMode: TextButton & {
								Title: TextLabel;
								UIStroke: UIStroke;
								UIPadding: UIPadding;
								UIGradient: UIGradient;
							};
						};
						UIAspectRatioConstraint: UIAspectRatioConstraint;
						Bottom: Frame & {
							Note: TextLabel;
							UIGradient: UIGradient;
							SquadFill: TextButton & {
								Title: TextLabel;
								UIStroke: UIStroke;
								UIPadding: UIPadding;
								UIGradient: UIGradient;
							};
							UIPadding: UIPadding;
							Ready: TextButton & {
								Parallelogram: ImageLabel & {
									UIGradient: UIGradient;
								};
								UIGradient: UIGradient;
								Title: ImageLabel & {
									UIGradient: UIGradient;
								};
							};
						};
					};
				};
				Locker: Frame;
			};
		};
	};
}
