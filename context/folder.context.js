"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useContext, useEffect, useState } from "react";
import { useDialog } from "./Dialog.context";
import axios from "axios";

const FolderCRUDOperation = createContext();

export const FolderCRUDProvider = ({ children }) => {
  const [starredFolders, setStarredFolders] = useState([]);
  const [folderStructure, setFolderStructure] = useState([]);
  const [loadingStarredFolders, setLoadingStarredFolders] = useState(false);
  const [folder, setFolder] = useState([]);

  const { closeDialog } = useDialog();
  const {
    resetCheckBox,
    checkedStates,
    checkedIds,
    checkedCount,
    handleCheckboxChange,
  } = useCheckboxStates();

  const updateFolderFavoriteStatus = (id, isFavorite) => {
    setFolder((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, favorite: isFavorite } : folder
      )
    );
  };

  const handleAddToFavorite = async (folderId) => {
    try {
      const { data } = await axios.put(`/api/folder`, { folderId });
      setStarredFolders((prev) => {
        const exists = prev.some((folder) => folder.id === folderId);
        if (exists) {
          // Remove the folder if it already exists
          return prev.filter((folder) => folder.id !== folderId);
        } else {
          // Add the folder if it doesn't exist
          return [...prev, data.data];
        }
      });
      updateFolderFavoriteStatus(folderId, data?.data?.favorite);
    } catch (error) {
      console.log(error);
    }
  };

  // partially append to the folder array immediately it a new folder has been created
  const addFolder = (newFolder, parentId = "") => {
    if (parentId === "") {
      setFolder((prev) => [newFolder, ...prev]);
    }
  };

  // remove favorite folder
  const removeItem = async (itemArray, itemId) => {
    try {
      const { data } = await axios.put(`/api/folder`, { folderId: itemId });
      updateFolderFavoriteStatus(itemId, data?.data?.favorite);
      const updatedArray = itemArray.filter((item) => item.id !== itemId);
      if (updatedArray.length < 1) {
        closeDialog("editStarredFolders");
      }
      setStarredFolders(updatedArray);
    } catch (error) {
      console.log(error);
    }
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

  // get favoorite folders

  useEffect(() => {
    fetchStarredFolders();
    fetchTopLevelFolders();
    fetchFolderStructure();
  }, []);

  const fetchTopLevelFolders = async () => {
    try {
      const { data } = await axios.get(`/api/folder`);
      setFolder(data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStarredFolders = async () => {
    try {
      setLoadingStarredFolders(true);
      const { data } = await axios.get(`/api/folder?type=favorite`);
      setStarredFolders(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStarredFolders(false);
    }
  };

  const fetchFolderStructure = async () => {
    try {
      setLoadingStarredFolders(true);
      const { data } = await axios.get(`/api/folder?type=withChildren`);
      setFolderStructure(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStarredFolders(false);
    }
  };

  return (
    <FolderCRUDOperation.Provider
      value={{
        checkedStates,
        checkedIds,
        checkedCount,
        starredFolders,
        folderStructure,
        folder,
        loadingStarredFolders,

        addFolder,
        resetCheckBox,
        handleCheckboxChange,
        handleAddToFavorite,
        setStarredFolders,
        removeItem,
      }}
    >
      {children}
    </FolderCRUDOperation.Provider>
  );
};

export const useFolderCRUD = () => useContext(FolderCRUDOperation);
