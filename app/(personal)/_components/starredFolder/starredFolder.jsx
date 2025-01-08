"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarIcon } from "../icon/icon";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const StarredFolder = ({ data, loading }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <ScrollArea className="h-fit max-h-[200px] w-full">
        <div className="w-full">
          {loading ? (
            <>
              <div className="flex w-full justify-center items-center h-fit">
                <Loader2 className=" animate-spin text-white" />
              </div>
            </>
          ) : (
            data.map((item) => {
              const isActive = pathname === `/folder/${item?.id}`;
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
            })
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default StarredFolder;
