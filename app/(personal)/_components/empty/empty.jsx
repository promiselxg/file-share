"use client";
import { useDialog } from "@/context/Dialog.context";
import React from "react";
import { ImFilesEmpty } from "react-icons/im";
import Modals from "../modal/modal";

const EmptyCard = () => {
  const { openDialog } = useDialog();
  return (
    <>
      <div className="w-full flex md:pr-5 py-3">
        <div className="w-[95%] md:w-full container mx-auto bg-[--dialog-bg] min-h-[400px] rounded-[8px]">
          <div className="flex flex-col items-center justify-center h-full text-[--popover-text-color]">
            <ImFilesEmpty size={80} className="mb-5" />
            <h1 className="text-[18px] text-white">No items</h1>
            <p>Your awesome visual repository is empty now.</p>
            <p className="text-sm">
              Let&apos;s&nbsp;
              <span
                className="text-[--primary-btn] cursor-pointer"
                onClick={() => openDialog("recordVideo")}
              >
                record a video
              </span>{" "}
              or{" "}
              <span className="text-[--primary-btn] cursor-pointer">
                capture a screenshot
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <Modals />
    </>
  );
};

export default EmptyCard;
