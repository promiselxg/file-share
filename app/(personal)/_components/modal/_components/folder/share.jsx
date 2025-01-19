"use client";
import { Button } from "@/components/ui/button";
import { useFolderCRUD } from "@/context/folder.context";
import { copyToClipboard } from "@/utils/copyText";
import host from "@/utils/host";
import { showToast } from "@/utils/showToast";
import { truncateText } from "@/utils/trucateText";

import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { IoIosLink } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";

const ShareLink = ({ id, docType, sharedLink }) => {
  const {
    handleRevokeShareLink,
    handleGenerateShareLink,
    loading,
    link,
    setLink,
    folder,
  } = useFolderCRUD();

  useEffect(() => {
    if (sharedLink) {
      setLink(`${host.host_url}/${id}/${sharedLink}`);
    }
  }, [id, sharedLink, setLink]);

  const handleCopyToClipBoard = (link) => {
    try {
      copyToClipboard(link);
      showToast({
        title: "link copied to clipboard!",
        className: "bg-[green] border-none outline-none text-white",
      });
    } catch (error) {
      console.log("error copying text", error);
    }
  };

  console.log("folder before revoke", folder);
  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex mt-5 flex-col overflow-hidden">
          <div className="flex items-center justify-between  mb-2">
            <p className="text-[12px] text-[--popover-text-color]">Get link</p>
            {sharedLink && link !== "" && (
              <p
                className="text-[12px] text-[--primary-btn] font-[600] cursor-pointer"
                onClick={() => handleRevokeShareLink(id, docType)}
              >
                Revoke link
              </p>
            )}
          </div>
          {sharedLink && link !== "" ? (
            <div className="w-full bg-[--primary-btn] hover:bg-[--primary-btn-hover] link-transition mt-2 flex items-center h-[50px] rounded-[10px] px-2 gap-2 overflow-hidden">
              <div className="w-full flex items-center text-white justify-between">
                <div className="flex w-full items-center gap-2">
                  <div className="w-[12px]">
                    <IoIosLink />
                  </div>
                  <div className="w-fit overflow-clip text-[12px]">
                    {truncateText(link, 50)}
                  </div>
                </div>
                <div className="w-[80px]">
                  <Button
                    className="w-full flex items-center gap-2 bg-white hover:bg-white text-[--primary-btn] rounded-[8px] px-[25px] text-[12px] h-[35px]"
                    onClick={() => handleCopyToClipBoard(link)}
                  >
                    <IoCopyOutline /> Copy
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              varient="ghost"
              className="w-full bg-[--primary-btn] hover:bg-[--primary-btn-hover] link-transition mt-2 flex items-center h-[40px]"
              onClick={() => handleGenerateShareLink(id, docType)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <IoIosLink /> Generate &amp; copy link
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ShareLink;
