"use client";

import React from "react";
import { FiEdit3, FiMoreHorizontal } from "react-icons/fi";
import { BsArrowRightSquare } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import { PiStarLight } from "react-icons/pi";
import { LuCopyCheck } from "react-icons/lu";

import { BsTrash3 } from "react-icons/bs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LinkWithIcon } from "../nav/sideBarNav";
import { Icon, StarIcon } from "../icon/icon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDialog } from "@/context/Dialog.context";
import { useRouter } from "next/navigation";

const Folder = ({ data }) => {
  const navigate = useRouter();
  const { openRenameDialog, openDialog } = useDialog();

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
                  <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] absolute right-5 top-0">
                    <MenuItems
                      openDialog={openDialog}
                      id={folder?.id}
                      title={folder.name}
                      openRenameDialog={openRenameDialog}
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
            />
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </>
  );
};

// Helper Component for Reusable Menu Items
const MenuItems = ({ openDialog, id, title, openRenameDialog }) => {
  return (
    <>
      <ul className="flex flex-col w-full">
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition">
          <LinkWithIcon
            Icon={<PiShareFatLight size={20} />}
            name="Share"
            color="text-[--popover-text-color]"
          />
        </li>
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition">
          <LinkWithIcon
            Icon={<FiEdit3 size={20} />}
            name="Rename"
            color="text-[--popover-text-color]"
            onClick={(e) => {
              e.stopPropagation(), openRenameDialog("rename", id, title);
            }}
          />
        </li>
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition">
          <LinkWithIcon
            Icon={<BsArrowRightSquare size={20} />}
            name="Move"
            color="text-[--popover-text-color]"
          />
        </li>
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition">
          <LinkWithIcon
            Icon={<TfiDownload size={20} />}
            name="Download"
            color="text-[--popover-text-color]"
          />
        </li>
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition">
          <LinkWithIcon
            Icon={<PiStarLight size={20} />}
            name="Remove from starred"
            color="text-[--popover-text-color]"
          />
        </li>
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition">
          <LinkWithIcon
            Icon={<LuCopyCheck size={20} />}
            name="Multiple select"
            color="text-[--popover-text-color]"
          />
        </li>
        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--bg-red] rounded-[5px] link-transition">
          <LinkWithIcon
            color="text-[--bg-red] hover:text-white"
            Icon={<BsTrash3 size={20} />}
            name="Remove"
            onClick={() =>
              openDialog(
                "alert",
                "All items in this folder will be moved to the Trash.",
                "Are you sure you want to remove this folder?"
              )
            }
          />
        </li>
      </ul>
    </>
  );
};

export default Folder;
