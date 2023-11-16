import { Players } from "@rbxts/services";

export const Player = Players.LocalPlayer;
export const PlayerGui = <PlayerGui>Player.WaitForChild("PlayerGui");
export const Character = <ModelWithRoot>(Player.Character ?? Player.CharacterAdded.Wait()[0]);