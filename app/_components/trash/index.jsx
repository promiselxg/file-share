"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/context/Dialog.context";
import { useFolderCRUD } from "@/context/folder.context";
import React from "react";
import { FiX } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineRestorePage } from "react-icons/md";

const TrashCheckBoxControl = () => {
  const { resetCheckBox, checkedCount } = useFolderCRUD();
  const { openDialog } = useDialog();
  return (
    <>
      <div className="fixed bottom-0 bg-[--primary-btn] w-fit left-1/2 transform -translate-x-1/2 rounded-t-[8px] p-5 z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-white">Selected</span>
            <Badge className="bg-white  rounded-[8px] text-[--primary-btn] hover:bg-white  hover:text-[--primary-btn]">
              {checkedCount}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-white  rounded-[8px] text-[--primary-btn] hover:bg-white  hover:text-[--primary-btn]">
              <MdOutlineRestorePage /> Restore
            </Button>
            <Button
              className="bg-white  rounded-[8px] text-[--primary-btn] hover:bg-white  hover:text-[--primary-btn]"
              onClick={() =>
                openDialog(
                  "alert",
                  "Are you sure you want to permanently delete the selected item(s)?"
                )
              }
            >
              <GoTrash /> Delete
            </Button>
          </div>
          <div className=" ml-3 hover:bg-[rgba(0,0,0,0.4)] transition-all delay-75 duration-100 p-[4px] cursor-pointer rounded-[5px]">
            <FiX
              size={25}
              className="text-white"
              onClick={() => resetCheckBox()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrashCheckBoxControl;
