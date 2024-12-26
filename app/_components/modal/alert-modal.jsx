import React from "react";
import { useDialog } from "@/context/Dialog.context";
import AlertModal from "./_components/alert/alert-dialog";

const CustomAlertModal = () => {
  const {
    dialogs,
    openDialog,
    closeDialog,
    alertDescription,
    alertTitle,
    alertBtnText,
  } = useDialog();
  return (
    <>
      <AlertModal
        className="md:w-[400px] bg-[--dialog-bg] border-[--dialog-bg] top-[20%]"
        isOpen={dialogs.alert}
        openDialog={() => openDialog("alert")}
        closeDialog={() => closeDialog("alert")}
        description={alertDescription}
        title={alertTitle}
        alertBtnText={alertBtnText}
      />
    </>
  );
};

export default CustomAlertModal;
