"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { LinkWithIcon } from "../nav/sideBarNav";
import { MdVideoCameraBack } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { useDialog } from "@/context/Dialog.context";

const NewItem = () => {
  const { openDialog } = useDialog();
  return (
    <div className="w-fit flex">
      <Popover>
        <PopoverTrigger className="w-full rounded-[8px] bg-[--primary-btn] border-none border text-[white] hover:bg-[--sidebar-link-active-text]  outline-none transition-all delay-75 duration-200 hover:text-[rgba(255,255,255,.8)] flex items-center px-5 text-wrap whitespace-nowrap text-sm h-[34px]">
          New item
        </PopoverTrigger>
        <PopoverContent className="flex w-[200px] bg-[--dialog-bg] shadow-md border-none mr-[30px]">
          <ul className="flex flex-col w-full">
            <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
              <LinkWithIcon
                Icon={<MdVideoCameraBack size={20} />}
                name="Record video"
                color="text-[--popover-text-color]"
                onClick={() => openDialog("recordVideo")}
              />
            </li>
            <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
              <LinkWithIcon
                Icon={<IoImageOutline size={20} />}
                name="Upload image"
                color="text-[--popover-text-color]"
                onClick={() => openDialog("uploadImage")}
              />
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NewItem;
