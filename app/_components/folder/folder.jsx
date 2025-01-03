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
import { MenuItems } from "../menuItem/menuItems";
import { useFolderCRUD } from "@/context/folder.context";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const Folder = ({ data }) => {
  const navigate = useRouter();
  const {
    openDownloadFolderDialog,
    openRenameDialog,
    openDialog,
    openMoveFolderDialog,
  } = useDialog();
  const { checkedCount, checkedStates, handleCheckboxChange } = useFolderCRUD();

  return (
    <>
      {data?.map((folder) => {
        const isChecked = !!checkedStates[folder.id];
        return (
          <ContextMenu key={folder.id}>
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
                  {folder?.star ? (
                    <StarIcon className="text-[30px]" />
                  ) : (
                    <Icon className="text-[30px]" />
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
                        <MenuItems
                          openDialog={openDialog}
                          id={folder?.id}
                          title={folder.name}
                          openRenameDialog={openRenameDialog}
                          openMoveFolderDialog={openMoveFolderDialog}
                          openDownloadFolderDialog={openDownloadFolderDialog}
                          handleCheckboxChange={handleCheckboxChange}
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
                <MenuItems
                  openDialog={openDialog}
                  id={folder?.id}
                  title={folder.name}
                  openRenameDialog={openRenameDialog}
                  openMoveFolderDialog={openMoveFolderDialog}
                  openDownloadFolderDialog={openDownloadFolderDialog}
                  handleCheckboxChange={handleCheckboxChange}
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
