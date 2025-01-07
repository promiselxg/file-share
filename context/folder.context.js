"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useContext, useEffect, useState } from "react";
import { useDialog } from "./Dialog.context";
import useFetch from "@/hooks/use-fetch";

const FolderCRUDOperation = createContext();

export const FolderCRUDProvider = ({ children }) => {
  const [starredFolders, setStarredFolders] = useState([]);
  const [folderStructure, setFolderStructure] = useState([]);
  const [folder, setFolder] = useState([]);
  const { closeDialog } = useDialog();
  const { data, loading: folderLoading } = useFetch(`/folder`);
  const { data: folderData } = useFetch(`/folder?type=withChildren`);

  useEffect(() => {
    if (data) {
      setFolder(data?.response);
    }
  }, [data]);

  useEffect(() => {
    if (folderData) {
      setFolderStructure(folderData?.response);
    }
  }, [folderData]);

  const addFolder = (newFolder, parentId = "") => {
    if (parentId === "") {
      setFolder((prev) => [newFolder, ...prev]);
    }
  };

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

  /**
   * Add a new folder to the folder structure.
   * @param {Object} newFolder - The new folder object to add.
   * @param {string} [parentId] - The ID of the folder to add a subfolder to (optional).
   */
  // const addFolder = (newFolder, parentId = "") => {
  //   if (!parentId) {
  //     // If no parentId, add as a top-level folder
  //     setFolder((prev) => [newFolder, ...prev]);
  //   } else {
  //     // If parentId exists, add as a subfolder
  //     const addFolderRecursive = (folders) => {
  //       return folders.map((folder) => {
  //         if (folder.id === parentId) {
  //           // Add new folder to the `subfolders` array
  //           const updatedSubfolders = folder.subfolders
  //             ? [...folder.subfolders, newFolder]
  //             : [newFolder];
  //           return { ...folder, subfolders: updatedSubfolders };
  //         }

  //         // Recursively check subfolders
  //         if (folder.subfolders) {
  //           return {
  //             ...folder,
  //             subfolders: addFolderRecursive(folder.subfolders),
  //           };
  //         }

  //         return folder;
  //       });
  //     };

  //     setFolder((prev) => addFolderRecursive(prev));
  //   }
  // };

  return (
    <FolderCRUDOperation.Provider
      value={{
        checkedStates,
        checkedIds,
        checkedCount,
        starredFolders,
        folderStructure,
        folder,
        folderLoading,
        addFolder,
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
