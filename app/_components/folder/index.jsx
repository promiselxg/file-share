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
import Link from "next/link";
import { LinkWithIcon } from "../nav/sideBarNav";
import { Icon, StarIcon } from "../icon/icon";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const Folder = ({ name, star }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="px-3 py-2 bg-[--folder-bg]  flex items-center gap-2 justify-between rounded-[10px] border border-[--folder-border-color] folder link-transition h-[55px] relative">
          <div className="flex items-center gap-2">
            {star ? (
              <StarIcon className="text-[30px]" />
            ) : (
              <Icon className="text-[30px]" />
            )}
            <span className="text-[12px] text-[--sidebar-link-color] font-[600]">
              {name}
            </span>
          </div>
          <div className="folderBtn link-transition">
            <Popover className="w-full">
              <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]">
                <span className="hover:bg-[--folder-bg]  p-2 rounded-[8px]">
                  <FiMoreHorizontal className="text-[--gray] " />
                </span>
              </PopoverTrigger>
              <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] absolute right-5 top-0">
                <ul className="flex flex-col w-full">
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<PiShareFatLight size={20} />}
                      name="Share"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<FiEdit3 size={20} />}
                      name="Rename"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<BsArrowRightSquare size={20} />}
                      name="Move"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<TfiDownload size={20} />}
                      name="Download"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<PiStarLight size={20} />}
                      name="Remove from starred"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<LuCopyCheck size={20} />}
                      name="Multiple select"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--bg-red]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      color="text-[--bg-red] hover:text-white "
                      Icon={<BsTrash3 size={20} />}
                      name="Remove"
                    />
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] flex-col text-[--sidebar-link-color] p-2">
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<PiShareFatLight size={20} />}
            name="Share"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<FiEdit3 size={20} />}
            name="Rename"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<BsArrowRightSquare size={20} />}
            name="Move"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<TfiDownload size={20} />}
            name="Download"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<PiStarLight size={20} />}
            name="Remove from starred"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<LuCopyCheck size={20} />}
            name="Multiple select"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] link-transition p-0 outline-none border-none rounded-[5px]">
          <LinkWithIcon
            color="text-[--bg-red] hover:text-white "
            Icon={<BsTrash3 size={20} />}
            name="Remove"
          />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Folder;
