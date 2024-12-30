"use client";
import React from "react";
import FolderTree from "./folderTree";
import { folderStructure } from "./data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useDialog } from "@/context/Dialog.context";
import { Icon } from "@/app/_components/icon/icon";

const MoveFolder = () => {
  const {
    selectedMoveFolder,
    setSelectedMoveFolder,
    closeDialog,
    openDialog,
    moveFolderId,
  } = useDialog();

  const isMoveDisabled = (folders, moveFolderId, selectedFolderId) => {
    const checkFolders = (folders, parentId = null) => {
      for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        const isLastFolder = i === folders.length - 1; // Check if this is the last folder in the parent's array

        // Disable if this folder is the one being moved
        if (folder.id === moveFolderId) {
          return true;
        }
        // Disable if the selected folder matches the parentFolderId
        if (parentId === selectedFolderId) {
          return true;
        }

        // Additional check: if the folder is the last folder in the parent array and its parentFolderId matches the folder being moved
        console.log(parentId);
        if (isLastFolder && parentId === moveFolderId) {
          return true;
        }

        // Recursively check subfolders
        if (folder.subfolders && folder.subfolders.length > 0) {
          if (checkFolders(folder.subfolders, folder.id)) {
            return true;
          }
        }
      }
      return false;
    };

    return checkFolders(folders);
  };

  const isDisabled = isMoveDisabled(
    folderStructure,
    moveFolderId,
    selectedMoveFolder?.id
  );

  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex mt-5 flex-col">
          <p className="text-[14px] text-[--popover-text-color] mb-2">
            Folders
          </p>
          <ScrollArea className="w-full flex border border-[--gray] h-fit max-h-[300px] bg-[--body-bg] p-5 text-[--gray] rounded-t-lg ">
            <FolderTree folders={folderStructure} />
          </ScrollArea>
          <div className="w-full flex border p-1 border-[--gray] rounded-b-lg border-t-0 text-center justify-center text-[--primary-btn] cursor-pointer">
            {selectedMoveFolder?.name ? (
              <Button
                className="bg-transparent hover:bg-transparent w-full flex items-center gap-2 text-[--primary-btn] hover:text-[--primary-btn-hover] link-transition"
                onClick={() => openDialog("newFolder")}
              >
                <FiPlus /> create a new folder in {selectedMoveFolder.name}
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
                setSelectedMoveFolder(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="w-fit rounded-[8px] bg-[--primary-btn] border-[--primary-btn] border text-white hover:bg-[--primary-btn-hover] hover:border-[--primary-btn-hover] hover:text-white link-transition h-[40px] px-5 disabled:bg-[--gray] disabled:border-[--gray] disabled:cursor-not-allowed"
              disabled={isDisabled}
            >
              Move to{" "}
              {selectedMoveFolder?.name && (
                <>
                  <Icon /> {selectedMoveFolder?.name}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoveFolder;
