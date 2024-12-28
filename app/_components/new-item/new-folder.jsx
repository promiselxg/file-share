"use client";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/context/Dialog.context";
import React from "react";

const NewFolder = () => {
  const { openDialog } = useDialog();
  return (
    <>
      <Button
        className="w-fit rounded-[8px] bg-transparent border-[--folder-border-color] border text-[--gray] hover:bg-transparent hover:border-[--nav-selected] hover:text-[--sidebar-link-active-text] outline-none transition-all delay-75 duration-200"
        onClick={() => openDialog("newFolder")}
      >
        New folder
      </Button>
    </>
  );
};

export default NewFolder;
