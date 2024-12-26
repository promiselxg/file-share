"use client";
import React from "react";
import SharedFolder from "./_component/sharedFolder";
import SharedImageVideo from "./_component/sharedImageVideo";
import { folders, imageVideo } from "./data";
import CustomAlertModal from "../_components/modal/alert-modal";

const SharedWithMe = () => {
  return (
    <>
      <div className="w-full flex relative flex-col">
        <div className="flex flex-col w-full mb-20 relative">
          <div className="flex flex-col">
            <div className="container">
              <div className="flex justify-between w-full items-center container pt-5  px-3">
                <h1 className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[24px]">
                  Shared with me
                </h1>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="container">
                <div className="flex w-full p-3 flex-col gap-y-2">
                  <p className="text-[14px] text-[--gray] leading-[14px]">
                    Folders
                  </p>
                  <div className="grid w-full grid-cols-4 gap-5 relative">
                    <SharedFolder data={folders} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full p-3 flex-col gap-y-2">
              <p className="text-[14px] text-[--gray] leading-[14px]">
                Images &amp; Videos
              </p>
              <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                <SharedImageVideo data={imageVideo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** MODALS */}
      <CustomAlertModal />
      {/** MODALS */}
    </>
  );
};

export default SharedWithMe;
