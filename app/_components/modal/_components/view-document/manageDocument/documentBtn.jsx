"use client";
import { Button } from "@/components/ui/button";
import { LuDownload } from "react-icons/lu";
import { AiOutlineCopy } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { FaRegFilePdf } from "react-icons/fa";
import { LiaImage } from "react-icons/lia";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsTrash3 } from "react-icons/bs";
import { LinkWithIcon } from "@/app/_components/nav/sideBarNav";
import { IoPrintOutline } from "react-icons/io5";

import { useDialog } from "@/context/Dialog.context";

const DocumentBtn = () => {
  const { openDialog } = useDialog();
  return (
    <>
      <div className="w-full rounded-[5px] grid grid-cols-3 gap-3">
        <div className="w-full flex flex-col items-center gap-1 hover:bg-[--folder-border-color] p-3 link-transition rounded-[5px] hover:cursor-pointer">
          <Button
            className="w-[35px] h-[35px] bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-full"
            size="icon"
          >
            <LuDownload />
          </Button>
          <span className="text-[12px]">Download</span>
        </div>
        <div className="w-full flex flex-col items-center gap-1 hover:bg-[--folder-border-color] p-3 link-transition rounded-[5px] hover:cursor-pointer">
          <Button
            className="w-[35px] h-[35px] bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-full"
            size="icon"
          >
            <LiaImage />
          </Button>
          <span className="text-[12px]">Annotate</span>
        </div>
        <div className="w-full flex flex-col items-center gap-1 hover:bg-[--folder-border-color] p-3 link-transition rounded-[5px] hover:cursor-pointer">
          <Popover className="w-full">
            <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]">
              <span className="w-[35px] h-[35px] bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-full flex items-center justify-center">
                <FiMoreHorizontal className="text-white " />
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] absolute -right-10 top-0">
              <ul className="flex flex-col w-full">
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<FaRegFilePdf size={20} />}
                    name="Download as PDF"
                    color="text-[--popover-text-color]"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<IoPrintOutline size={20} />}
                    name="Print"
                    color="text-[--popover-text-color]"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<AiOutlineCopy size={20} />}
                    name="Copy Image"
                    color="text-[--popover-text-color]"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<HiOutlineDocumentDuplicate size={20} />}
                    name="Duplicate"
                    color="text-[--popover-text-color]"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--bg-red]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    color="text-[--bg-red] hover:text-white "
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
            </PopoverContent>
          </Popover>
          <span className="text-[12px]">More</span>
        </div>
      </div>
    </>
  );
};

export default DocumentBtn;
