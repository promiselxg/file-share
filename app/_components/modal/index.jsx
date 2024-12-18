"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const CustomModal = ({
  heading,
  children,
  isOpen,
  closeDialog,
  openDialog,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => open && openDialog}
      className="relative"
    >
      <DialogContent
        closeDialog={closeDialog}
        className="bg-[--dialog-bg] shadow-md border-none DialogBoxShadow md:absolute  p-5"
      >
        <DialogHeader>
          <DialogTitle className="text-[--sidebar-link-color] text-[24px] leading-[38px]">
            {heading}
          </DialogTitle>
          <div className="flex gap-y-2 flex-col">{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
