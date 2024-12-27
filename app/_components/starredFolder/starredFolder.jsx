import Link from "next/link";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "../icon/icon";

const StarredFolder = ({ data }) => {
  return (
    <>
      <ScrollArea className="h-fit max-h-[200px] w-full">
        <div className="w-full">
          {data.map((item) => {
            return (
              <div
                className="flex text-[--sidebar-link-color] w-full pl-[24px]"
                key={item?.id}
              >
                <Link
                  href={`/folder/${item?.id}`}
                  className="flex text-[--sidebar-link-color] items-center gap-2 w-full rounded-[8px] hover:bg-[--folder-bg] p-[6px]  pl-[12px] "
                >
                  <StarIcon />
                  <span className="text-[12px]">{item?.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

export default StarredFolder;
