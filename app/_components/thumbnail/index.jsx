import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React from "react";
import { RiExternalLinkLine } from "react-icons/ri";

import { FiEdit3, FiMoreHorizontal, FiVideo } from "react-icons/fi";
import { LinkWithIcon } from "../nav/sideBarNav";
import { GrLink } from "react-icons/gr";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { LuCopyCheck } from "react-icons/lu";
import { BsArrowRightSquare, BsTrash3 } from "react-icons/bs";
import { useDialog } from "@/context/Dialog.context";

const ThumbNail = ({ title, date, img, time }) => {
  const { openDialog } = useDialog();
  return (
    <ContextMenu className="flex flex-col">
      {/* Context Menu Trigger */}
      <ContextMenuTrigger>
        <div className="w-full overflow-hidden h-[200px] rounded-[8px] border border-[--folder-border-color] relative imgThubnail  cursor-pointer">
          <Image
            src={img}
            width={500}
            height={200}
            alt="video thumbnail"
            className="w-full object-cover h-[200px]"
          />
          {time && (
            <div className="absolute bottom-5 right-2 bg-[rgba(0,0,0,.8)] text-white text-sm py-[2px] px-[8px] rounded-[5px] font-[600]">
              {time}
            </div>
          )}
          <div className="link-transition">
            <div className="w-full relative top-0 bottom-0 bg-[rgba(0,0,0,.5)] link-transition bg-overlay"></div>
            <Popover className="w-full">
              <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px] absolute top-0 right-0">
                <span className="hover:bg-[--folder-bg] p-2 rounded-[8px] horizontalIcon opacity-0">
                  <FiMoreHorizontal size={20} className="text-white" />
                </span>
              </PopoverTrigger>
              <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] absolute right-5 top-0 z-10">
                <ul className="flex flex-col w-full">
                  <li className="flex w-full  hover:bg-[--folder-bg] rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<FiEdit3 size={20} />}
                      name="Rename"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full  hover:bg-[--folder-bg] rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<GrLink size={20} />}
                      name="Copy sharable link"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full  hover:bg-[--folder-bg] rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<BsArrowRightSquare size={20} />}
                      name="Move"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full  hover:bg-[--folder-bg] rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<LuCopyCheck size={20} />}
                      name="Select multiple items"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full  hover:bg-[--folder-bg] rounded-[5px] link-transition">
                    <LinkWithIcon
                      Icon={<RiExternalLinkLine size={20} />}
                      name="Open in new tab"
                      color="text-[--popover-text-color]"
                    />
                  </li>
                  <li className="flex w-full  hover:bg-[--bg-red]  rounded-[5px] link-transition">
                    <LinkWithIcon
                      color="text-[--bg-red] hover:text-white "
                      Icon={<BsTrash3 size={20} />}
                      name="Remove"
                      onClick={() =>
                        openDialog(
                          "alert",
                          "Are you sure you want to remove this item?",
                          " "
                        )
                      }
                    />
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="py-2 text-[--gray]">
          <h1 className="text-white text-sm leading-tight">{title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <FiVideo size={14} />
            <span className="text-[--gray] text-[12px]">{date}</span>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] flex-col text-[--sidebar-link-color] p-2">
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<FiEdit3 size={20} />}
            name="Rename"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<GrLink size={20} />}
            name="Copy sharable link"
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
            Icon={<LuCopyCheck size={20} />}
            name="Select multiple items"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] rounded-[5px] link-transition p-0">
          <LinkWithIcon
            Icon={<RiExternalLinkLine size={20} />}
            name="Open in new tab"
            color="text-[--popover-text-color]"
          />
        </ContextMenuItem>
        <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] link-transition p-0 outline-none border-none rounded-[5px]">
          <LinkWithIcon
            color="text-[--bg-red] hover:text-white "
            Icon={<BsTrash3 size={20} />}
            name="Remove"
            onClick={() =>
              openDialog(
                "alert",
                "Are you sure you want to remove this item?",
                ""
              )
            }
          />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ThumbNail;
