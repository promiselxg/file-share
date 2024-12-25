"use client";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDialog } from "@/context/Dialog.context";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/trucateText";
import Image from "next/image";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import ManageDocument from "./manage-document";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentContainer from "./comment/comment-container";

const VideoPLayer = dynamic(() => import("../../../player/video-player"), {
  ssr: false,
});

const ViewSelectedDocument = () => {
  const {
    selectedDocumentId,
    openSelectedDocumentWrapper,
    handleViewSelectedDocument,
    nextItem,
    prevItem,
    currentIndex,
    sharedData,
  } = useDialog();

  const isOwner =
    selectedDocumentId?.createdBy?.username.toLowerCase() === "promiselxg";

  const [activeTab, setActiveTab] = useState(isOwner ? "manage" : "comment");
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
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
                handleViewSelectedDocument("");
              }}
              className=" cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full flex p-3 h-full bg-[--body-bg] overflow-scroll ">
          <div className="container mt-[10px] mx-auto mb-0 max-w-[1400px]">
            <div className="w-full flex gap-3 ">
              <div className="w-[80%] ">
                <div className="w-full flex rounded-[8px] h-[550px]  bg-[--header-bg] shadow-md">
                  {selectedDocumentId?.mediaInfo?.mediaType === "image" ? (
                    <div className="w-full flex justify-center h-[550px] items-center p-[60px]">
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
                            src={
                              selectedDocumentId?.mediaInfo?.mediaUrl ||
                              `https://res.cloudinary.com/promiselxg/image/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.jpg`
                            }
                            alt={selectedDocumentId?.title || "video thumbnail"}
                            width={700}
                            height={500}
                            className="object-cover h-full w-full"
                          />
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="w-full my-5 flex flex-col text-[--popover-text-color] h-[200px]">
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
              <div className="w-[20%] bg-[--header-bg] rounded-[8px] shadow-md h-fit relative">
                <Tabs
                  value={isOwner ? activeTab : "comment"}
                  onValueChange={handleTabChange}
                  className="flex w-full gap-5 transition-all delay-300 duration-300 flex-col px-5 py-2"
                >
                  <TabsList
                    className={cn(
                      `${
                        isOwner ? "justify-center" : "justify-start"
                      } w-full h-fit bg-transparent flex  gap-5`
                    )}
                  >
                    {isOwner && (
                      <>
                        <TabsTrigger
                          value="manage"
                          className="data-[state=active]:text-[--primary-btn]  text-[--popover-text-color] border-b-[2px] rounded-none data-[state=active]:border-[--primary-btn] border-transparent pb-2"
                        >
                          <div className="flex flex-col justify-center items-center leading-[1] cursor-pointer">
                            <div className="flex flex-col justify-center items-center">
                              <span className="text-[14px]">Manage</span>
                            </div>
                          </div>
                        </TabsTrigger>

                        <TabsTrigger
                          value="comment"
                          className="data-[state=active]:text-[--primary-btn]  text-[--popover-text-color] border-b-[2px] rounded-none data-[state=active]:border-[--primary-btn] border-transparent pb-2"
                        >
                          <div className="flex flex-col justify-center items-center leading-[1] cursor-pointer">
                            <div className="flex flex-col justify-center items-center">
                              <span className="text-[14px]">Comments</span>
                            </div>
                          </div>
                        </TabsTrigger>
                      </>
                    )}
                  </TabsList>
                  <TabsContent
                    value="manage"
                    className="text-[--popover-text-color]"
                  >
                    <ManageDocument />
                  </TabsContent>
                  <TabsContent
                    value="comment"
                    className="text-[--popover-text-color]"
                  >
                    <CommentContainer
                      documentid={selectedDocumentId?.id}
                      userid={selectedDocumentId?.createdBy?.userid}
                      username={selectedDocumentId?.createdBy?.username}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSelectedDocument;
