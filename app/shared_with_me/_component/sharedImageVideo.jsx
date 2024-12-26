"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDialog } from "@/context/Dialog.context";
import { truncateText } from "@/utils/trucateText";
import Image from "next/image";
import React, { useEffect } from "react";
import { FiVideo } from "react-icons/fi";

const SharedImageVideo = ({ data }) => {
  const { setSharedData, handleViewSelectedDocument } = useDialog();

  useEffect(() => {
    setSharedData(data);
  }, [data, setSharedData]);

  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <div
              className="w-full overflow-hidden h-[200px] rounded-[8px] border border-[--folder-border-color] relative imgThubnail  cursor-pointer"
              onClick={() => handleViewSelectedDocument(item)}
            >
              <Image
                src={item?.mediaInfo?.mediaUrl}
                width={500}
                height={200}
                alt={item.title}
                className="w-full object-cover h-[200px]"
              />
              {item?.mediaInfo?.mediaType === "video" && (
                <div className="absolute bottom-5 right-2 bg-[rgba(0,0,0,.8)] text-white text-sm py-[2px] px-[8px] rounded-[5px] font-[600]">
                  {item.mediaInfo.mediaDuration}
                </div>
              )}
            </div>
            <div className="py-2 text-[--gray] flex  w-full justify-between">
              <div className="flex flex-col">
                <h1 className="text-white text-[16px] leading-[1.3]">
                  {item.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <FiVideo size={12} />
                  <span className="text-[--gray] text-[12px]">
                    {item.createdAt}. {item.view} views
                  </span>
                </div>
              </div>
              <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer mt-1">
                <AvatarImage
                  src={item?.createdBy?.imageUrl}
                  alt={item?.createdBy?.username}
                />
                <AvatarFallback className="uppercase">
                  {item?.createdBy?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SharedImageVideo;
