"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/context/Dialog.context";
import { useFolderCRUD } from "@/context/folder.context";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const Rename = ({ id, title }) => {
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const { closeDialog } = useDialog();
  const { renameFolderStatus, handleRenameFolder } = useFolderCRUD();
  return (
    <>
      <Input
        placeholder="Enter a folder name"
        className="border border-[#434343] boxShadow focus-visible:outline-none focus-visible:border-[--primary-btn] text-[--sidebar-link-color] text-[14px] rounded-[8px] mt-3"
        defaultValue={title}
        onChange={(e) => setNewFolderTitle(e.target.value)}
      />
      <div className="w-full flex justify-end gap-3">
        <Button
          variant="outline"
          className="bg-transparent border-[#434343] hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] text-[--popover-text-color]"
          onClick={() => closeDialog("rename")}
        >
          Cancel
        </Button>
        <Button
          className="bg-[--primary-btn] hover:bg-[--primary-btn] disabled:cursor-not-allowed"
          onClick={() => handleRenameFolder(newFolderTitle || title, id)}
          disabled={renameFolderStatus || !newFolderTitle}
        >
          {renameFolderStatus && <Loader2 className=" animate-spin" />}
          {renameFolderStatus ? "please wait..." : "Done"}
        </Button>
      </div>
    </>
  );
};

export default Rename;
