"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import Folder from "../_components/folder";
import ThumbNail from "../_components/thumbnail";

import { LinkWithIcon } from "../_components/nav/sideBarNav";
import { IoImageOutline } from "react-icons/io5";
import { MdVideoCameraBack } from "react-icons/md";
import { useDialog } from "@/context/Dialog.context";
import Modals from "../_components/modal/modal";

export default function Home() {
  const { openDialog } = useDialog();

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
                  <Button
                    className="w-full rounded-[8px] bg-transparent border-[--gray] border text-[--gray] hover:bg-transparent hover:border-[--nav-selected] hover:text-[--sidebar-link-active-text] outline-none transition-all delay-75 duration-200"
                    onClick={() => openDialog("newFolder")}
                  >
                    New folder
                  </Button>

                  <Popover>
                    <PopoverTrigger className="w-full rounded-[8px] bg-[--primary-btn] border-none border text-[white] hover:bg-[--sidebar-link-active-text]  outline-none transition-all delay-75 duration-200 hover:text-[rgba(255,255,255,.8)] flex items-center px-5 text-wrap whitespace-nowrap text-sm">
                      New item
                    </PopoverTrigger>
                    <PopoverContent className="flex w-[200px] bg-[--dialog-bg] shadow-md border-none mr-[30px]">
                      <ul className="flex flex-col w-full">
                        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                          <LinkWithIcon
                            Icon={<MdVideoCameraBack size={20} />}
                            name="Record video"
                            color="text-[--popover-text-color]"
                            onClick={() => openDialog("recordVideo")}
                          />
                        </li>
                        <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                          <LinkWithIcon
                            Icon={<IoImageOutline size={20} />}
                            name="Upload image"
                            color="text-[--popover-text-color]"
                            onClick={() => openDialog("uploadImage")}
                          />
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
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
                  <Folder name="folder 9" star />
                  <Folder name="My private folder" star />
                  <Folder name="folder 9" star />
                  <Folder name="folder 9" star />
                  <Folder name="folder 9" star />
                  <Folder name="folder 9" star />
                  <Folder name="folder 9" star />
                  <Folder name="folder 9" star />
                  <Folder name="Untitled folder" />
                </div>
              </div>
            </div>
            <div className="flex w-full p-3 flex-col gap-y-2">
              <p className="text-[14px] text-[--gray] leading-[14px]">
                Images &amp; Videos
              </p>
              <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                <ThumbNail
                  title="Glovo: you order, we deliver it!"
                  date="Jan 21, 2024"
                  time="00:24"
                  img="https://res.cloudinary.com/promiselxg/image/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.jpg"
                />
                <ThumbNail
                  title="Vite + React"
                  date="Jan 22, 2024"
                  time="01:05"
                  img="https://res.cloudinary.com/promiselxg/image/upload/v1733975096/fameRoyal/ulsqam8pshkwgjn4nvj9.jpg"
                />
                <ThumbNail
                  title="Transactions | frontend"
                  date="Jan 21, 2024"
                  time="00:08"
                  img="https://res.cloudinary.com/promiselxg/image/upload/v1733952578/fameRoyal/v9h1odrixdkhioryjzad.png"
                />
                <ThumbNail
                  title="localhost:3000"
                  date="Jan 21, 2024"
                  img="https://res.cloudinary.com/promiselxg/image/upload/v1733778417/hrcImages/asria5ybzr4ip50nlzmp.png"
                  time="00:23"
                />
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
