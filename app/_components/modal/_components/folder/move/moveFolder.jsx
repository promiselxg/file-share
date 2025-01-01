"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Icon } from "@/app/_components/icon/icon";
import { FiChevronRight } from "react-icons/fi";
import { useDialog } from "@/context/Dialog.context";
import { BsImages } from "react-icons/bs";

const MoveFolder = ({ folder }) => {
  const { selectedMoveFolderId, setSelectedMoveFolderId } = useDialog();

  const hasSubfolders = folder?.subfolders?.length > 0;

  // Determine if this folder or any of its subfolders is selected
  const isOpen =
    selectedMoveFolderId === folder.id ||
    (hasSubfolders &&
      folder?.subfolders?.some(
        (subfolder) =>
          subfolder.id === selectedMoveFolderId ||
          subfolder?.subfolders?.some(
            (nestedSubfolder) => nestedSubfolder.id === selectedMoveFolderId
          )
      ));

  const handleFolderClick = () => {
    // If this folder is clicked, toggle its selection
    setSelectedMoveFolderId(
      folder.id === selectedMoveFolderId ? null : folder.id
    );
  };

  return (
    <div className="w-full link-transition">
      <Collapsible open={isOpen}>
        <CollapsibleTrigger
          className={`flex items-center link-transition hover:bg-[--folder-bg] px-3 py-2 cursor-pointer rounded-[8px] w-full outline-none border-none mb-1 ${
            selectedMoveFolderId === folder.id
              ? "bg-[--primary-btn] hover:bg-[--primary-btn-hover] text-white"
              : ""
          }`}
          onClick={handleFolderClick}
        >
          {hasSubfolders && (
            <span className={`mr-2 transform ${isOpen ? "rotate-90" : ""}`}>
              <FiChevronRight />
            </span>
          )}
          <div className="flex items-center gap-3">
            {folder.name.toLowerCase() === "my items" ? <BsImages /> : <Icon />}
            <span>{folder.name}</span>
          </div>
        </CollapsibleTrigger>
        {hasSubfolders && (
          <CollapsibleContent className="link-transition pl-4">
            {folder.subfolders.map((subfolder) => (
              <MoveFolder key={subfolder.id} folder={subfolder} />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

export default MoveFolder;
