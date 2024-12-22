"use client";

import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sharedData, setSharedData] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(
    sharedData[currentIndex] || null
  );

  const [openSelectedDocumentWrapper, setOpenSelectedDocumentWrapper] =
    useState(false);

  const openDialog = (dialogName, desc, title) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setAlertDescription(desc);
    setAlertTitle(title);
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
        selectedDocumentId,
        openSelectedDocumentWrapper,
        sharedData,
        currentIndex,
        openDialog,
        closeDialog,
        handleViewSelectedDocument,
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
