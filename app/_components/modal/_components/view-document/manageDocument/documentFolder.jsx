"use client";
import { Icon } from "@/app/_components/icon/icon";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/context/Dialog.context";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const DocumentFolder = ({ data }) => {
  const { selectedDocumentId, openMoveFolderDialog } = useDialog();
  console.log(selectedDocumentId);
  return (
    <>
      {data?.folder ? (
        <div className="flex items-center justify-between">
          <span>Currently in</span>
          <div
            className="flex items-center gap-2 text-[14px] cursor-pointer"
            onClick={() =>
              openMoveFolderDialog("moveFolder", data?.folder?.id, "image")
            }
          >
            <Icon className="text-[14px]" />
            <p>{data?.folder?.name}</p>
            <FiChevronRight size={18} className="text-[--gray]" />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm">
            Move from <span className="font-bold">&quot;My items&quot;</span> to
          </p>
          <div className="w-full flex gap-2 justify-between items-center my-2">
            <Button
              className="w-1/2 bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-[8px]"
              onClick={() =>
                openMoveFolderDialog(
                  "moveFolder",
                  selectedDocumentId?.id,
                  "image"
                )
              }
            >
              Folder
            </Button>
            <span>or</span>
            <Button className="w-1/2 bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-[8px]">
              Workspace
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentFolder;
