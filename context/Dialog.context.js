"use client";

import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  const [toggleComment, setToggleComment] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [renameFolderTitle, setRenameFolderTitle] = useState("");
  const [renameFolderId, setRenameFolderId] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertBtnText, setAlertBtnText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sharedData, setSharedData] = useState([]);
  const [selectedMoveFolderId, setSelectedMoveFolderId] = useState(null);
  const [moveFolderId, setMoveFolderId] = useState("");
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [dataID, setDataID] = useState(null);
  const [moveFolderDocumentType, setMoveFolderDocumentType] =
    useState("folder");

  const [selectedDocumentId, setSelectedDocumentId] = useState(
    sharedData[currentIndex] || null
  );

  const [openSelectedDocumentWrapper, setOpenSelectedDocumentWrapper] =
    useState(false);

  // Open Dialog
  const openDialog = (dialogName, desc, title, btnText) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setAlertDescription(desc);
    setAlertTitle(title);
    setAlertBtnText(btnText);
  };

  // Rename folder/document
  const openRenameDialog = (dialogName, id, title) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setRenameFolderTitle(title);
    setRenameFolderId(id);
  };

  // Rename folder/document
  const openDownloadFolderDialog = (dialogName, id) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setDataID(id);
  };

  // move folder dialog
  const openMoveFolderDialog = (dialogName, folderId, documentType) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setMoveFolderId(folderId);
    setMoveFolderDocumentType(documentType);
  };

  // close dialog
  const closeDialog = (dialogName) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: false }));
    setDataID(null);
  };

  // view selected document
  const handleViewSelectedDocument = (data) => {
    setOpenSelectedDocumentWrapper(!openSelectedDocumentWrapper);
    setSelectedDocumentId(data);
    setCurrentIndex(sharedData.indexOf(data)); // reset current data index
  };

  // view selected document in Full Screen
  const handleViewDocumentInFullScreen = (data) => {
    setFullScreenMode(!fullScreenMode);
    setSelectedDocumentId(data);
  };

  // Toggle Comment
  const handleToggleComment = (user) => {
    setToggleComment(!toggleComment);
    if (user) {
      setReplyTo(user);
    }
  };

  //  previous item
  const prevItem = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex); // Update the current index
      setSelectedDocumentId(sharedData[newIndex]); // Update the selected document
    }
  };
  //  next item
  const nextItem = () => {
    if (currentIndex < sharedData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex); // Update the current index
      setSelectedDocumentId(sharedData[newIndex]); // Update the selected document
    }
  };

  return (
    <DialogContext.Provider
      value={{
        dialogs,
        alertDescription,
        alertTitle,
        renameFolderTitle,
        alertBtnText,
        openSelectedDocumentWrapper,
        fullScreenMode,
        sharedData,
        currentIndex,
        toggleComment,
        replyTo,
        selectedDocumentId,
        renameFolderId,
        dataID,
        selectedMoveFolderId,
        moveFolderId: moveFolderId.toString(),
        moveFolderDocumentType,
        openDialog,
        openRenameDialog,
        openMoveFolderDialog,
        openDownloadFolderDialog,
        closeDialog,
        handleViewSelectedDocument,
        handleViewDocumentInFullScreen,
        handleToggleComment,
        setSharedData,
        setSelectedMoveFolderId,
        nextItem,
        prevItem,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
