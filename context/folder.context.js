"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useContext } from "react";

const FolderCRUDOperation = createContext();

export const FolderCRUDProvider = ({ children }) => {
  const {
    resetCheckBox,
    checkedStates,
    checkedIds,
    checkedCount,
    handleCheckboxChange,
  } = useCheckboxStates();

  return (
    <FolderCRUDOperation.Provider
      value={{
        checkedStates,
        checkedIds,
        checkedCount,
        resetCheckBox,
        handleCheckboxChange,
      }}
    >
      {children}
    </FolderCRUDOperation.Provider>
  );
};

export const useFolderCRUD = () => useContext(FolderCRUDOperation);
