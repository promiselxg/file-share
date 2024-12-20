"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { FiX } from "react-icons/fi";
import TrashFolder from "../_components/folder/trash";
import { Button } from "@/components/ui/button";
import ImageVideoDelete from "../_components/thumbnail/thumbnail-delete";
import { useFolderCRUD } from "@/context/folder.context";
import { Badge } from "@/components/ui/badge";
import { MdOutlineRestorePage } from "react-icons/md";
import { GoTrash } from "react-icons/go";

const folders = [
  { id: 1, name: "Folder 1" },
  { id: 2, name: "Folder 2" },
  { id: 3, name: "Folder 3" },
  { id: 4, name: "Folder 4" },
  { id: 5, name: "Folder 5" },
  { id: 6, name: "Folder 6" },
  { id: 7, name: "Folder 7" },
  { id: 8, name: "Folder 8" },
  { id: 9, name: "Folder 9" },
];

const TrashPage = () => {
  const { resetCheckBox, checkedCount } = useFolderCRUD();
  return (
    <>
      <div className="w-full flex relative flex-col">
        <div className="flex flex-col w-full mb-20 relative">
          <div className="flex container flex-col">
            <div className="p-3 w-full mt-2 h-full flex">
              <Alert className="flex items-center border-[--sidebar-link-active-bg] text-[--primary-btn] bg-transparent p-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={15} />
                    <AlertDescription className="text-[--sidebar-link-color] text-sm">
                      Items will be automatically deleted after they’ve been in
                      your Trash for 3 days. To let the Trash folder keep
                      removed items for 30 days, please{" "}
                      <Link
                        href="/"
                        className="text-[--primary-btn] font-[600]"
                      >
                        upgrade
                      </Link>
                      .
                    </AlertDescription>
                  </div>
                  <FiX />
                </div>
              </Alert>
            </div>
            <div className="w-full flex">
              <div className="container">
                <div className="flex justify-between w-full items-center container  p-3">
                  <h1 className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[28px]">
                    Trash
                  </h1>
                  <Button variant="destructive">Empty Trash</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="container">
                <div className="flex w-full p-3 flex-col gap-y-2">
                  <p className="text-[14px] text-[--gray] leading-[14px]">
                    Folders
                  </p>
                  <div className="grid w-full grid-cols-5 gap-5 relative">
                    <TrashFolder data={folders} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex w-full p-3 flex-col gap-y-2">
                <p className="text-[14px] text-[--gray] leading-[14px]">
                  Images &amp; Videos
                </p>
                <div className="grid w-full grid-cols-4 gap-5 relative">
                  <ImageVideoDelete
                    title="Glovo: you order, we deliver it!"
                    date="Jan 21, 2024"
                    time="00:24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {checkedCount > 0 && (
          <div className="fixed bottom-0 bg-[--primary-btn] w-fit left-1/2 transform -translate-x-1/2 rounded-t-[8px] p-5">
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
                <Button className="bg-white  rounded-[8px] text-[--primary-btn] hover:bg-white  hover:text-[--primary-btn]">
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
        )}
      </div>
    </>
  );
};

export default TrashPage;
