interface PlayerGui extends Instance {
  Main: ScreenGui & {
    UIPadding: UIPadding;
    BuildingHotbar: Frame & {
      Trap: Frame & {
        SelectionStroke: UIStroke;
        UIAspectRatioConstraint: UIAspectRatioConstraint;
        Keybind: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIPadding: UIPadding;
        };
      };
      Wall: Frame & {
        SelectionStroke: UIStroke & {
          UIGradient: UIGradient;
        };
        Glow: ImageLabel & {
          Icon: ImageLabel;
        };
        UIAspectRatioConstraint: UIAspectRatioConstraint;
        Keybind: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIPadding: UIPadding;
        };
      };
      Floor: Frame & {
        SelectionStroke: UIStroke & {
          UIGradient: UIGradient;
        };
        Glow: ImageLabel & {
          Icon: ImageLabel;
        };
        UIAspectRatioConstraint: UIAspectRatioConstraint;
        Keybind: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIPadding: UIPadding;
        };
      };
      Pyramid: Frame & {
        SelectionStroke: UIStroke & {
          UIGradient: UIGradient;
        };
        Glow: ImageLabel & {
          Icon: ImageLabel;
        };
        UIAspectRatioConstraint: UIAspectRatioConstraint;
        Keybind: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIPadding: UIPadding;
        };
      };
      Stair: Frame & {
        SelectionStroke: UIStroke & {
          UIGradient: UIGradient;
        };
        Glow: ImageLabel & {
          Icon: ImageLabel;
        };
        UIAspectRatioConstraint: UIAspectRatioConstraint;
        Keybind: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIPadding: UIPadding;
        };
      };
      UIAspectRatioConstraint: UIAspectRatioConstraint;
      IgnoreConstraints: Folder & {
        ToolIcon: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
      };
    };
    Crosshairs: Frame & {
      Shotgun: Frame & {
        TR: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        TL: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Dot: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        BR: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        BL: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
      };
      Consumable: Frame & {
        Dot: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
      };
      SingleShot: Frame & {
        Dot: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        R: Frame & {
          UIStroke: UIStroke;
        };
        T: Frame & {
          UIStroke: UIStroke;
        };
        L: Frame & {
          UIStroke: UIStroke;
        };
        B: Frame & {
          UIStroke: UIStroke;
        };
      };
      UIAspectRatioConstraint: UIAspectRatioConstraint;
      HarvestingTool: Frame & {
        Right: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
        Left: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
        Dot: ImageLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
      };
    };
    Hotbar: Frame & {
      EmptySlots: Folder & {
        Slot3: Frame & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
        Slot1: Frame & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
        UIListLayout: UIListLayout;
        Slot5: Frame & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
        Slot4: Frame & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
        Slot2: Frame & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIStroke: UIStroke;
        };
      };
      HarvestingTool: Frame & {
        Vignette: ImageLabel;
        Keybind: TextLabel & {
          UIAspectRatioConstraint: UIAspectRatioConstraint;
          UIPadding: UIPadding;
        };
        SelectionStroke: UIStroke & {
          UIGradient: UIGradient;
        };
        Icon: ImageLabel;
        UIAspectRatioConstraint: UIAspectRatioConstraint;
      };
      Slots: Folder & {
        Slot3: Frame & {
          Vignette: ImageLabel;
          Keybind: TextLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIPadding: UIPadding;
          };
          Icon: ImageLabel;
          SelectionStroke: UIStroke & {
            UIGradient: UIGradient;
          };
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Slot1: Frame & {
          Vignette: ImageLabel;
          Keybind: TextLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIPadding: UIPadding;
          };
          Icon: ImageLabel;
          SelectionStroke: UIStroke & {
            UIGradient: UIGradient;
          };
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Slot5: Frame & {
          Vignette: ImageLabel;
          Keybind: TextLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIPadding: UIPadding;
          };
          Icon: ImageLabel;
          SelectionStroke: UIStroke & {
            UIGradient: UIGradient;
          };
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Slot4: Frame & {
          Vignette: ImageLabel;
          Keybind: TextLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIPadding: UIPadding;
          };
          Icon: ImageLabel;
          SelectionStroke: UIStroke & {
            UIGradient: UIGradient;
          };
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
        Slot2: Frame & {
          Vignette: ImageLabel;
          Keybind: TextLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            UIPadding: UIPadding;
          };
          Icon: ImageLabel;
          SelectionStroke: UIStroke & {
            UIGradient: UIGradient;
          };
          UIAspectRatioConstraint: UIAspectRatioConstraint;
        };
      };
      UIAspectRatioConstraint: UIAspectRatioConstraint;
    };
    Minimap: Frame & {
      GameInfo: Frame & {
        PlayerCount: Frame & {
          UIListLayout: UIListLayout;
          IconBackground: ImageLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            Icon: ImageLabel;
          };
          Value: TextLabel & {
            UIStroke: UIStroke;
          };
        };
        StormInfo: Frame & {
          UIListLayout: UIListLayout;
          IconBackground: ImageLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            Icon: ImageLabel;
          };
          Timer: TextLabel & {
            UIStroke: UIStroke;
          };
        };
        UIListLayout: UIListLayout;
        UIAspectRatioConstraint: UIAspectRatioConstraint;
        Eliminations: Frame & {
          UIListLayout: UIListLayout;
          IconBackground: ImageLabel & {
            UIAspectRatioConstraint: UIAspectRatioConstraint;
            Icon: ImageLabel;
          };
          Value: TextLabel & {
            UIStroke: UIStroke;
          };
        };
      };
      UIAspectRatioConstraint: UIAspectRatioConstraint;
      Content: Frame & {
        Safezone: ImageLabel & {
          UICorner: UICorner;
        };
        Me: ImageLabel;
      };
    };
  };
  Lobby: ScreenGui;
  Menu: ScreenGui;
}