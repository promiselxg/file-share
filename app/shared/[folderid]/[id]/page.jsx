"use client";
import { Icon } from "@/app/_components/icon/icon";
import CustomAlertModal from "@/app/_components/modal/alert-modal";
import SharedImageVideo from "@/app/shared_with_me/_component/sharedImageVideo";
import { imageVideo } from "@/app/shared_with_me/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

const SharedFolderPage = ({ params }) => {
  const [isData, setIsData] = useState(true);
  return (
    <>
      <div className="w-full flex relative flex-col">
        <div className="flex flex-col w-full mb-20 relative">
          <div className="flex flex-col w-[1400px] mx-auto container">
            <div className="flex justify-between w-full items-center container pt-2 ">
              <Link
                href="/shared_with_me"
                className="flex items-center gap-1 text-[--gray]"
              >
                <FiChevronLeft className="cursor-pointer" />
                shared with me
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="flex w-full py-3 items-center  justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Icon className="text-[45px]" />
                  <h1 className="text-[24px]">Shared folder</h1>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-[--gray] text-[12px]">Shared by</p>
                  <div className="flex items-center gap-2 text-white">
                    <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer rounded-full">
                      <AvatarImage
                        src="https://github.com/promiselxg.png"
                        alt="promiselxg"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="text-[16px]">Promise</h1>
                  </div>
                </div>
              </div>
            </div>
            {isData && (
              <div className="flex w-full p-3 flex-col gap-y-2">
                <p className="text-[14px] text-[--gray] leading-[14px]">
                  Images &amp; Videos
                </p>
                <div className="grid w-full grid-cols-4 gap-5 relative mt-3">
                  <SharedImageVideo data={imageVideo} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomAlertModal />
    </>
  );
};

export default SharedFolderPage;
