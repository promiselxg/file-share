"use client";
import { LinkWithIcon } from "@/app/_components/nav/sideBarNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils/copyText";
import React, { useState } from "react";
import { FiCheck, FiMoreHorizontal } from "react-icons/fi";
import { IoMdCopy } from "react-icons/io";

const ShareFileLink = ({ id }) => {
  const [copyText, setCopyText] = useState(false);

  setTimeout(() => {
    setCopyText(false);
  }, 3000);
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm">Share Link</p>
          <Popover className="w-full">
            <PopoverTrigger className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px]">
              <span className="px-3 py-1  text-white hover:bg-[--folder-bg] link-transition flex items-center justify-center rounded-[5px]">
                <FiMoreHorizontal className="text-white " />
              </span>
            </PopoverTrigger>
            <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] absolute -right-10 top-0">
              <ul className="flex flex-col w-full">
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    name="Revoke shareable link"
                    color="text-[--popover-text-color]"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    name="Get short URL"
                    color="text-[--popover-text-color]"
                  />
                </li>
                <li className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg]  rounded-[5px] link-transition">
                  <LinkWithIcon
                    name="Source URL setting"
                    color="text-[--popover-text-color]"
                  />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full flex flex-col">
          <Input
            defaultValue={`http://localhost:3000/view-document/${id}`}
            name="share-link"
            className="bg-[--input-bg] border border-[--input-bg] shadow-md text-[--sidebar-link-color] text-[14px] rounded-[8px] disabled:cursor-not-allowed mt-1"
            disabled
          />
          <Button
            className={cn(
              `${
                copyText
                  ? "bg-[green] border-[green] hover:bg-[green]"
                  : "bg-[--primary-btn] border-[--primary-btn] hover:bg-[--primary-btn-hover] hover:border-[--primary-btn-hover]"
              } w-full border  text-white  link-transition  rounded-[8px] my-1`
            )}
            onClick={() => {
              copyToClipboard(`http://localhost:3000/view-document/${id}`);
              setCopyText(true);
            }}
          >
            {copyText ? (
              <>
                <FiCheck />
                <span>Copied</span>
              </>
            ) : (
              <>
                <IoMdCopy />
                <span>Copy Link</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShareFileLink;
