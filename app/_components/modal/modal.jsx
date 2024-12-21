import React from "react";
import CustomModal from ".";
import NewFolder from "./_components/newFolder";
import ImageUpload from "./_components/imageUpload";
import { useDialog } from "@/context/Dialog.context";
import RecordVideo from "./_components/record";
import CustomAlertModal from "./alert-modal";

const Modals = () => {
  const { dialogs, openDialog, closeDialog, alertDescription, alertTitle } =
    useDialog();
  return (
    <>
      {/**CREATE NEW FOLDER */}
      <CustomModal
        className="w-[30%]"
        heading="New folder"
        isOpen={dialogs.newFolder}
        openDialog={() => openDialog("newFolder")}
        closeDialog={() => closeDialog("newFolder")}
      >
        <NewFolder />
      </CustomModal>
      {/**UPLOAD IMAGES */}
      <CustomModal
        heading="Upload images"
        className="w-[25%]"
        isOpen={dialogs.uploadImage}
        openDialog={() => openDialog("uploadImage")}
        closeDialog={() => closeDialog("uploadImage")}
      >
        <ImageUpload />
      </CustomModal>
      {/**RECORD VIDEO */}
      <CustomModal
        className="w-fit"
        isOpen={dialogs.recordVideo}
        openDialog={() => openDialog("recordVideo")}
        closeDialog={() => closeDialog("recordVideo")}
      >
        <RecordVideo />
      </CustomModal>

      <CustomAlertModal
        className="md:w-[400px] bg-[--dialog-bg] border-[--dialog-bg] top-[20%]"
        isOpen={dialogs.alert}
        openDialog={() => openDialog("alert")}
        closeDialog={() => closeDialog("alert")}
        description={alertDescription}
        title={alertTitle}
      />
    </>
  );
};

export default Modals;
