import React from "react";
import { FolderMenuItem, ImageVideoMenuItem } from "./menu";

export const MenuItems = ({
  openDialog,
  id,
  title,
  openRenameDialog,
  openMoveFolderDialog,
}) => {
  return (
    <>
      <FolderMenuItem
        openDialog={openDialog}
        id={id}
        title={title}
        openRenameDialog={openRenameDialog}
        openMoveFolderDialog={openMoveFolderDialog}
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
}) => {
  return (
    <>
      <ImageVideoMenuItem
        openDialog={openDialog}
        id={id}
        title={title}
        openRenameDialog={openRenameDialog}
        openMoveFolderDialog={openMoveFolderDialog}
      />
    </>
  );
};
