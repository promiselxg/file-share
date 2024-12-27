"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useContext, useState } from "react";
import { useDialog } from "./Dialog.context";

const FolderCRUDOperation = createContext();

export const FolderCRUDProvider = ({ children }) => {
  const [starredFolders, setStarredFolders] = useState([]);
  const { closeDialog } = useDialog();

  const {
    resetCheckBox,
    checkedStates,
    checkedIds,
    checkedCount,
    handleCheckboxChange,
  } = useCheckboxStates();

  const removeItem = (itemArray, itemId) => {
    const updatedArray = itemArray.filter((item) => item.id !== itemId);
    if (updatedArray.length < 1) {
      closeDialog("editStarredFolders");
    }
    setStarredFolders(updatedArray);
  };

  return (
    <FolderCRUDOperation.Provider
      value={{
        checkedStates,
        checkedIds,
        checkedCount,
        starredFolders,
        resetCheckBox,
        handleCheckboxChange,
        setStarredFolders,
        removeItem,
      }}
    >
      {children}
    </FolderCRUDOperation.Provider>
  );
};

export const useFolderCRUD = () => useContext(FolderCRUDOperation);
