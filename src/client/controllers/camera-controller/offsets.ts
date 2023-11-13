import CameraMode from "./mode";

const CAMERA_OFFSETS: Partial<Record<CameraMode, CFrame>> = {
  [CameraMode.Character]: new CFrame(3, 3, 6)
};

export default CAMERA_OFFSETS;