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
              <div className="grid w-full grid-cols-4 gap-5 relative">
                <ThumbNail
                  title="Glovo: you order, we deliver it!"
                  date="Jan 21, 2024"
                  time="00:24"
                />
                <ThumbNail
                  title="Vite + React"
                  date="Jan 22, 2024"
                  time="01:05"
                  img="https://awevideo.s3.amazonaws.com/video-20660451-062988d3917c276b4ffed4f35c16b0dd_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T053037Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=2ba9b5886bb0e0f759c7408218740066fe931d05676a45f1ec718e22baecaf6d"
                />
                <ThumbNail
                  title="Transactions | frontend"
                  date="Jan 21, 2024"
                  time="00:08"
                  img="https://awevideo.s3.amazonaws.com/video-19844464-fa3c35cd3dc7e46dace12bf447110ce5_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T053130Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=0bf56a79148acb972d6aefd3af9365bd6fa24e5bdb921a100392eb492c24a8ed"
                />
                <ThumbNail
                  title="localhost:3000"
                  date="Jan 21, 2024"
                  img="https://awevideo.s3.amazonaws.com/video-10611774-57efe14ad3ae9407765838011ab4607a_960x540.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20241218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T053230Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=42f94d75ac6018dd7863f4a9b6af500b47de058b7d62e59a3c37bdde4f0887e1"
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
