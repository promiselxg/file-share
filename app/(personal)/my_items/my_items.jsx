/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import Modals from "../_components/modal/modal";
import TrashCheckBoxControl from "../_components/trash";
import ThumbNail from "../_components/thumbnail";
import Folder from "../_components/folder/folder";
import NewItem from "../_components/new-item/newItem";

import Link from "next/link";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFolderCRUD } from "@/context/folder.context";
import NewFolder from "../_components/new-item/new-folder";
import {
  SkeletonCard,
  SkeletonDocument,
} from "../_components/skeleton/skeleton";
import { useDocument } from "@/context/document.context";
import { ImFilesEmpty } from "react-icons/im";
import EmptyCard from "../_components/empty/empty";

const MyItems = () => {
  const {
    checkedCount,
    folder,
    loadTopLevelFolder,
    fetchStarredFolders,
    fetchTopLevelFolders,
    fetchFolderStructure,
  } = useFolderCRUD();
  const { loading, documents, fetchTopLevelDocuments } = useDocument();

  useEffect(() => {
    fetchStarredFolders();
    fetchTopLevelFolders();
    fetchFolderStructure();
    fetchTopLevelDocuments();
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="flex flex-col w-full mb-20">
          <div className="flex container">
            <div className="p-3 w-full mt-2 h-full flex items-center justify-between">
              <div className="flex items-center gap-3 w-1/2">
                <Popover className="w-full">
                  <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[18px]">
                    My items <FiChevronDown />
                  </PopoverTrigger>
                  <PopoverContent className="flex w-[200px] bg-[--dialog-bg] shadow-md border-none ml-20">
                    <ul className="gap-y-2 flex flex-col w-full">
                      <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                        <Link
                          href="/"
                          className="flex items-center justify-between w-full py-[4px] px-[8px]"
                        >
                          <span>My items</span>
                          <span>
                            <FiCheck />
                          </span>
                        </Link>
                      </li>
                      <li className="flex w-full text-[--sidebar-link-color] hover:bg-[--folder-bg]  rounded-[5px]  text-sm link-transition">
                        <Link href="/" className="py-[4px] px-[8px]">
                          All videos
                        </Link>
                      </li>
                      <li className="flex w-full text-[--sidebar-link-color] hover:bg-[--folder-bg]  rounded-[5px] text-sm link-transition">
                        <Link href="/" className="py-[4px] px-[8px]">
                          All images
                        </Link>
                      </li>
                      <li className="flex w-full text-[--sidebar-link-color] hover:bg-[--folder-bg]  rounded-[5px] text-sm link-transition">
                        <Link href="/" className="py-[4px] px-[8px]">
                          Shared by me
                        </Link>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mr-5 flex items-center gap-3">
                <Popover className="w-full">
                  <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]">
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
                <div className="flex gap-3">
                  <NewFolder />
                  <NewItem />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {loadTopLevelFolder ? (
              <div className="grid w-full grid-cols-4 gap-5 relative">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              folder?.length > 0 && (
                <div className="container">
                  <div className="flex w-full p-3 flex-col gap-y-2">
                    <p className="text-[14px] text-[--gray] leading-[14px]">
                      Folders
                    </p>
                    <div className="grid w-full grid-cols-4 gap-5 relative">
                      <Folder data={folder} />
                    </div>
                  </div>
                </div>
              )
            )}

            {folder.length < 1 &&
            documents.length < 1 &&
            !loadTopLevelFolder &&
            !loading ? (
              <>
                <EmptyCard />
              </>
            ) : (
              <>
                <div className="flex flex-col mt-8">
                  {loading ? (
                    <div className="grid w-full grid-cols-4 gap-5 relative">
                      <SkeletonDocument />
                      <SkeletonDocument />
                      <SkeletonDocument />
                      <SkeletonDocument />
                    </div>
                  ) : (
                    <div className="flex w-full p-3 flex-col gap-y-2">
                      {documents.length > 0 && (
                        <p className="text-[14px] text-[--gray] leading-[14px]">
                          Images &amp; Videos
                        </p>
                      )}

                      <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                        <ThumbNail data={documents} />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {checkedCount > 0 && <TrashCheckBoxControl />}
      </div>
      {/** MODALS */}
      <Modals />
      {/** MODALS */}
    </>
  );
};

export default MyItems;
