"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/context/Dialog.context";
import { folderStructure } from "./data";
import { findFolderById, isMoveDisabled } from "@/utils/folderTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiPlus } from "react-icons/fi";
import { Icon } from "@/app/_components/icon/icon";
import { BsImages } from "react-icons/bs";
import MoveFolder from "./moveFolder";

function FolderSelector() {
  const {
    selectedMoveFolderId,
    moveFolderId,
    setSelectedMoveFolderId,
    openDialog,
    closeDialog,
  } = useDialog();

  // selectedMoveFolderId is the folder ID that is currently clicked on
  // moveFolderID is the ID of the folder that was clicked which called the Move folder modal
  // folderStructure

  const movedFolder = findFolderById(selectedMoveFolderId, folderStructure);
  const isDisabled = isMoveDisabled(
    selectedMoveFolderId,
    moveFolderId,
    folderStructure
  );

  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex mt-5 flex-col">
          <p className="text-[14px] text-[--popover-text-color] mb-2">
            Folders
          </p>
          <ScrollArea className="w-full flex border border-[--gray] h-fit max-h-[300px] bg-[--body-bg] p-5 text-[--gray] rounded-t-lg ">
            {folderStructure?.map((folder, index) => (
              <MoveFolder key={index} folder={folder} />
            ))}
          </ScrollArea>
          <div className="w-full flex border p-1 border-[--gray] rounded-b-lg border-t-0 text-center justify-center text-[--primary-btn] cursor-pointer">
            {movedFolder ? (
              <Button
                className="bg-transparent hover:bg-transparent w-full flex items-center gap-2 text-[--primary-btn] hover:text-[--primary-btn-hover] link-transition"
                onClick={() => openDialog("newFolder")}
              >
                <FiPlus /> create a new folder in {movedFolder?.name}
              </Button>
            ) : (
              <Button
                className="bg-transparent hover:bg-transparent w-full flex items-center gap-2 text-[--primary-btn] hover:text-[--primary-btn-hover] link-transition"
                onClick={() => openDialog("newFolder")}
              >
                <FiPlus /> create a new folder
              </Button>
            )}
          </div>
          <div className="flex w-full justify-end mt-4 gap-3">
            <Button
              className="w-fit rounded-[8px] bg-transparent border-[--folder-border-color] border text-[--gray] hover:bg-transparent hover:border-[--nav-selected] hover:text-[--sidebar-link-active-text] link-transition h-[40px] px-5"
              onClick={() => {
                closeDialog("moveFolder");
                setSelectedMoveFolderId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="w-fit rounded-[8px] bg-[--primary-btn] border-[--primary-btn] border text-white hover:bg-[--primary-btn-hover] hover:border-[--primary-btn-hover] hover:text-white link-transition h-[40px] px-5 disabled:bg-[--gray] disabled:border-[--gray] disabled:cursor-not-allowed"
              disabled={isDisabled}
            >
              Move to{" "}
              {movedFolder?.name && (
                <>
                  {movedFolder.name.toLowerCase() === "my items" ? (
                    <BsImages />
                  ) : (
                    <Icon />
                  )}{" "}
                  {movedFolder?.name}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FolderSelector;
