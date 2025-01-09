"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useContext, useEffect, useState } from "react";
import { useDialog } from "./Dialog.context";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/utils/copyText";
import host from "@/utils/host";

const FolderCRUDOperation = createContext();

const apiCall = async (method, url, payload = {}) => {
  try {
    const response = await axios[method](url, payload);
    return response.data;
  } catch (error) {
    console.error(`API ${method.toUpperCase()} error:`, error);
    throw error;
  }
};

export const FolderCRUDProvider = ({ children }) => {
  const [starredFolders, setStarredFolders] = useState([]);
  const [folderStructure, setFolderStructure] = useState([]);
  const [loadingStarredFolders, setLoadingStarredFolders] = useState(false);
  const [renameFolderStatus, setRenameFolderStatus] = useState(false);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [folder, setFolder] = useState([]);

  const { setShareLinkData, closeDialog } = useDialog();
  const {
    resetCheckBox,
    checkedStates,
    checkedIds,
    checkedCount,
    handleCheckboxChange,
  } = useCheckboxStates();

  // Fetch Functions
  const fetchStarredFolders = async () => {
    setLoadingStarredFolders(true);
    try {
      const data = await apiCall("get", `/api/folder?type=favorite`);
      setStarredFolders(data.response);
    } catch (error) {
      toast({
        title: "Failed to fetch starred folders",
        variant: "destructive",
      });
    } finally {
      setLoadingStarredFolders(false);
    }
  };

  const fetchTopLevelFolders = async () => {
    try {
      const data = await apiCall("get", `/api/folder`);
      setFolder(data.response);
    } catch (error) {
      toast({
        title: "Failed to fetch top-level folders",
        variant: "destructive",
      });
    }
  };

  const fetchFolderStructure = async () => {
    setLoadingStarredFolders(true);
    try {
      const data = await apiCall("get", `/api/folder?type=withChildren`);
      setFolderStructure(data.response);
    } catch (error) {
      toast({
        title: "Failed to fetch folder structure",
        variant: "destructive",
      });
    } finally {
      setLoadingStarredFolders(false);
    }
  };

  // CRUD Functions
  const handleAddToFavorite = async (folderId) => {
    try {
      const data = await apiCall("put", `/api/folder`, { folderId });
      setStarredFolders((prev) => {
        const exists = prev.some((folder) => folder.id === folderId);
        return exists
          ? prev.filter((folder) => folder.id !== folderId)
          : [...prev, data.data];
      });
      updateFolderFavoriteStatus(folderId, data?.data?.favorite);
    } catch (error) {
      toast({
        title: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  const handleRenameFolder = async (newFolderName, folderId) => {
    if (!newFolderName) return;
    try {
      setRenameFolderStatus(true);
      const data = await apiCall("put", `/api/folder/${folderId}`, {
        folder_name: newFolderName,
        folderId,
      });
      if (data?.status === "success") {
        // update the folder array
        setFolder((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === folderId ? { ...folder, name: newFolderName } : folder
          )
        );
        // Update the starred folders state if the folder exists there
        setStarredFolders((prevStarredFolders) =>
          prevStarredFolders.map((folder) =>
            folder.id === folderId ? { ...folder, name: newFolderName } : folder
          )
        );
        // close dialog
        closeDialog("rename");
      } else {
        toast({
          title:
            data?.message ||
            error?.response?.data?.message ||
            "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Failed to rename folder",
        variant: "destructive",
      });
    } finally {
      setRenameFolderStatus(false);
    }
  };

  const removeItem = async (itemArray, itemId) => {
    try {
      const data = await apiCall("put", `/api/folder`, { folderId: itemId });
      updateFolderFavoriteStatus(itemId, data?.data?.favorite);
      const updatedArray = itemArray.filter((item) => item.id !== itemId);
      if (updatedArray.length < 1) closeDialog("editStarredFolders");
      setStarredFolders(updatedArray);
    } catch (error) {
      toast({ title: "Failed to remove item", variant: "destructive" });
    }
  };

  const addFolder = (newFolder, parentId = "") => {
    if (parentId === "") {
      setFolder((prev) => [newFolder, ...prev]);
    }
  };

  const updateFolderFavoriteStatus = (id, isFavorite) => {
    setFolder((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, favorite: isFavorite } : folder
      )
    );
  };

  const handleGenerateShareLink = async (id, type) => {
    try {
      setLoading(true);
      const data = await apiCall("get", `/api/folder/${id}?type=${type}`);
      if (data.status === "success") {
        setShareLinkData(`${host.host_url}/${id}/${data?.data}`);
        copyToClipboard(link);
        setFolder((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === id ? { ...folder, shareLink: data?.data } : folder
          )
        );
        toast({
          title: "Shareable link copied to clipboard.",
          className: "bg-[green] border-none text-white",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeShareLink = async (id, type) => {
    try {
      setLink("");
      const data = await apiCall(
        "get",
        `/api/folder/${id}?type=${type}&action=revoke`
      );
      if (data.status === "success") {
        setFolder((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === id ? { ...folder, shareLink: null } : folder
          )
        );
      }
    } catch (error) {
      console.error(error);
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

  // const fetchTopLevelFolders = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/folder`);
  //     setFolder(data?.response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchStarredFolders = async () => {
  //   try {
  //     setLoadingStarredFolders(true);
  //     const { data } = await axios.get(`/api/folder?type=favorite`);
  //     setStarredFolders(data.response);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoadingStarredFolders(false);
  //   }
  // };

  // const fetchFolderStructure = async () => {
  //   try {
  //     setLoadingStarredFolders(true);
  //     const { data } = await axios.get(`/api/folder?type=withChildren`);
  //     setFolderStructure(data.response);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoadingStarredFolders(false);
  //   }
  // };

  return (
    <FolderCRUDOperation.Provider
      value={{
        link,
        checkedStates,
        checkedIds,
        checkedCount,
        starredFolders,
        folderStructure,
        folder,
        loadingStarredFolders,
        loading,
        renameFolderStatus,
        addFolder,
        resetCheckBox,
        handleCheckboxChange,
        handleAddToFavorite,
        handleRenameFolder,
        handleGenerateShareLink,
        handleRevokeShareLink,
        setStarredFolders,
        setLink,
        removeItem,
      }}
    >
      {children}
    </FolderCRUDOperation.Provider>
  );
};

export const useFolderCRUD = () => useContext(FolderCRUDOperation);
