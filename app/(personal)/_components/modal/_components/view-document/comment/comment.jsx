"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDialog } from "@/context/Dialog.context";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/utils/getDateDifference";
import React from "react";

const Comment = ({ data }) => {
  const { openDialog, toggleComment, handleToggleComment } = useDialog();
  return (
    <>
      <ScrollArea
        className={cn(
          `${toggleComment ? "h-[330px]" : "h-[430px]"} w-full flex`
        )}
      >
        <div className="flex flex-col">
          {data.map((item, index) => (
            <div key={index} className="flex items-start w-full py-3 gap-1">
              <div className="relative w-[40px] h-[40px]">
                <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer">
                  <AvatarImage
                    src={item?.createdBy?.photoUrl}
                    alt={item?.createdBy?.username}
                  />
                  <AvatarFallback className="bg-[#2ecc71] text-sm uppercase font-bold">
                    {item?.createdBy?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col relative w-full commentBox">
                <div className="flex items-center gap-2">
                  <h1 className="text-[14px] font-semibold">
                    {item?.createdBy?.username}
                  </h1>
                  <p className="text-[12px] text-[--text-color]">
                    {item?.time}
                  </p>
                </div>
                <p className="text-[14px] text-[--text-color]">
                  {item?.comment}
                </p>
                <p className="text-[12px] text-[--text-color]">
                  {formatDateTime(item?.date)}
                </p>
                <div className="text-[12px] absolute right-0 top-0 gap-1 hidden commentAction">
                  {item?.createdBy?.userid !== "random1334" && (
                    <span
                      className=" cursor-pointer text-[--popover-text-color] link-transition"
                      onClick={() =>
                        handleToggleComment(item.createdBy.username)
                      }
                    >
                      Reply
                    </span>
                  )}
                  {item?.createdBy?.userid === "random1334" && (
                    <span
                      className=" cursor-pointer hover:text-[--bg-red-hover] link-transition"
                      onClick={() =>
                        openDialog(
                          "alert",
                          "Are you sure you want to delete this comment?",
                          "",
                          "Delete"
                        )
                      }
                    >
                      Delete
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default Comment;
