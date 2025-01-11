import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoAlertCircleOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { useDocument } from "@/context/document.context";
import { useDialog } from "@/context/Dialog.context";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AlertModal = ({
  description,
  isOpen,
  closeDialog,
  openDialog,
  className,
  title,
  alertBtnText,
}) => {
  const { dataID } = useDialog();
  const {
    documentActionErroMessage,
    deleteActionLoading,
    handleDeleteDocument,
  } = useDocument();

  if (documentActionErroMessage) {
    toast({
      title: documentActionErroMessage,
      className: "bg-[--bg-red] text-white border-none",
    });
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => open && openDialog}>
      <AlertDialogContent className={cn(``, className)}>
        <AlertDialogHeader>
          <AlertDialogTitle />
          <div>
            <div className="w-full flex  gap-2">
              <IoAlertCircleOutline
                size={title ? 25 : 40}
                className={cn(`text-yellow-500 ${title === " " && "mt-2"}`)}
              />
              <div className="flex flex-col gap-y-3">
                {title && (
                  <span className="text-[14px] text-[--sidebar-link-color] font-[600]">
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
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => closeDialog("alert")}
            className="bg-transparent text-[--sidebar-link-color] border border-[--folder-border-color] rounded-[10px] px-5 py-2 hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] link-transition"
            disabled={deleteActionLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteDocument(dataID)}
            className="bg-transparent text-[--bg-red] border border-[--bg-red] rounded-[10px] px-5 py-2 hover:bg-transparent hover:border-[--bg-red-hover] hover:text-[--bg-red-hover] link-transition disabled:cursor-not-allowed"
            disabled={deleteActionLoading}
          >
            {deleteActionLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> please wait...
              </div>
            ) : title ? (
              "Move to Trash"
            ) : alertBtnText ? (
              alertBtnText
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
