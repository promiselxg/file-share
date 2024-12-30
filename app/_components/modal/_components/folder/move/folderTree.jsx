"use client";

import React from "react";
import { BsImages } from "react-icons/bs";
import Folder from "./moveFolder";
import { useDialog } from "@/context/Dialog.context";

const FolderTree = ({ folders }) => {
  const { selectedMoveFolder, setSelectedMoveFolder } = useDialog();
  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={`flex items-center gap-3 link-transition hover:bg-[--folder-bg] px-3 py-2 cursor-pointer rounded-[8px] w-full  transition-all delay-300 duration-300 ${
          selectedMoveFolder === "My Items"
            ? "bg-[--primary-btn] text-white"
            : ""
        }`}
        onClick={() => setSelectedMoveFolder("My Items")}
      >
        <span>
          <BsImages />
        </span>
        <span>My Items</span>
      </div>
      {folders?.map((folder, index) => (
        <Folder key={index} folder={folder} />
      ))}
    </div>
  );
};

export default FolderTree;
