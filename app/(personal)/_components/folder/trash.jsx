"use client";
import React, { useEffect } from "react";
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
import { useDialog } from "@/context/Dialog.context";
import { truncateText } from "@/utils/trucateText";

const TrashFolder = ({ data }) => {
  const { checkedStates, handleCheckboxChange, handleRestoreTrashedFolder } =
    useFolderCRUD();
  const { openDeleteDialog } = useDialog();

  return (
    <>
      {data?.map((folder) => (
        <TrashFolderItem
          key={folder.id}
          folder={folder}
          isChecked={!!checkedStates[folder.id]}
          onCheckboxChange={(checked) =>
            handleCheckboxChange(folder.id, checked)
          }
          handleRestoreTrashedFolder={handleRestoreTrashedFolder}
          openDeleteDialog={openDeleteDialog}
        />
      ))}
    </>
  );
};

const TrashFolderItem = ({
  folder,
  isChecked,
  onCheckboxChange,
  openDeleteDialog,
  handleRestoreTrashedFolder,
}) => {
  return (
    <div
      className={cn(
        `trash-folder bg-[--folder-bg] flex items-center justify-between rounded-[10px] folder link-transition h-[55px] relative overflow-hidden`,
        isChecked
          ? "border-[--primary-btn] border-[1px]"
          : "border-[#434343] border-[1px]"
      )}
    >
      <div className="mainTrashFolder flex items-center gap-4 px-3 py-2 w-full">
        {isChecked ? (
          <Checkbox
            className="text-[25px] w-[20px] h-[20px] bg-[#000] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white border border-[--gray] hover:border-[whitesmoke] link-transition"
            checked={isChecked}
            onCheckedChange={onCheckboxChange}
          />
        ) : (
          <Icon className="text-[20px]" />
        )}
        <span className="text-[12px] text-[--sidebar-link-color] font-[600]">
          {truncateText(folder.name)}
        </span>
      </div>

      <div className="trashFolderWithControls flex items-center gap-4 px-3 py-2 justify-between">
        <div className="flex items-center gap-4">
          <Checkbox
            className="text-[25px] w-[20px] h-[20px] bg-[#000] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white border border-[--gray] hover:border-[whitesmoke] link-transition"
            checked={isChecked}
            onCheckedChange={onCheckboxChange}
          />
          <span className="text-[12px] text-[--sidebar-link-color] font-[600]">
            {truncateText(folder.name, 18)}
          </span>
        </div>

        {!isChecked && (
          <FolderActions
            folder={folder}
            id={folder.id}
            openDeleteDialog={openDeleteDialog}
            handleRestoreTrashedFolder={handleRestoreTrashedFolder}
          />
        )}
      </div>
    </div>
  );
};

const FolderActions = ({
  openDeleteDialog,
  handleRestoreTrashedFolder,
  id,
}) => (
  <div className="flex items-center gap-2 text-[--gray]">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <MdOutlineRestorePage
            className="cursor-pointer"
            size={20}
            onClick={() => handleRestoreTrashedFolder(id)}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-[--gray]">Restore</TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <GoTrash
            className="cursor-pointer"
            size={20}
            onClick={() =>
              openDeleteDialog(
                "alert",
                "Are you sure you want to permanently delete the selected item(s)?",
                "",
                "",
                id,
                "deleteFolder"
              )
            }
          />
        </TooltipTrigger>
        <TooltipContent className="bg-[--gray]">Delete forever</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

export default TrashFolder;
