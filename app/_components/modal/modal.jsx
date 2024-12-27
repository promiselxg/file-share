import React from "react";
import CustomModal from "./custom.modal";
import NewFolder from "./_components/folder/newFolder";
import ImageUpload from "./_components/upload/imageUpload";
import { useDialog } from "@/context/Dialog.context";
import RecordVideo from "./_components/record";
import CustomAlertModal from "./alert-modal";
import EditStarredFolder from "./_components/folder/starredFolder";

const Modals = () => {
  const { dialogs, openDialog, closeDialog, alertDescription, alertTitle } =
    useDialog();
  return (
    <>
      {/**CREATE NEW FOLDER */}
      <CustomModal
        className="w-[30%] top-[20%]"
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
        className="w-fit top-[40%]"
        isOpen={dialogs.recordVideo}
        openDialog={() => openDialog("recordVideo")}
        closeDialog={() => closeDialog("recordVideo")}
      >
        <RecordVideo />
      </CustomModal>
      {/** EDIT STARRED FOLDERS */}
      <CustomModal
        className="w-[30%] top-[40%]"
        heading="Edit Starred Folders"
        isOpen={dialogs.editStarredFolders}
        openDialog={() => openDialog("editStarredFolders")}
        closeDialog={() => closeDialog("editStarredFolders")}
      >
        <EditStarredFolder />
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
