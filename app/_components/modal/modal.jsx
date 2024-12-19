import React from "react";
import CustomModal from ".";
import NewFolder from "./_components/newFolder";
import ImageUpload from "./_components/imageUpload";
import { useDialog } from "@/context/Dialog.context";
import RecordVideo from "./_components/record";

const Modals = () => {
  const { dialogs, openDialog, closeDialog } = useDialog();
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
    </>
  );
};

export default Modals;
