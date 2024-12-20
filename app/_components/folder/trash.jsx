"use client";
import React from "react";
import { Icon } from "../icon/icon";
import { Checkbox } from "@/components/ui/checkbox";
import "./style.css";
import { MdOutlineRestorePage } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useFolderCRUD } from "@/context/folder.context";

const TrashFolder = ({ data }) => {
  const { checkedStates, handleCheckboxChange } = useFolderCRUD();

  return (
    <>
      {data?.map((folder) => {
        const isChecked = !!checkedStates[folder.id];
        return (
          <div
            className={cn(
              ` ${
                isChecked
                  ? "border-[--primary-btn] border-[1px]"
                  : "border-[#434343] border-[1px]"
              } trash-folder bg-[--folder-bg] flex items-center justify-between rounded-[10px] folder link-transition h-[55px] relative overflow-hidden`
            )}
            key={folder.id}
          >
            <div
              className={cn(
                `mainTrashFolder flex items-center gap-4 px-3 py-2 w-full`
              )}
            >
              {!isChecked ? (
                <Icon className="text-[20px]" />
              ) : (
                <Checkbox
                  className="text-[25px] w-[20px] h-[20px] bg-[#000] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white"
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(folder.id, checked)
                  }
                />
              )}
              <span className="text-[12px] text-[--sidebar-link-color] font-[600]">
                {folder.name}
              </span>
            </div>
            <div
              className={cn(
                `trashFolderWithControls items-center gap-4 px-3 py-2 w-full absolute top-0 left-0 h-full hidden justify-between`
              )}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  className="text-[25px] w-[20px] h-[20px] bg-[#000] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white"
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(folder.id, checked)
                  }
                />
                <span className="text-[12px] text-[--sidebar-link-color] font-[600]">
                  {folder.name}
                </span>
              </div>
              {!isChecked && (
                <div className="flex items-center gap-2 text-[--gray]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MdOutlineRestorePage
                          className=" cursor-pointer"
                          size={20}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[--gray]">
                        Restore
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <GoTrash className=" cursor-pointer" size={20} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[--gray]">
                        Delete forever
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TrashFolder;
