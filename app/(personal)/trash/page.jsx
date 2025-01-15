/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import ImageVideoDelete from "../_components/thumbnail/thumbnail-delete";
import { useFolderCRUD } from "@/context/folder.context";
import CustomAlertModal from "../_components/modal/alert-modal";
import TrashCheckBoxControl from "../_components/trash";
import TrashFolder from "../_components/folder/trash";
import {
  SkeletonCard,
  SkeletonDocument,
} from "../_components/skeleton/skeleton";
import { useDialog } from "@/context/Dialog.context";
import EmptyCard from "../_components/empty/empty";

const TrashPage = () => {
  const {
    checkedCount,
    setTrashedDocument,
    trashedDocument,
    trashedFolder,
    loadingFolders,
    loadingDocuments,
    fetchTrashDocuments,
    fetchTrashFolders,
    fetchStarredFolders,
  } = useFolderCRUD();

  const { openDeleteDialog } = useDialog();

  useEffect(() => {
    fetchTrashFolders();
    fetchTrashDocuments();
    fetchStarredFolders();
  }, []);

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
            {trashedFolder.length > 0 ||
              (trashedDocument.length > 0 && (
                <div className="w-full flex">
                  <div className="container">
                    <div className="flex justify-between w-full items-center container  p-3">
                      <h1 className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[28px]">
                        Trash
                      </h1>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          openDeleteDialog(
                            "alert",
                            "Are you sure you want to permanently delete all items in the Trash?",
                            "",
                            "Delete",
                            "trash",
                            "emptyTrash"
                          )
                        }
                      >
                        Empty Trash
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex flex-col">
              <div className="container">
                {loadingFolders ? (
                  <div className="grid w-full grid-cols-4 gap-5 relative">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                ) : (
                  <div className="flex w-full p-3 flex-col gap-y-2">
                    {trashedFolder.length > 0 && (
                      <p className="text-[14px] text-[--gray] leading-[14px]">
                        Folders
                      </p>
                    )}
                    <div className="grid w-full grid-cols-5 gap-5 relative">
                      <TrashFolder data={trashedFolder} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-8">
              {loadingDocuments ? (
                <div className="grid w-full grid-cols-4 gap-5 relative">
                  <SkeletonDocument />
                  <SkeletonDocument />
                  <SkeletonDocument />
                  <SkeletonDocument />
                </div>
              ) : (
                <div className="flex w-full p-3 flex-col">
                  {trashedDocument.length > 0 && (
                    <p className="text-[14px] text-[--gray] leading-[14px]">
                      Images &amp; Videos
                    </p>
                  )}
                  <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                    <ImageVideoDelete
                      data={trashedDocument}
                      setDocuments={setTrashedDocument}
                    />
                  </div>
                </div>
              )}
            </div>
            {!loadingFolders &&
              !loadingDocuments &&
              trashedDocument.length < 1 &&
              trashedFolder.length < 1 && (
                <>
                  <div className="flex flex-col w-full -mt-[50px]">
                    <div className="grid w-full grid-cols-1 gap-5 relative">
                      <div className="flex">
                        <h1 className="text-white text-[30px]">Trash</h1>
                      </div>
                      <EmptyCard />
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
        {checkedCount > 0 && <TrashCheckBoxControl />}
      </div>
      <CustomAlertModal />
    </>
  );
};

export default TrashPage;
