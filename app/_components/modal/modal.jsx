import React from "react";
import CustomModal from "./custom.modal";
import NewFolder from "./_components/folder/newFolder";
import ImageUpload from "./_components/upload/imageUpload";
import { useDialog } from "@/context/Dialog.context";
import RecordVideo from "./_components/record";
import CustomAlertModal from "./alert-modal";
import EditStarredFolder from "./_components/folder/starredFolder";
import ShareLink from "./_components/folder/share";
import Rename from "./_components/folder/rename";
import AddDescription from "./_components/folder/description";
import FolderSelector from "./_components/folder/move/folderSelector";

const Modals = () => {
  const {
    renameFolderTitle,
    renameFolderId,
    dialogs,
    openDialog,
    closeDialog,
    alertDescription,
    alertTitle,
  } = useDialog();
  return (
    <>
      {/**CREATE NEW FOLDER */}
      <CustomModal
        className="w-[30%] top-[30%]"
        heading="New folder"
        isOpen={dialogs.newFolder}
        openDialog={() => openDialog("newFolder")}
        closeDialog={() => closeDialog("newFolder")}
      >
        <NewFolder />
      </CustomModal>

      {/** RENAME FOLDER / DOCUMENT */}
      <CustomModal
        className="w-[30%] top-[30%]"
        heading="Rename"
        isOpen={dialogs.rename}
        openDialog={() => openDialog("rename")}
        closeDialog={() => closeDialog("rename")}
      >
        <Rename title={renameFolderTitle} id={renameFolderId} />
      </CustomModal>

      <CustomModal
        className="w-[30%] top-[30%]"
        heading="Edit description"
        isOpen={dialogs.editDescription}
        openDialog={() => openDialog("editDescription")}
        closeDialog={() => closeDialog("editDescription")}
      >
        <AddDescription />
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

      <CustomModal
        className="w-[30%] top-[30%]"
        heading="Share"
        isOpen={dialogs.share}
        openDialog={() => openDialog("share")}
        closeDialog={() => closeDialog("share")}
      >
        <ShareLink />
      </CustomModal>

      <CustomAlertModal
        className="md:w-[400px] bg-[--dialog-bg] border-[--dialog-bg] top-[30%]"
        isOpen={dialogs.alert}
        openDialog={() => openDialog("alert")}
        closeDialog={() => closeDialog("alert")}
        description={alertDescription}
        title={alertTitle}
      />

      <CustomModal
        className="w-[30%] top-[40%] border-none outline-none"
        heading="Move to"
        isOpen={dialogs.moveFolder}
        openDialog={() => openDialog("moveFolder")}
        closeDialog={() => closeDialog("moveFolder")}
      >
        <FolderSelector />
      </CustomModal>
    </>
  );
};

export default Modals;
