local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")

local Player = Players.LocalPlayer
local Character = Player.Character or Player.CharacterAdded:Wait()
local Camera = workspace.CurrentCamera

local MIN_CAM_DISTANCE = 3.5 + 3
local MAX_CAM_DISTANCE = 7
local CAMERA_CLIP_TRANSPERENCY = 0.5
local CHARACTER_DETECTION_RADIUS = 2.5
local CHARACTER_TRANSPARENCY = 0.5
local CAMERA_SENSITIVITY = 0.25

local AngleX = 0
local AngleY = 0
local OffsetX = 3
local OffsetY = 2
local OffsetZ = MAX_CAM_DISTANCE
local CameraPosition = Vector3.new(0, 0, 0)
local AlreadyInvis

function UpdateCamera()
	UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter

	local HumanoidRootPart = Character:FindFirstChild("HumanoidRootPart")
	CameraPosition = Vector3.new(0, 0, OffsetZ)
	if Character and HumanoidRootPart then
		local startCFrame = CFrame.new((HumanoidRootPart.CFrame.Position + Vector3.new(0, OffsetY, 0)))
			* CFrame.Angles(0, math.rad(AngleX), 0)
			* CFrame.Angles(math.rad(AngleY), 0, 0)
			* CFrame.new(OffsetX, 0, 0)

		local cameraCFrame = startCFrame + startCFrame:VectorToWorldSpace(CameraPosition)
		local cameraFocus = startCFrame
			+ startCFrame:VectorToWorldSpace(Vector3.new(CameraPosition.X, CameraPosition.Y, -50000))

		Camera.CFrame = (CFrame.new(cameraCFrame.Position, cameraFocus.Position))
		Camera.CFrame:Lerp(Camera.CFrame * CFrame.new(0, 0, OffsetZ), 0.01)

		CheckForWall()
	end
end

function CheckForWall()
	local raycastParams = RaycastParams.new()
	raycastParams.FilterDescendantsInstances = { Character }
	local Center = Character:GetPivot().Position
	local Result = workspace:Raycast(Center, Camera.CFrame.Position - Center, raycastParams)

	local function SetCharacterTransparency(value: number)
		for _, part in pairs(Character:GetDescendants()) do
			if part:IsA("BasePart") or part:IsA("Decal") then
				if part.Transparency ~= 1 then
					part.Transparency = value
				end
			end
		end
	end

	if Result then
		if Result.Instance.CanCollide == true or Result.Instance.Transparency < CAMERA_CLIP_TRANSPERENCY then
			Camera.CFrame = (Camera.CFrame - (Camera.CFrame.Position - Result.Position))
				+ (Character.Head.Position - Camera.CFrame.Position).Unit
		end
	end

	if (Center - Camera.CFrame.Position).Magnitude < CHARACTER_DETECTION_RADIUS then
		if not AlreadyInvis then
			SetCharacterTransparency(CHARACTER_TRANSPARENCY)
			AlreadyInvis = true
		end
	else
		if AlreadyInvis then
			SetCharacterTransparency(0)
		end
		AlreadyInvis = false
	end
end

function MoveCamera(name: string, state: EnumItem, input: InputObject)
	if state == Enum.UserInputState.Change then
		AngleX = AngleX - input.Delta.X * CAMERA_SENSITIVITY
		AngleY = math.clamp(AngleY - input.Delta.Y * CAMERA_SENSITIVITY, -70, 80)

		local HumanoidRootPart = Character:FindFirstChild("HumanoidRootPart")
		HumanoidRootPart.CFrame = CFrame.new(HumanoidRootPart.CFrame.Position)
			* CFrame.Angles(0, math.rad(AngleX), 0)
	end
end

function ScrollCamera(name: string, state: EnumItem, input: InputObject)
	if state == Enum.UserInputState.Change then
		local wheelChange = input.Position.Z
		if (wheelChange > 0 and OffsetZ > MIN_CAM_DISTANCE) or (wheelChange < 0 and OffsetZ < MAX_CAM_DISTANCE) then
			OffsetZ = OffsetZ + (wheelChange / 2) * -1
		end
	end
end

local ThirdPersonCamera = {}
function ThirdPersonCamera.Start()
	ContextActionService:BindAction("MoveCamera", MoveCamera, false, Enum.UserInputType.MouseMovement)
	ContextActionService:BindAction("ScrollCamera", ScrollCamera, false, Enum.UserInputType.MouseWheel)
	RunService:BindToRenderStep("UpdateCamera", Enum.RenderPriority.Camera.Value, UpdateCamera)
	Character:WaitForChild("Humanoid").AutoRotate = false
end
function ThirdPersonCamera.End()
	ContextActionService:UnbindAction("MoveCamera")
	ContextActionService:UnbindAction("ScrollCamera")
	RunService:UnbindFromRenderStep("UpdateCamera")
	Character:WaitForChild("Humanoid").AutoRotate = true
	UserInputService.MouseBehavior = Enum.MouseBehavior.Default
end

Player.CharacterAdded:Connect(function(character: Model)
	Character = character
end)

return {
	ThirdPersonCamera = ThirdPersonCamera
}