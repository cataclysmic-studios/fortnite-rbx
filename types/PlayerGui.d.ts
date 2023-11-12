interface PlayerGui extends Instance {
  Main: ScreenGui & {
    UIPadding: UIPadding;
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
    Crosshairs: Frame & {
      UIAspectRatioConstraint: UIAspectRatioConstraint;
      HarvestingTool: Frame;
      SingleShot: Frame;
      Shotgun: Frame;
      Consumable: Frame;
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
  };  
}