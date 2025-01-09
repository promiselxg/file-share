"use client";

import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon, StarIcon } from "../icon/icon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDialog } from "@/context/Dialog.context";
import { useRouter } from "next/navigation";
import { useFolderCRUD } from "@/context/folder.context";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { FolderMenuItem } from "../menuItem/menu";
import { IoIosLink } from "react-icons/io";

const Folder = ({ data }) => {
  const navigate = useRouter();
  const {
    openDownloadFolderDialog,
    openRenameDialog,
    openDialog,
    openMoveFolderDialog,
    openShareFolder,
    setClosePopUp,
  } = useDialog();

  const {
    checkedCount,
    checkedStates,
    handleCheckboxChange,
    handleAddToFavorite,
  } = useFolderCRUD();
  return (
    <>
      {data?.map((folder) => {
        const isChecked = !!checkedStates[folder.id];
        return (
          <ContextMenu
            key={folder.id}
            onOpenChange={() => setClosePopUp((prev) => !prev)}
          >
            <ContextMenuTrigger>
              <div
                className={cn(
                  `${
                    isChecked
                      ? "border-[--primary-btn]"
                      : "border-[--folder-border-color] "
                  } px-3 py-2 bg-[--folder-bg] flex items-center gap-2 justify-between rounded-[10px] border folder link-transition h-[55px] relative cursor-pointer`
                )}
                onClick={() =>
                  checkedCount < 1 && navigate.push(`/folder/${folder.id}`)
                }
              >
                <div className="flex items-center gap-2">
                  {folder?.favorite ? (
                    <div className="relative">
                      <StarIcon className="text-[30px]" />
                      {folder?.shareLink && (
                        <div className="absolute bottom-0 right-0 bg-[--body-bg] rounded-full text-sm flex items-center justify-center p-[2px] text-[--gray]">
                          <IoIosLink size={8} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <Icon className="text-[30px]" />
                      {folder?.shareLink && (
                        <div className="absolute bottom-0 right-0 bg-[--body-bg] rounded-full text-sm flex items-center justify-center p-[2px] text-[--gray]">
                          <IoIosLink size={8} />
                        </div>
                      )}
                    </div>
                  )}
                  <span className="text-[12px] text-[--sidebar-link-color] font-[600]">
                    {folder?.name}
                  </span>
                </div>
                {checkedCount < 1 && (
                  <div className="folderBtn link-transition">
                    <Popover className="w-full">
                      <PopoverTrigger
                        className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="hover:bg-[--folder-bg] p-2 rounded-[8px]">
                          <FiMoreHorizontal className="text-[--gray]" />
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px]">
                        <FolderMenuItem
                          openDialog={openDialog}
                          id={folder?.id}
                          title={folder.name}
                          sharableLink={folder.shareLink}
                          openRenameDialog={openRenameDialog}
                          openShareFolder={openShareFolder}
                          openMoveFolderDialog={openMoveFolderDialog}
                          openDownloadFolderDialog={openDownloadFolderDialog}
                          handleCheckboxChange={handleCheckboxChange}
                          favorite={folder.favorite}
                          selectedActionData={folder}
                          setClosePopUp={setClosePopUp}
                          handleAddToFavorite={() =>
                            handleAddToFavorite(folder.id)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                {checkedCount > 0 && (
                  <div
                    className={cn(
                      `${isChecked ? " " : "folderBtn"} absolute top-3 right-3`
                    )}
                  >
                    <Checkbox
                      className="text-[25px] w-[25px] h-[25px] bg-[#000] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white border border-[--gray] hover:border-[whitesmoke] link-transition"
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(folder.id, checked)
                      }
                    />
                  </div>
                )}
              </div>
            </ContextMenuTrigger>
            {checkedCount < 1 && (
              <ContextMenuContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] flex-col text-[--sidebar-link-color] p-2">
                <FolderMenuItem
                  openDialog={openDialog}
                  id={folder?.id}
                  title={folder.name}
                  sharableLink={folder.shareLink}
                  openRenameDialog={openRenameDialog}
                  openShareFolder={openShareFolder}
                  selectedActionData={folder}
                  setClosePopUp={setClosePopUp}
                  openMoveFolderDialog={openMoveFolderDialog}
                  openDownloadFolderDialog={openDownloadFolderDialog}
                  handleCheckboxChange={handleCheckboxChange}
                  favorite={folder.favorite}
                  handleAddToFavorite={() => handleAddToFavorite(folder.id)}
                />
              </ContextMenuContent>
            )}
          </ContextMenu>
        );
      })}
    </>
  );
};

export default Folder;
