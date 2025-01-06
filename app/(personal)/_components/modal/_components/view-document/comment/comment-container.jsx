"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { FiAtSign } from "react-icons/fi";
import Comment from "./comment";
import { useDialog } from "@/context/Dialog.context";

const CommentContainer = ({ documentid, userid, username }) => {
  const { toggleComment, replyTo, handleToggleComment } = useDialog();
  const [comment, setComment] = useState([
    {
      id: "eb316d4fc5a53dc86db286b78aa75903",
      itemid: "eb316d4fc5a53dc86db286b78aa7545",
      comment: "This is a comment",
      date: "2022-02-22T12:00:00.000Z",
      time: "12:00",
      createdBy: {
        userid: "random1234",
        username: "promise",
      },
    },
    {
      id: "eb316d4fc5a53dc86db286b78aa903",
      itemid: "eb316d4fc5a53dc86db286b7545",
      comment: "@promise This is a comment",
      date: "2024-02-22T12:00:00.000Z",
      time: "12:00",
      createdBy: {
        userid: "random1334",
        username: "promiselxg",
        photoUrl: "https://github.com/promiselxg.png",
      },
    },
  ]);

  return (
    <>
      <div className="w-full flex mx-[-5px] flex-col px-2">
        {username !== "promiselxg" && (
          <h1 className="text-[16px] text-[--popover-text-color] -mt-6">
            {comment?.length} comment
          </h1>
        )}

        <div
          className={cn(
            `${
              toggleComment ? "min-h-[500px]" : "h-[500px]"
            } w-full flex flex-col relative`
          )}
        >
          <div
            className={cn(
              `w-full flex flex-col 
              ${toggleComment && "mt-0"}
              ${comment.length < 1 && " items-center mt-[120px] "}
              `
            )}
          >
            {comment.length < 1 ? (
              <div className="flex flex-col items-center">
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
            ) : (
              <div className="w-full h-fit">
                <Comment data={comment} />
              </div>
            )}
          </div>
        </div>
        {!toggleComment && (
          <div className="w-full absolute bottom-5">
            <Button
              className="w-[90%] bg-[--primary-btn] border border-[--primary-btn] text-white hover:bg-[--primary-btn-hover] link-transition hover:border-[--primary-btn-hover]"
              onClick={() => handleToggleComment("")}
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
                defaultValue={`${replyTo ? `@${replyTo} ` : " "}`}
              ></Textarea>
              <div className="w-full">
                <div className="flex items-center justify-between mx-1">
                  <div className="flex items-center">
                    <Button
                      size="icon"
                      className="bg-transparent hover:bg-[--sidebar-link-active-bg] rounded-[10px]"
                    >
                      <CiFaceSmile className="text-[--gray]" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-transparent hover:bg-[--sidebar-link-active-bg] rounded-[10px]"
                    >
                      <FiAtSign className="text-[--gray]" />
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="bg-transparent text-[--popover-text-color] hover:text-[--primary-btn-hover] link-transition hover:bg-transparent"
                      size="sm"
                      onClick={() => handleToggleComment("")}
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
    </>
  );
};

export default CommentContainer;
