"use client";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/context/Dialog.context";
import React, { useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdVideoCameraBack } from "react-icons/md";

const DownloadFolder = () => {
  const { dataID, closeDialog } = useDialog();

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <p className="text-[--popover-text-color] max-w-[40ch] text-[14px]">
            Are you sure you want to download videos and images in the folder?{" "}
          </p>
          <div className="w-full flex text-[whitesmoke] border border-[--folder-border-color] rounded-[8px] p-2 mt-4 mb-3 items-center gap-3">
            <div className="bg-[--btn-active] p-5 rounded-[8px] ">
              <MdVideoCameraBack
                size={20}
                className="text-[--primary-btn-hover]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[16px]">Video</span>
              <span className="text-[25px]">0</span>
            </div>
          </div>
          <div className="w-full flex text-[whitesmoke] border border-[--folder-border-color] rounded-[8px] p-2 mb-2 items-center gap-3">
            <div className="bg-[--btn-active] p-5 rounded-[8px] ">
              <IoImageOutline
                size={20}
                className="text-[--primary-btn-hover]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[16px]">Images</span>
              <span className="text-[25px]">1</span>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3 my-3">
          <Button
            variant="outline"
            className="bg-transparent border-[#434343] hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] text-[--popover-text-color]  link-transition px-6"
            onClick={() => closeDialog("download")}
          >
            Cancel
          </Button>
          <Button className="bg-[--primary-btn] hover:bg-[--primary-btn] px-6 link-transition">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default DownloadFolder;
