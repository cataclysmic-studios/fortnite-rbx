import CameraMode from "../../../shared/structs/camera-mode";

const { rad } = math;

const CAMERA_OFFSETS: Partial<Record<CameraMode, CFrame>> = {
  [CameraMode.Character]: new CFrame(3, 3, 6),
  [CameraMode.BattleBus]: new CFrame(65, 30, 0).mul(CFrame.Angles(0, rad(90), 0))
};

export default CAMERA_OFFSETS;