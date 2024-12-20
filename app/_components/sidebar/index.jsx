"use client";
import { FiLogOut, FiStar, FiTrash, FiUser, FiUsers } from "react-icons/fi";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SharedFolder from "../sharedFolder/sharedFolder";

const SideBar = () => {
  const [sharedFolder, setSharedFolder] = useState(true);
  return (
    <>
      <div className="text-white relative h-[calc(100vh-70px)] md:flex md:w-[280px] w-full flex-col">
        <div className="p-2 w-full mt-2 border-r-[1px] border-[hsla(0,0%,100%,.19)] h-full">
          <span className="text-[12px] text-[--gray] leading-[14px]">
            Personal
          </span>
          <ul className="mb-[2px]  overflow-hidden pt-2">
            <li className="whitespace-nowrap mb-1">
              <div className="flex text-[--sidebar-link-color] w-full">
                <Link
                  href="/my_items"
                  className="flex text-[--sidebar-link-color] items-center gap-2 pl-[12px] active w-full rounded-[8px] p-3 sideLink"
                >
                  <span>
                    <FiUser />
                  </span>
                  <span className="text-sm">My items</span>
                </Link>
              </div>
            </li>
            <li className="whitespace-nowrap">
              <div className="flex text-[--sidebar-link-color] w-full">
                <Link
                  href="/shared_with_me"
                  className="flex text-[--sidebar-link-color] items-center gap-2 pl-[12px] w-full rounded-[8px] p-3 hover:bg-[--folder-bg] link-transition"
                >
                  <span>
                    <FiUsers />
                  </span>
                  <span className="text-sm">Shared with me</span>
                </Link>
              </div>
            </li>
          </ul>
          <div className="w-full -mt-1 shared-folder-wrapper">
            <div className="flex text-[--sidebar-link-color] w-full">
              <div className="flex text-[--sidebar-link-color] items-center gap-2 pl-[12px]  w-full rounded-[8px] p-3 link-transition justify-between shared-folder">
                <div className="flex items-center gap-2 ">
                  <span>
                    <FiStar />
                  </span>
                  <span className="text-sm">Starred folders</span>
                </div>
                <div className="text-[12px] text-[--gray]  cursor-default shared-folder-edit">
                  <span className=" cursor-pointer">Edit</span>
                </div>
              </div>
            </div>
            {sharedFolder && <SharedFolder />}
            {!sharedFolder && (
              <div className="shared-folder-empty border border-dashed p-2 my-2 rounded-[8px] border-[--folder-border-color]">
                <p className="text-[12px] text-[--gray]">
                  Drag and drop your favorite folders here
                </p>
              </div>
            )}
          </div>
          <div className="workspace-wrapper">
            <span className="text-[12px] text-[--gray] leading-[14px]">
              Workspace
            </span>
            <div className="p-5 text-center text-[12px] text-[--gray]">
              No workspace
            </div>
            <div className="sidebar-divider"></div>
            <Button className="w-full rounded-[8px] bg-transparent border-[--gray] border text-[--gray] hover:bg-transparent hover:border-[--nav-selected] hover:text-[--sidebar-link-active-text] outline-none transition-all delay-75 duration-200">
              Create a workspace
            </Button>
          </div>
        </div>
        <div className="p-2 absolute bottom-0 w-full">
          <div className="flex items-center justify-between w-full gap-2">
            <Link href="/trash" className="w-[70%] active rounded-[8px] ">
              <Button className="w-full text-left flex justify-start bg-transparent  hover:bg-[--folder-bg] rounded-[8px] text-[--sidebar-link-active-text]">
                <FiTrash />
                <span className="text-[14px]">Trash</span>
              </Button>
            </Link>
            <Button className="text-left flex justify-start bg-transparent  hover:bg-[--folder-bg]">
              <FiLogOut />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
