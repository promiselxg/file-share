"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFolderCRUD } from "@/context/folder.context";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdOutlineRestorePage } from "react-icons/md";

import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoAlertCircleOutline } from "react-icons/io5";
import { apiCall } from "@/utils/apiCall";

const TrashCheckBoxControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resetCheckBox, checkedCount, checkedIds } = useFolderCRUD();
  const [loading, setLoading] = useState(false);

  const openDeleteDialogBox = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMoveToTrash = async () => {
    try {
      setLoading(true);
      const response = await apiCall("put", "/api/trash", checkedIds);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log("checked folder/document ID : ", checkedIds);

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
              onClick={() => openDeleteDialogBox()}
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
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="md:w-[430px] bg-[--dialog-bg] border-[--dialog-bg] top-[30%]">
          <AlertDialogHeader>
            <AlertDialogTitle />
            <div>
              <div className="w-full flex  gap-2">
                <IoAlertCircleOutline size={40} className="text-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-[14px] text-[--sidebar-link-color] font-[600] mb-1">
                    Remove item
                  </span>
                  <span className="text-[16px] text-[--popover-text-color] font-[600] leading-tight">
                    Are you sure you want to remove the selected item(s)?
                  </span>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8">
            <AlertDialogCancel
              onClick={() => openDeleteDialogBox()}
              className="bg-transparent text-[--sidebar-link-color] border border-[--folder-border-color] rounded-[10px] px-5 py-2 hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] link-transition"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-transparent text-[--bg-red] border border-[--bg-red] rounded-[10px] px-5 py-2 hover:bg-transparent hover:border-[--bg-red-hover] hover:text-[--bg-red-hover] link-transition disabled:cursor-not-allowed"
              onClick={() => handleMoveToTrash()}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> please wait...
                </div>
              ) : (
                "Move to Trash"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrashCheckBoxControl;
