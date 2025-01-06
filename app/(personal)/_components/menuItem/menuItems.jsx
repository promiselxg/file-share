import React from "react";
import { FolderMenuItem, ImageVideoMenuItem } from "./menu";

export const MenuItems = ({
  openDialog,
  id,
  title,
  openRenameDialog,
  openMoveFolderDialog,
  openDownloadFolderDialog,
  handleCheckboxChange,
}) => {
  return (
    <>
      <FolderMenuItem
        openDialog={openDialog}
        id={id}
        title={title}
        openRenameDialog={openRenameDialog}
        openMoveFolderDialog={openMoveFolderDialog}
        openDownloadFolderDialog={openDownloadFolderDialog}
        handleCheckboxChange={handleCheckboxChange}
      />
    </>
  );
};

export const MenuItem = ({
  openDialog,
  id,
  title,
  openRenameDialog,
  openMoveFolderDialog,
  openDownloadFolderDialog,
  handleCheckboxChange,
}) => {
  return (
    <>
      <ImageVideoMenuItem
        openDialog={openDialog}
        id={id}
        title={title}
        openRenameDialog={openRenameDialog}
        openMoveFolderDialog={openMoveFolderDialog}
        openDownloadFolderDialog={openDownloadFolderDialog}
        handleCheckboxChange={handleCheckboxChange}
      />
    </>
  );
};
