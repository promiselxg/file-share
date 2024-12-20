"use client";
import React from "react";
import { FiMic } from "react-icons/fi";
import ControlWrapper from "./control";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { BsBadgeHd } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { Button } from "@/components/ui/button";
import useDesktopScreenRecorder from "@/hooks/use-desktop-screen-recorder";
import { cn } from "@/lib/utils";

const ImageAndVideoScreenRecord = ({ source }) => {
  const { isRecording, startRecording, stopRecording } =
    useDesktopScreenRecorder();

  return (
    <>
      <div className="w-full flex flex-col">
        <ControlWrapper
          Icon={<FiMic />}
          heading="Record Mic Sound"
          type="switch"
          media="sound"
          source={source}
        />
        <ControlWrapper
          Icon={<TbDeviceComputerCamera />}
          heading="Embed Camera"
          type={source === "desktop" ? "switch" : undefined}
          media="camera"
          source={source}
        />
        <ControlWrapper
          Icon={<BsBadgeHd />}
          heading="Maximum Resolution"
          type="resolution"
        />
        <ControlWrapper Icon={<GoClock />} heading="Countdown" type="counter" />
        <ControlWrapper
          heading="Enjoy all premium features for first 20 videos.Upgrade to unlock unlimited videos."
          type="text"
        />
        <div className="w-full my-2">
          <Button
            className={cn(
              `w-full p-5 bg-[--primary-btn] hover:bg-[--primary-btn-hover] ${
                isRecording && "bg-[red] text-white"
              }`
            )}
            onClick={() => {
              isRecording ? stopRecording() : startRecording();
            }}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageAndVideoScreenRecord;
