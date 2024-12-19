import React from "react";
import { CiCamera } from "react-icons/ci";
import { CiDesktop } from "react-icons/ci";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Desktop from "./desktop";
import CameraOnly from "./camera";
import { cn } from "@/lib/utils";
import { useScreenRecord } from "@/context/screenRecord.context";

const RecordVideo = () => {
  const {
    toggleCamera,
    toggleSound,
    handleToggleCamera,
    handleToggleSound,
    videoRef,
    error,
  } = useScreenRecord();

  return (
    <>
      <Tabs
        defaultValue="desktop"
        className="flex w-full gap-5 transition-all delay-300 duration-300"
      >
        <div
          className={cn(
            `w-[600px] hidden min-h-[350px] transition-all delay-300 duration-300 ${
              toggleCamera && "flex"
            }`
          )}
        >
          <div className="w-full  bg-[#181919] rounded-[5px] overflow-hidden object-cover bg-cover flex items-center">
            <video
              ref={videoRef}
              className="w-full h-[350px] bg-[#181919] object-cover"
            ></video>
          </div>
        </div>
        <div className="flex flex-col w-[300px]">
          <TabsList className="w-full h-fit bg-transparent flex justify-between">
            <TabsTrigger
              value="desktop"
              className="data-[state=active]:text-[--primary-btn]  text-[--popover-text-color] border-b-[2px] rounded-none data-[state=active]:border-[--primary-btn] border-transparent"
            >
              <div className="flex flex-col justify-center items-center leading-[1] cursor-pointer">
                <div className="flex flex-col justify-center items-center">
                  <CiDesktop size={50} />
                  <span className="text-[14px]">Desktop</span>
                </div>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="camera"
              className="data-[state=active]:text-[--primary-btn]  text-[--popover-text-color] border-b-[2px] rounded-none data-[state=active]:border-[--primary-btn] border-transparent"
            >
              <div className="flex flex-col justify-center items-center leading-[1] cursor-pointer">
                <div className="flex flex-col justify-center items-center">
                  <CiCamera size={50} />
                  <span className="text-[14px]">Camera Only</span>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="desktop" className="text-[--popover-text-color]">
            <Desktop />
          </TabsContent>
          <TabsContent value="camera" className="text-[--popover-text-color]">
            <CameraOnly />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export default RecordVideo;
