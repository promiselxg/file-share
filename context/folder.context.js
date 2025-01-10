"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useContext, useEffect, useState } from "react";
import { useDialog } from "./Dialog.context";
import { toast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/utils/copyText";
import host from "@/utils/host";
import { apiCall } from "@/utils/apiCall";

const FolderCRUDOperation = createContext();

export const FolderCRUDProvider = ({ children }) => {
  const [starredFolders, setStarredFolders] = useState([]);
  const [folderStructure, setFolderStructure] = useState([]);
  const [loadingStarredFolders, setLoadingStarredFolders] = useState(false);
  const [loadTopLevelFolder, setLoadTopLevelFolder] = useState(false);
  const [renameFolderStatus, setRenameFolderStatus] = useState(false);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [folder, setFolder] = useState([]);
  const { setShareLinkData, closeDialog } = useDialog();

  const {
    checkedStates,
    checkedIds,
    checkedCount,
    resetCheckBox,
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
      setLoadTopLevelFolder(true);
      const data = await apiCall("get", `/api/folder`);
      setFolder(data.response);
    } catch (error) {
      toast({
        title: "Failed to fetch top-level folders",
        variant: "destructive",
      });
    } finally {
      setLoadTopLevelFolder(false);
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

  const handleMoveFolder = async (
    currentFolder,
    folderToMoveId,
    newFolderParentId
  ) => {
    const moveAndRemoveFolder = (folders) => {
      return folders
        .filter((folder) => folder.id !== folderToMoveId) // sort the folder array to remove this item from the UI
        .map((folder) => {
          if (folder.id === newFolderParentId) {
            // Add the folder to the `children` array of the target folder
            const updatedChildren = folder.children
              ? [...folder.children, currentFolder]
              : [currentFolder];
            return { ...folder, children: updatedChildren };
          }

          // Recursively check and update subfolders
          if (folder.children) {
            return {
              ...folder,
              children: moveAndRemoveFolder(folder.children),
            };
          }
          return folder;
        });
    };
    setFolder((prev) => moveAndRemoveFolder(prev));

    toast({
      title: "Folders moved successfully.",
      className: "bg-[--body-bg] text-[--gray] DialogBoxShadow border-none",
    });
    closeDialog("moveFolder");

    try {
      await apiCall("post", `/api/moveFolder`, {
        folderToMoveId,
        newFolderParentId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Add a new folder to the folder structure.
   * @param {Object} newFolder - The new folder object to add.
   * @param {string} [parentId] - The ID of the folder to add a subfolder to (optional).
   */

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
        loadTopLevelFolder,
        renameFolderStatus,
        addFolder,
        resetCheckBox,
        handleCheckboxChange,
        handleAddToFavorite,
        handleRenameFolder,
        handleGenerateShareLink,
        handleRevokeShareLink,
        handleMoveFolder,
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
