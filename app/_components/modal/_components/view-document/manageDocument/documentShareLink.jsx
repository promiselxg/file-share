"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FaJira } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { SiAsana } from "react-icons/si";
import { FaTrello } from "react-icons/fa";
import { FaSlack } from "react-icons/fa";
import ShareFileLink from "./_component/share-link";
import { useDialog } from "@/context/Dialog.context";
import { Loader2 } from "lucide-react";

const DocumentShareLink = () => {
  const [shareFile, setShareFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState("");

  const { selectedDocumentId } = useDialog();

  const handleShareFile = (id) => {
    setLoading(true);
    setTimeout(() => {
      setShareFile(true);
      setFileId(id);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {shareFile ? (
        <>
          <ShareFileLink id={fileId} />
        </>
      ) : (
        <>
          <p className="text-sm">Share your Image</p>
          <Button
            className="w-full bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover] rounded-[8px] my-1"
            onClick={() => handleShareFile(selectedDocumentId?.id)}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <span>Generating link...</span>
              </div>
            ) : (
              <>
                <span>Generate Shareable Link</span>
              </>
            )}
          </Button>
        </>
      )}
      <div className="w-full flex justify-center my-2 items-center gap-2">
        <p className="text-sm">Support:</p>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[white] text-[--icon-bg] rounded-[5px] w-[22px] h-[22px] p-0 flex items-center justify-center hover:bg-white hover:text-[--icon-bg] link-transition">
                  <FaSlack />
                </div>
              </TooltipTrigger>
              <TooltipContent>Slack</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[white] text-[--bg-red] rounded-[5px] w-[22px] h-[22px] p-0 flex items-center justify-center hover:bg-white hover:text-[--bg-red] link-transition">
                  <SiAsana />
                </div>
              </TooltipTrigger>
              <TooltipContent>Asana</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[#0052CC] text-[#FFF] rounded-[5px] w-[22px] h-[22px] p-0 flex items-center justify-center hover:bg-[#0052CC] hover:text-[#fff] link-transition">
                  <FaTrello />
                </div>
              </TooltipTrigger>
              <TooltipContent>Trello</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[#000] text-[#FFF] rounded-[5px] w-[22px] h-[22px] p-0 flex items-center justify-center hover:bg-[#000] hover:text-[#FFF] link-transition">
                  <BsGithub />
                </div>
              </TooltipTrigger>
              <TooltipContent>Github</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-[white] text-[#0052CC] rounded-[5px] w-[22px] h-[22px] p-0 flex items-center justify-center hover:bg-white hover:text-[#0052CC] link-transition">
                  <FaJira />
                </div>
              </TooltipTrigger>
              <TooltipContent>Jira</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};

export default DocumentShareLink;
