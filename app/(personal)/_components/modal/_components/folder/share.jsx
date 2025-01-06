"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";

const ShareLink = () => {
  const [generateLink, setGenerateLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(
    "https://www.awesomescreenshot.com/s/folder/F02Xjdjzy9/4aa87999946633fb403e54521216b7bb"
  );

  const revokeShareLink = () => {
    setGenerateLink(false);
  };
  const handleShareFile = (id) => {
    setLoading(true);
    setTimeout(() => {
      setGenerateLink(true);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex mt-5 flex-col">
          <div className="flex items-center justify-between  mb-2">
            <p className="text-[12px] text-[--popover-text-color]">Get link</p>
            {generateLink && (
              <p
                className="text-[12px] text-[--primary-btn] font-[600] cursor-pointer"
                onClick={() => revokeShareLink()}
              >
                Revoke link
              </p>
            )}
          </div>
          {generateLink ? (
            <>
              <div className="w-[440px] bg-[--primary-btn] hover:bg-[--primary-btn-hover] link-transition mt-2 flex items-center h-[50px] rounded-[10px] px-2 gap-2 overflow-hidden">
                <div className="w-full flex items-center text-white gap-2">
                  <div className="w-[12px]">
                    <IoIosLink />
                  </div>
                  <div className="w-[310px] overflow-clip">{link}</div>
                  <div className="w-[80px]">
                    <Button className="w-full flex items-center gap-2 bg-white hover:bg-white text-[--primary-btn] rounded-[8px] px-[45px]">
                      <IoCopyOutline /> Copy
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Button
                varient="ghost"
                className="w-full bg-[--primary-btn] hover:bg-[--primary-btn-hover] link-transition mt-2 flex items-center h-[40px]"
                onClick={() => handleShareFile()}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShareLink;
