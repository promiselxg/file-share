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

const Folder = ({ data }) => {
  const navigate = useRouter();
  const { openRenameDialog, openDialog, openMoveFolderDialog } = useDialog();

  return (
    <>
      {data?.map((folder) => (
        <ContextMenu key={folder.id}>
          <ContextMenuTrigger>
            <div
              className="px-3 py-2 bg-[--folder-bg] flex items-center gap-2 justify-between rounded-[10px] border border-[--folder-border-color] folder link-transition h-[55px] relative cursor-pointer"
              onClick={() => navigate.push(`/folder/${folder.id}`)}
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
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] flex-col text-[--sidebar-link-color] p-2">
            <MenuItems
              openDialog={openDialog}
              id={folder?.id}
              title={folder.name}
              openRenameDialog={openRenameDialog}
              openMoveFolderDialog={openMoveFolderDialog}
            />
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </>
  );
};

export default Folder;
