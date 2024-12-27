"use client";
import { Icon } from "@/app/_components/icon/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFolderCRUD } from "@/context/folder.context";
import React from "react";
import { FiMinusCircle } from "react-icons/fi";

const EditStarredFolder = () => {
  const { starredFolders, removeItem } = useFolderCRUD();
  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex mt-5 flex-col">
          <p className="text-[14px] text-[--popover-text-color] mb-2">
            Drag to reset the sequence
          </p>
          <ScrollArea className="w-full flex border border-[--folder-bg] rounded-[5px] h-[300px] min-h-[300px] bg-[--body-bg]">
            <ul className="w-full p-2 flex flex-col gap-y-1">
              {starredFolders?.map((folder) => {
                return (
                  <li
                    className="w-full flex  px-3 py-1 rounded-[8px] cursor-pointer hover:bg-[--folder-bg] link-transition"
                    key={folder.id}
                  >
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Icon className="text-[16px]" />
                        <span className="text-[--popover-text-color] text-sm">
                          {folder.name}
                        </span>
                      </div>
                      <div>
                        <FiMinusCircle
                          size={25}
                          className=" cursor-pointer text-[--bg-red] hover:text-[--bg-red-hover] link-transition"
                          onClick={() => removeItem(starredFolders, folder?.id)}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default EditStarredFolder;
