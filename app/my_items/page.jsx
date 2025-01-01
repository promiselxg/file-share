"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import Folder from "../_components/folder/folder";
import ThumbNail from "../_components/thumbnail";

import Modals from "../_components/modal/modal";
import { imageVideo } from "../shared_with_me/data";
import NewFolder from "../_components/new-item/new-folder";
import NewItem from "../_components/new-item/newItem";

const folders = [
  {
    id: 1,
    name: "Folder 1",
    star: true,
  },
  { id: 2, name: "Folder 2" },
  { id: 3, name: "Folder 3" },
  { id: 4, name: "Folder 4" },
  { id: 5, name: "Folder 5" },
];

export default function page() {
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
            <div className="container">
              <div className="flex w-full p-3 flex-col gap-y-2">
                <p className="text-[14px] text-[--gray] leading-[14px]">
                  Folders
                </p>
                <div className="grid w-full grid-cols-4 gap-5 relative">
                  <Folder data={folders} />
                </div>
              </div>
            </div>
            <div className="flex w-full p-3 flex-col gap-y-2">
              <p className="text-[14px] text-[--gray] leading-[14px]">
                Images &amp; Videos
              </p>
              <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                <ThumbNail data={imageVideo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** MODALS */}
      <Modals />
      {/** MODALS */}
    </>
  );
}
