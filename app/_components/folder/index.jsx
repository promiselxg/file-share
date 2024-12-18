import React from "react";
import { FiEdit3, FiMoreHorizontal } from "react-icons/fi";
import { BsArrowRightSquare } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import { PiStarLight } from "react-icons/pi";
import { PiFoldersLight } from "react-icons/pi";
import { BsTrash3 } from "react-icons/bs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { LinkWithIcon } from "../nav/sideBarNav";
import { Icon, StarIcon } from "../icon/icon";

const Folder = ({ name, star }) => {
  return (
    <>
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
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon Icon={<FiEdit3 size={20} />} name="Rename" />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<BsArrowRightSquare size={20} />}
                    name="Move"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<TfiDownload size={20} />}
                    name="Download"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<PiStarLight size={20} />}
                    name="Remove from starred"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<PiFoldersLight size={20} />}
                    name="Multiple select"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    color="text-red-900"
                    Icon={<BsTrash3 className="text-red-900" size={20} />}
                    name="Move"
                  />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Folder;
