import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoAlertCircleOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";

const AlertModal = ({
  description,
  isOpen,
  closeDialog,
  openDialog,
  className,
  title,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => open && openDialog}>
      <AlertDialogContent className={cn(``, className)}>
        <AlertDialogHeader>
          <AlertDialogTitle />
          <AlertDialogDescription>
            <div className="w-full flex  gap-2">
              <IoAlertCircleOutline
                size={title ? 30 : 40}
                className={cn(`text-yellow-500 ${title === " " && "mt-2"}`)}
              />
              <div className="flex flex-col gap-y-3">
                {title && (
                  <span className="text-[16px] text-[--sidebar-link-color] font-[600]">
                    {title}
                  </span>
                )}
                <span
                  className={cn(
                    `${
                      title
                        ? "text-sm text-[--popover-text-color]"
                        : "text-[16px] text-[--sidebar-link-color] font-[600]"
                    } `
                  )}
                >
                  {description}
                </span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => closeDialog("alert")}
            className="bg-transparent text-[--sidebar-link-color] border border-[--folder-border-color] rounded-[10px] px-5 py-2 hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] link-transition"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => alert("Ok to Proceed")}
            className="bg-transparent text-[--bg-red] border border-[--bg-red] rounded-[10px] px-5 py-2 hover:bg-transparent hover:border-[--bg-red-hover] hover:text-[--bg-red-hover] link-transition"
          >
            {title ? "Move to Trash" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
