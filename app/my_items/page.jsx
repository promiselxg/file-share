import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import {
  FiCheck,
  FiChevronDown,
  FiMoreHorizontal,
  FiVideo,
} from "react-icons/fi";
import Icon from "../_components/icon/icon";
import Folder from "../_components/folder";
import Image from "next/image";
import { LinkWithIcon } from "../_components/nav/sideBarNav";
import { PiShareFatLight } from "react-icons/pi";
import ThumbNail from "../_components/thumbnail";

export default function Home() {
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
                  <Button className="w-full rounded-[8px] bg-transparent border-[--gray] border text-[--gray] hover:bg-transparent hover:border-[--nav-selected] hover:text-[--sidebar-link-active-text] outline-none transition-all delay-75 duration-200">
                    New folder
                  </Button>
                  <Button className="w-full rounded-[8px] bg-[--primary-btn] border-none border text-[white] hover:bg-[--sidebar-link-active-text]  outline-none transition-all delay-75 duration-200 hover:text-[rgba(255,255,255,.8)]">
                    New item
                  </Button>
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
                <ThumbNail title="Create next App" date="Jan 22, 2024" />
                <ThumbNail
                  title="Glovo: you order, we deliver it!"
                  date="Jan 21, 2024"
                />
                <ThumbNail
                  title="Glovo: you order, we deliver it!"
                  date="Jan 21, 2024"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
