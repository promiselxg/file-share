"use client";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useDialog } from "@/context/Dialog.context";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/trucateText";
import Image from "next/image";
import React, { useState } from "react";
import { FiAtSign, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { CiFaceSmile } from "react-icons/ci";

const VideoPLayer = dynamic(() => import("../../../player/video-player"), {
  ssr: false,
});

const ViewSelectedDocument = () => {
  const [toggleComment, setToggleComment] = useState(false);

  const handleToggleComment = () => {
    setToggleComment(!toggleComment);
  };

  const {
    selectedDocumentId,
    openSelectedDocumentWrapper,
    handleViewSelectedDocument,
    nextItem,
    prevItem,
    currentIndex,
    sharedData,
  } = useDialog();

  return (
    <>
      <div
        className={cn(
          `absolute bottom-0 w-full transition-all duration-500 ease-in-out transform h-full ${
            openSelectedDocumentWrapper
              ? "translate-y-0 scale-1 z-[999] opacity-1"
              : "translate-y-full  scale-0 opacity-0 "
          }`
        )}
      >
        <div className="w-full flex h-[50px] sticky top-0 left-0 z-[999] bg-[rgba(0,0,0,0.4)] text-white items-center">
          <div className="absolute top-0 right-0 flex items-center h-[50px] gap-5 px-8">
            <div className="flex  items-center gap-4">
              <div className="flex items-center gap-3">
                <FiChevronLeft
                  size={25}
                  className={cn(
                    `${
                      currentIndex === 0
                        ? "cursor-default text-[--gray]"
                        : "cursor-pointer"
                    } `
                  )}
                  onClick={prevItem}
                />
                <FiChevronRight
                  size={25}
                  className={cn(
                    `${
                      currentIndex === sharedData.length - 1
                        ? "cursor-default text-[--gray]"
                        : "cursor-pointer"
                    } `
                  )}
                  onClick={nextItem}
                />
              </div>
            </div>
            <FiX
              size={25}
              onClick={() => {
                handleViewSelectedDocument(""), setToggleComment(false);
              }}
              className=" cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex p-3 h-full bg-[--body-bg]">
          <div className="container mt-[10px] mx-auto mb-0 max-w-[1200px]">
            <div className="w-full flex gap-3 ">
              <div className="w-[75%] ">
                <div className="w-full flex rounded-[8px] h-[500px] overflow-hidden bg-[--header-bg] shadow-md">
                  {selectedDocumentId?.mediaInfo?.mediaType === "image" ? (
                    <div className="w-full flex justify-center h-[500px] items-center">
                      <Image
                        src={
                          selectedDocumentId?.mediaInfo?.mediaUrl ??
                          "https://res.cloudinary.com/promiselxg/image/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.jpg"
                        }
                        width={700}
                        height={500}
                        alt={selectedDocumentId?.title || "selected title"}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      <VideoPLayer
                        url={
                          selectedDocumentId?.mediaInfo?.videoUrl ??
                          "https://res.cloudinary.com/promiselxg/video/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.mp4"
                        }
                        width="100%"
                        height="100%"
                        light={
                          <Image
                            src={selectedDocumentId?.mediaInfo?.mediaUrl}
                            alt={selectedDocumentId?.title}
                            width={700}
                            height={500}
                            className="object-cover h-full w-full"
                          />
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="w-full my-5 flex flex-col text-[--popover-text-color]">
                  <h1 className="text-[16px] text-[whitesmoke] font-[600]">
                    {selectedDocumentId?.title}
                  </h1>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer mt-1">
                        <AvatarImage
                          src={selectedDocumentId?.createdBy?.imageUrl}
                          alt={selectedDocumentId?.createdBy?.username}
                        />
                        <AvatarFallback className="uppercase">
                          {truncateText(
                            selectedDocumentId?.createdBy?.username,
                            2
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="text-[18px] mt-1">
                        {selectedDocumentId?.createdBy?.username}
                      </h1>
                    </div>
                    <div className="text-sm flex gap-2">
                      <span>{selectedDocumentId?.view} views</span>
                      <span>.</span>
                      <span>{selectedDocumentId?.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
              <ScrollArea className="w-[25%] bg-[--header-bg] rounded-[8px] shadow-md max-h-[550px] relative">
                <div className="w-full flex p-4 flex-col ">
                  <h1 className="text-[16px] text-[--popover-text-color]">
                    0 comment
                  </h1>
                  <div
                    className={cn(
                      `${
                        toggleComment ? "h-[300px]" : "h-[400px]"
                      } w-full flex items-center justify-center  flex-col`
                    )}
                  >
                    <Image
                      src="https://resource.awesomescreenshot.com/static/images/785674380a8e0b290080.png"
                      width={100}
                      height={100}
                      alt="comment"
                    />
                    <p className="text-[16px] text-[--popover-text-color] font-[600]">
                      No comments yet.
                    </p>
                  </div>
                  {!toggleComment && (
                    <div className="w-full absolute bottom-5">
                      <Button
                        className="w-[90%] bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover]"
                        onClick={handleToggleComment}
                      >
                        Leave a comment
                      </Button>
                    </div>
                  )}
                  {toggleComment && (
                    <div className="w-full absolute bottom-5">
                      <div className="w-[90%] rounded-[8px] h-[150px] border-2 border-[--primary-btn]">
                        <Textarea
                          className="w-full h-[105px] p-2 text-[--popover-text-color] outline-none resize-none border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none"
                          placeholder="Use @ to mention team members"
                        ></Textarea>
                        <div className="w-full">
                          <div className="flex items-center justify-between mx-1">
                            <div className="flex items-center">
                              <Button
                                size="icon"
                                className="bg-transparent hover:bg-[--sidebar-link-active-bg] rounded-[10px]"
                              >
                                <CiFaceSmile />
                              </Button>
                              <Button
                                size="icon"
                                className="bg-transparent hover:bg-[--sidebar-link-active-bg] rounded-[10px]"
                              >
                                <FiAtSign />
                              </Button>
                            </div>
                            <div>
                              <Button
                                className="bg-transparent text-[--popover-text-color] hover:text-[--primary-btn-hover] link-transition hover:bg-transparent"
                                size="sm"
                                onClick={handleToggleComment}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover]"
                                size="sm"
                              >
                                Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSelectedDocument;
