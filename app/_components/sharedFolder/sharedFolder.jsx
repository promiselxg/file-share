import Link from "next/link";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "../icon/icon";

const SharedFolder = () => {
  return (
    <>
      <ScrollArea className="h-fit max-h-[200px] w-full">
        <div className="w-full">
          <div className="flex text-[--sidebar-link-color] w-full pl-[24px]">
            <Link
              href="/"
              className="flex text-[--sidebar-link-color] items-center gap-2 w-full rounded-[8px] hover:bg-[--folder-bg] p-[6px]  pl-[12px] "
            >
              <StarIcon />
              <span className="text-[12px]">folder 9</span>
            </Link>
          </div>
          <div className="flex text-[--sidebar-link-color] w-full pl-[24px]">
            <Link
              href="/"
              className="flex text-[--sidebar-link-color] items-center gap-2 w-full rounded-[8px] hover:bg-[--folder-bg] p-[6px]  pl-[12px] "
            >
              <StarIcon />
              <span className="text-[12px]">Developers hub</span>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default SharedFolder;
