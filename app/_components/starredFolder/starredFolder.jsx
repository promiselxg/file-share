"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "../icon/icon";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const StarredFolder = ({ data }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <ScrollArea className="h-fit max-h-[200px] w-full">
        <div className="w-full">
          {data.map((item) => {
            const isActive = pathname === `/folder/${item?.id}`;
            console.log(isActive);
            console.log(pathname);
            return (
              <div
                className="flex text-[--sidebar-link-color] w-full pl-[24px]"
                key={item?.id}
              >
                <div
                  onClick={() => router.push(`/folder/${item?.id}`)}
                  className={`${cn(
                    `${
                      isActive && "active"
                    } flex text-[--sidebar-link-color] items-center gap-2 w-full rounded-[8px] hover:bg-[--folder-bg] p-[6px]  pl-[12px] cursor-pointer link-transition`
                  )}`}
                >
                  <StarIcon />
                  <span className="text-[12px]">{item?.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

export default StarredFolder;
