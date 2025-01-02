"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageDocument from "@/app/_components/modal/_components/view-document/manageDocument/manageDocument";
import CommentContainer from "@/app/_components/modal/_components/view-document/comment/comment-container";
import { Textarea } from "@/components/ui/textarea";
import CustomAlertModal from "@/app/_components/modal/alert-modal";
import Modals from "@/app/_components/modal/modal";
import { MdCloseFullscreen } from "react-icons/md";
import { useDialog } from "@/context/Dialog.context";
import { useGetURLInfo } from "@/hooks/use-get-url-info";

export const selectedDocumentId = [
  {
    id: "eb316d4fc5a53dc86db286b78aa75904",
    title: "Flag_of_Nigeria.svg.png",
    view: 0,
    mediaInfo: {
      mediaType: "image",
      mediaUrl:
        "https://res.cloudinary.com/promiselxg/image/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.jpg",
    },
    createdBy: {
      userid: "random1334",
      imageUrl: "https://github.com/promiselxg.png",
      username: "promiselxg",
    },
    folder: {
      id: "F02VREe0O2",
      name: "folder 8",
    },
    location: {
      type: "workspace",
    },
    createdAt: "Dec 21, 2024",
  },
];

const ViewSharedImage = () => {
  const { pathname, getQueryParam, getID } = useGetURLInfo();
  const { handleViewDocumentInFullScreen } = useDialog();
  const textareaRef = useRef(null);

  const imageId = getID();
  const key = getQueryParam("key");

  const isOwner =
    selectedDocumentId[0]?.createdBy?.username.toLowerCase() === "promiselxg";

  const [activeTab, setActiveTab] = useState(isOwner ? "manage" : "comment");
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleTitleEdit = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.readOnly = false;
      textareaRef.current.select();
    }
  };
  return (
    <>
      <div
        className={cn(
          `w-full transition-all duration-500 ease-in-out transform h-full `
        )}
      >
        <div className="w-full flex p-3 h-full bg-[--body-bg] overflow-scroll ">
          <div className="container mt-[10px] mx-auto mb-0 max-w-[1300px]">
            <div className="w-full flex gap-3 ">
              <div className="w-[75%] relative">
                <div className="w-full flex rounded-[8px] h-[550px]  bg-[--header-bg] shadow-md">
                  <div className="w-full flex justify-center h-[550px] items-center p-[60px]">
                    <Image
                      src={
                        selectedDocumentId[0]?.mediaInfo?.mediaUrl ??
                        "https://res.cloudinary.com/promiselxg/image/upload/v1662427476/gallery/ckkepxrjszaaiketem6r.jpg"
                      }
                      width={700}
                      height={500}
                      alt={selectedDocumentId[0]?.title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <MdCloseFullscreen
                    size={35}
                    className="text-[--sidebar-link-color] outline-none border-none bg-[rgba(0,0,0,.2)] link-transition rounded-[5px] p-2 absolute top-3 right-3 cursor-pointer"
                    onClick={() =>
                      handleViewDocumentInFullScreen(
                        selectedDocumentId[0].mediaInfo
                      )
                    }
                  />
                </div>
                <div className="w-full my-5 flex flex-col text-[--popover-text-color] h-[200px]">
                  <Textarea
                    className={cn(
                      `${
                        isOwner &&
                        "focus-visible:border-[--primary-btn] hover:border-[--gray] "
                      } w-[90%] items-center h-[60px] p-2 text-white outline-none resize-none border-2 border-transparent focus-visible:outline-none text-[26px] link-transition rounded-[8px]`
                    )}
                    defaultValue={selectedDocumentId[0]?.title}
                    ref={textareaRef}
                    readOnly={true}
                    maxLength={100}
                    onClick={() => isOwner && handleTitleEdit()}
                  ></Textarea>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-[30px] h-[30px] overflow-hidden cursor-pointer mt-1">
                        <AvatarImage
                          src={selectedDocumentId[0]?.createdBy?.imageUrl}
                          alt={selectedDocumentId[0]?.createdBy?.username}
                        />
                        <AvatarFallback className="uppercase">
                          {selectedDocumentId[0]?.createdBy?.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="text-[18px] mt-1">
                        {selectedDocumentId[0]?.createdBy?.username}
                      </h1>
                    </div>
                    <div className="text-sm flex gap-2">
                      <span>{selectedDocumentId[0]?.view} views</span>
                      <span>.</span>
                      <span>{selectedDocumentId[0]?.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[25%] bg-[--header-bg] rounded-[8px] shadow-md h-fit relative">
                <Tabs
                  value={isOwner ? activeTab : "comment"}
                  onValueChange={handleTabChange}
                  className="flex w-full gap-5 transition-all delay-300 duration-300 flex-col px-3 py-2"
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
                    <ManageDocument data={selectedDocumentId[0]} />
                  </TabsContent>
                  <TabsContent
                    value="comment"
                    className="text-[--popover-text-color]"
                  >
                    <CommentContainer
                      documentid={selectedDocumentId[0]?.id}
                      userid={selectedDocumentId[0]?.createdBy?.userid}
                      username={selectedDocumentId[0]?.createdBy?.username}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modals />
      <CustomAlertModal />
    </>
  );
};

export default ViewSharedImage;
