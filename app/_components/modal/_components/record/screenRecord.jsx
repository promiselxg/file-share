"use client";
import React from "react";
import { FiMic } from "react-icons/fi";
import ControlWrapper from "./control";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { BsBadgeHd } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { Button } from "@/components/ui/button";

const ImageAndVideoScreenRecord = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <ControlWrapper
          Icon={<FiMic />}
          heading="Record Mic Sound"
          type="switch"
          media="sound"
        />
        <ControlWrapper
          Icon={<TbDeviceComputerCamera />}
          heading="Embed Camera"
          type="switch"
          media="camera"
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
          <Button className="w-full p-5 bg-[--primary-btn] hover:bg-[--primary-btn-hover]">
            Start Recording
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageAndVideoScreenRecord;
