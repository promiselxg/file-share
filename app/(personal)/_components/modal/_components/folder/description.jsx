"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDialog } from "@/context/Dialog.context";
import React from "react";

const AddDescription = ({ id }) => {
  const { closeDialog } = useDialog();
  return (
    <>
      <Textarea
        className="w-full h-[105px] p-2 text-[--popover-text-color] outline-none resize-none border focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none border-[#434343] bg-[--body-bg] rounded-[8px] focus:border-[--primary-btn] mb-2"
        placeholder=""
      ></Textarea>
      <div className="w-full flex justify-end gap-3">
        <Button
          variant="outline"
          className="bg-transparent border-[#434343] hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] text-[--popover-text-color]"
          onClick={() => closeDialog("editDescription")}
        >
          Cancel
        </Button>
        <Button className="bg-[--primary-btn] hover:bg-[--primary-btn]">
          Done
        </Button>
      </div>
    </>
  );
};

export default AddDescription;
