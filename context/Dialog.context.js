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
  const [selectedDocumentId, setSelectedDocumentId] = useState(
    sharedData[currentIndex] || null
  );

  const [openSelectedDocumentWrapper, setOpenSelectedDocumentWrapper] =
    useState(false);

  const openDialog = (dialogName, desc, title, btnText) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setAlertDescription(desc);
    setAlertTitle(title);
    setAlertBtnText(btnText);
  };

  const openRenameDialog = (dialogName, id, title) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setRenameFolderTitle(title);
    setRenameFolderId(id);
  };

  const closeDialog = (dialogName) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: false }));
  };

  // view selected document
  const handleViewSelectedDocument = (data) => {
    setOpenSelectedDocumentWrapper(!openSelectedDocumentWrapper);
    setSelectedDocumentId(data);
    setCurrentIndex(sharedData.indexOf(data)); // reset current data index
  };

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
        alertBtnText,
        selectedDocumentId,
        openSelectedDocumentWrapper,
        sharedData,
        currentIndex,
        toggleComment,
        replyTo,
        renameFolderTitle,
        renameFolderId,
        openDialog,
        openRenameDialog,
        closeDialog,
        handleViewSelectedDocument,
        handleToggleComment,
        setSharedData,
        nextItem,
        prevItem,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
