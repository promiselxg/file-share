"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "../../_components/icon/icon";
import { useRouter } from "next/navigation";

const SharedFolder = ({ data }) => {
  const router = useRouter();
  return (
    <>
      {data?.map((folder) => {
        return (
          <div
            className={cn(
              ` border-[#434343] border-[1px] bg-[--folder-bg] flex items-center justify-between rounded-[10px] folder link-transition h-[55px] relative overflow-hidden cursor-pointer`
            )}
            key={folder.id}
            onClick={() =>
              router.push(`/shared/${folder.folderid}/${folder.id}`)
            }
          >
            <div
              className={cn(
                `flex items-center gap-4 px-3 w-full justify-between`
              )}
            >
              <div className="flex items-center gap-4">
                <Icon className="text-[30px]" />
                <span className="text-[14px] text-[--sidebar-link-color] font-[600]">
                  {folder.name}
                </span>
              </div>
              <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer">
                <AvatarImage
                  src={folder?.createdBy?.imageUrl}
                  alt={folder?.createdBy?.username}
                />
                <AvatarFallback className="uppercase">
                  {folder?.createdBy?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SharedFolder;
