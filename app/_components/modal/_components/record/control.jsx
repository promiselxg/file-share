import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScreenRecord } from "@/context/screenRecord.context";
import { truncateText } from "@/utils/trucateText";

const ControlWrapper = ({ Icon, heading, type, media }) => {
  const {
    toggleCamera,
    handleToggleCamera,
    handleCameraChange,
    handleAudioDeviceChange,
    handleResolutionChange,
    toggleMicrophone,
    devices,
    selectedCamera,
    selectedMicrophone,
    setSelectedCounter,
    resolutions,
    selectedResolution,
    selectedCounter,
    selectedMediaSource,
    deviceMic,
    isMicOn,
  } = useScreenRecord();
  return (
    <>
      <div className="w-full flex items-center justify-between bg-[--switch-bg] py-2 px-3 rounded-[8px] my-1 flex-col">
        <div className="flex w-full justify-between">
          {/** TEXT AND HEADING */}
          <div className="flex items-center gap-1 text-[12px]">
            {Icon && Icon}
            {heading && type === "text" && (
              <>
                <span className="text-[--primary-btn]  text-[10px] leading-[1.1] border-r-[1px] border-[--divider-border-color]">
                  {heading}
                </span>
                <span className="text-[--primary-btn]">0/20</span>
              </>
            )}
            {heading && type !== "text" && <span>{heading}</span>}
          </div>
          <div>
            {/** SWITCH TO TOGGLE SOUND AND CAMERA */}
            {type === "switch" && (
              <Switch
                className="data-[state=checked]:bg-[--primary-btn] data-[state=unchecked]:bg-[#6f6f6f]"
                onClick={() =>
                  media === "camera"
                    ? handleToggleCamera()
                    : media === "sound"
                    ? toggleMicrophone()
                    : null
                }
              />
            )}
            {/** SELECT CAMERA RESOLUTION */}
            {type === "resolution" && (
              <Select
                onValueChange={(value) => handleResolutionChange(value)}
                value={selectedResolution}
                id="resolution"
                name="resolution"
              >
                <SelectTrigger className="max-w-[100px] text-[12px] flex border border-[--folder-border-color] bg-[--body-bg] h-3">
                  <SelectValue placeholder="Select Resolution" />
                </SelectTrigger>
                <SelectContent className="bg-[--dialog-bg] border-none outline-none text-[--popover-text-color]">
                  {resolutions.map((resolution, index) => (
                    <SelectItem key={index} value={resolution.value}>
                      {resolution.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {/** ADJUST TIMER COUNTER */}
            {type === "counter" && (
              <div className="flex items-center gap-1 text-[12px]">
                <Input
                  type="number"
                  name="counter"
                  id="counter"
                  min={3}
                  max={10}
                  value={selectedCounter}
                  onChange={(e) => setSelectedCounter(e.target.value)}
                  className="border border-[--folder-border-color] flex w-[50px] px-2 py-2 h-4 bg-[--body-bg]"
                />
                s
              </div>
            )}
          </div>
        </div>
        {/** DISPLAY AND SELECT AVAILABLE MICROPHONE */}
        {media === "sound" && isMicOn && (
          <div className="w-full flex">
            <Select
              className="w-full"
              onValueChange={handleAudioDeviceChange}
              defaultValue={selectedMicrophone}
              value={selectedMicrophone}
              id="mic"
            >
              <SelectTrigger className="w-full text-[12px] flex border border-[--folder-border-color] bg-[--body-bg] h-3">
                <SelectValue placeholder="Select Microphone" />
              </SelectTrigger>
              <SelectContent className="bg-[--dialog-bg] border-none outline-none text-[--popover-text-color] w-fit">
                {deviceMic?.microphones?.map((mic) => (
                  <SelectItem key={mic.deviceId} value={mic.deviceId}>
                    {truncateText(mic.label, 30)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {/** DISPLAY AND SELECT AVAILABLE CAMERA SOURCE*/}
        {((media === "camera" && toggleCamera) ||
          (selectedMediaSource === "camera" && toggleCamera)) && (
          <div className="w-full flex">
            <Select
              className="w-full"
              onValueChange={handleCameraChange}
              defaultValue={selectedCamera}
              id="camera"
            >
              <SelectTrigger className="w-full text-[12px] flex border border-[--folder-border-color] bg-[--body-bg] h-3">
                <SelectValue placeholder="Select Camera" />
              </SelectTrigger>
              <SelectContent className="bg-[--dialog-bg] border-none outline-none text-[--popover-text-color]">
                {devices?.cameras?.map((camera) => (
                  <SelectItem key={camera.deviceId} value={camera.deviceId}>
                    {truncateText(camera.label, 30)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </>
  );
};

export default ControlWrapper;
