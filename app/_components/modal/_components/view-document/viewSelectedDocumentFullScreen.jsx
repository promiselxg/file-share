"use client";
import { useDialog } from "@/context/Dialog.context";
import { cn } from "@/lib/utils";

import Image from "next/image";
import React from "react";
import { FiX } from "react-icons/fi";

const ViewSelectedDocumentFullScreen = () => {
  const { selectedDocumentId, fullScreenMode, handleViewDocumentInFullScreen } =
    useDialog();

  return (
    <>
      <div
        className={cn(
          `absolute bottom-0 w-full transition-all duration-500 ease-in-out transform h-full ${
            fullScreenMode
              ? "translate-y-0 scale-1 z-[50] opacity-1"
              : "translate-y-full  scale-0 opacity-0 "
          }`
        )}
      >
        <div className="w-full flex h-[50px] sticky top-0 left-0 z-[20] bg-[rgba(0,0,0,0.5)] text-white items-center">
          <div className="absolute top-0 right-0 flex items-center h-[50px] gap-5 px-8">
            <FiX
              size={25}
              onClick={() => {
                handleViewDocumentInFullScreen("");
              }}
              className=" cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex p-3 h-full bg-[rgba(0,0,0,0.5)] overflow-scroll ">
          <div className="container mt-[10px] mx-auto mb-0 max-w-[1300px] ">
            <div className="w-full mb-36">
              <Image
                src={
                  selectedDocumentId?.mediaUrl ??
                  "https://res.cloudinary.com/promiselxg/image/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.jpg"
                }
                width={1200}
                height={1000}
                alt={selectedDocumentId?.mediaType || "selected title"}
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSelectedDocumentFullScreen;
