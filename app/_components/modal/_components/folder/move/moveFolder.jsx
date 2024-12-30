"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Icon } from "@/app/_components/icon/icon";
import { FiChevronRight } from "react-icons/fi";
import { useDialog } from "@/context/Dialog.context";

const Folder = ({ folder }) => {
  const { selectedMoveFolder, setSelectedMoveFolder } = useDialog();
  const [isOpen, setIsOpen] = useState(false);
  const hasSubfolders = folder.subfolders && folder.subfolders.length > 0;

  const handleFolderClick = () => {
    setSelectedMoveFolder({ name: folder.name, id: folder.id });
    if (hasSubfolders) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full link-transition">
      <Collapsible open={isOpen}>
        <CollapsibleTrigger
          className={`flex items-center link-transition hover:bg-[--folder-bg] px-3 py-2 cursor-pointer rounded-[8px]
             w-full ${
               selectedMoveFolder?.id === folder.id
                 ? "bg-[--primary-btn] text-white"
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
            <Icon />
            <span>{folder.name}</span>
          </div>
        </CollapsibleTrigger>
        {hasSubfolders && (
          <CollapsibleContent className="link-transition pl-4">
            {folder.subfolders.map((subfolder, index) => (
              <Folder key={index} folder={subfolder} />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

export default Folder;
