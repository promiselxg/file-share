/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import FolderBreadCrumb from "@/app/(personal)/_components/breadcrumb/folder.breadcrumb";
import Folder from "@/app/(personal)/_components/folder/folder";
import Modals from "@/app/(personal)/_components/modal/modal";
import NewFolder from "@/app/(personal)/_components/new-item/new-folder";
import NewItem from "@/app/(personal)/_components/new-item/newItem";
import ThumbNail from "@/app/(personal)/_components/thumbnail";

import { Button } from "@/components/ui/button";
import { ImFilesEmpty } from "react-icons/im";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDialog } from "@/context/Dialog.context";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiMoreHorizontal,
} from "react-icons/fi";
import { TbShare3 } from "react-icons/tb";
import CustomAlertModal from "@/app/(personal)/_components/modal/alert-modal";
import { RouteMenuItem } from "@/app/(personal)/_components/menuItem/menu";
import TrashCheckBoxControl from "@/app/(personal)/_components/trash";
import { useFolderCRUD } from "@/context/folder.context";
import { apiCall } from "@/utils/apiCall";
import {
  SkeletonCard,
  SkeletonDocument,
} from "../../_components/skeleton/skeleton";
import { Loader2 } from "lucide-react";

const FolderPage = ({ params }) => {
  const { openMoveFolderDialog, openRenameDialog, openDialog } = useDialog();
  const [folders, setFolders] = useState([]);
  const [folderBreadCrumb, setFolderBreadCrumb] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const { checkedCount, fetchStarredFolders } = useFolderCRUD();

  const fetchFolderInformation = useCallback(async () => {
    try {
      setPageLoading(true);
      const response = await apiCall("get", `/api/folder/${params.id}`);
      setFolderBreadCrumb(response?.data);
      setFolders(response?.data?.children);
      setDocuments(response?.data?.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchFolderInformation();
  }, [fetchFolderInformation]);

  useEffect(() => {
    fetchStarredFolders();
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="flex flex-col w-full mb-20">
          <div className="flex container">
            <div className="p-3 w-full mt-2 h-full flex items-center justify-between">
              <div className="flex items-center gap-3 w-1/2">
                <div className="w-full flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Link href="/my_items">
                      <Button className="bg-transparent border-[--divider-border-color] border hover:bg-transparent w-[10px] h-[30px] flex rounded-[10px]">
                        <FiChevronLeft size={10} />
                      </Button>
                    </Link>
                    {pageLoading ? (
                      <Loader2 className="animate-spin text-[--gray]" />
                    ) : (
                      <FolderBreadCrumb
                        folder={folderBreadCrumb}
                        currentPath={params.id}
                        className="text-white"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="mr-5 flex items-center gap-3 w-1/2 justify-end">
                <div className="w-[100px] flex items-center">
                  <Popover>
                    <PopoverTrigger className="w-full flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]">
                      Date created <FiChevronDown />
                    </PopoverTrigger>
                    <PopoverContent className="flex w-[200px] bg-[--dialog-bg] shadow-md border-none ">
                      <ul className="gap-y-2 flex flex-col w-full">
                        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                          <Link
                            href="/"
                            className="flex items-center justify-between w-full py-[4px] px-[8px]"
                          >
                            <span>Date created</span>
                            <span>
                              <FiCheck />
                            </span>
                          </Link>
                        </li>
                        <li className="flex w-full text-[--sidebar-link-color] hover:bg-[--folder-bg]  rounded-[5px]  text-sm link-transition">
                          <Link href="/" className="py-[4px] px-[8px]">
                            Date modified
                          </Link>
                        </li>
                        <li className="flex w-full text-[--sidebar-link-color] hover:bg-[--folder-bg]  rounded-[5px] text-sm link-transition">
                          <Link href="/" className="py-[4px] px-[8px]">
                            Name
                          </Link>
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex gap-3 w-fit">
                  <Button
                    className="w-fit rounded-[8px] bg-transparent border-[--folder-border-color] border text-[--gray] hover:bg-transparent hover:border-[--nav-selected] hover:text-[--sidebar-link-active-text] outline-none transition-all delay-75 duration-200"
                    onClick={() => openDialog("share")}
                  >
                    <TbShare3 />
                    <span>Share</span>
                  </Button>
                  <NewFolder />
                </div>
                <div className="flex w-fit gap-2">
                  <NewItem />
                  <Popover className="w-full">
                    <PopoverTrigger
                      className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="w-fit px-2 bg-transparent  hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                        <FiMoreHorizontal />
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px]">
                      <RouteMenuItem
                        openDialog={openDialog}
                        id={params?.id}
                        title="Folder Name"
                        openRenameDialog={openRenameDialog}
                        openMoveFolderDialog={openMoveFolderDialog}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          {pageLoading ? (
            <div className="grid w-full grid-cols-4 gap-5 relative mt-5">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonDocument />
              <SkeletonDocument />
              <SkeletonDocument />
              <SkeletonDocument />
            </div>
          ) : (
            <>
              {folders?.length < 1 && documents?.length < 1 ? (
                <div className="w-full flex px-5 py-3">
                  <div className="container mx-auto bg-[--dialog-bg] min-h-[400px] rounded-[8px]">
                    <div className="flex flex-col items-center justify-center h-full text-[--popover-text-color]">
                      <ImFilesEmpty size={80} className="mb-5" />
                      <h1 className="text-[18px] text-white">No items</h1>
                      <p>Your awesome visual repository is empty now.</p>
                      <p className="text-sm">
                        Let&apos;s&nbsp;
                        <span
                          className="text-[--primary-btn] cursor-pointer"
                          onClick={() => openDialog("recordVideo")}
                        >
                          record a video
                        </span>{" "}
                        or{" "}
                        <span className="text-[--primary-btn] cursor-pointer">
                          capture a screenshot
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="container">
                    <div className="flex w-full p-3 flex-col gap-y-2">
                      {folders?.length > 0 && (
                        <>
                          <p className="text-[14px] text-[--gray] leading-[14px]">
                            Folders
                          </p>
                          <div className="grid w-full grid-cols-4 gap-5 relative">
                            <Folder data={folders} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full p-3 flex-col gap-y-2">
                    {documents?.length > 0 && (
                      <>
                        <p className="text-[14px] text-[--gray] leading-[14px]">
                          Images &amp; Videos
                        </p>
                        <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                          <ThumbNail data={documents} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {checkedCount > 0 && <TrashCheckBoxControl />}
      </div>
      <Modals />
      <CustomAlertModal />
    </>
  );
};

export default FolderPage;
