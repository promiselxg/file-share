import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React from "react";
import { FiMoreHorizontal, FiVideo } from "react-icons/fi";
import { LinkWithIcon } from "../nav/sideBarNav";
import { PiShareFatLight } from "react-icons/pi";

const ThumbNail = ({ title, date, img, time }) => {
  return (
    <div className="">
      <div className="w-full overflow-hidden h-[200px] rounded-[8px] border border-[--folder-border-color] relative imgThubnail  cursor-pointer">
        <Image
          src={
            img ??
            "https://awevideo.s3.amazonaws.com/video-24223306-7d6baf003965db122db057d26116cf61_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T044836Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=feb3094abb0ff6e7e04102d7186a2fd4d104c4c432cb8ae2b1fec14204a2438a"
          }
          width={500}
          height={200}
          alt="video thumbnail"
          className="w-full object-cover h-[200px]"
        />
        <div className="absolute bottom-5 right-2 bg-[rgba(0,0,0,.8)] text-white text-sm py-[2px] px-[8px] rounded-[5px] font-[600]">
          {time}
        </div>
        <div className="link-transition">
          <div className="w-full relative top-0 bottom-0 bg-[rgba(0,0,0,.5)] link-transition bg-overlay"></div>
          <Popover className="w-full">
            <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px] absolute top-0 right-0">
              <span className="hover:bg-[--folder-bg]  p-2 rounded-[8px] horizontalIcon opacity-0">
                <FiMoreHorizontal size={20} className="text-white" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] absolute right-5 top-0 z-10">
              <ul className="flex flex-col w-full">
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    Icon={<PiShareFatLight size={20} />}
                    name="Share"
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
    </div>
  );
};

export default ThumbNail;
