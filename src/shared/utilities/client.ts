import { Players } from "@rbxts/services";

export const Player = Players.LocalPlayer;
export const Character = <ModelWithRoot>(Player.Character ?? Player.CharacterAdded.Wait()[0]);