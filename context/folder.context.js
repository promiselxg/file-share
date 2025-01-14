"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { createContext, useCallback, useContext, useState } from "react";
import { useDialog } from "./Dialog.context";
import { copyToClipboard } from "@/utils/copyText";
import host from "@/utils/host";
import { apiCall } from "@/utils/apiCall";
import { showToast } from "@/utils/showToast";

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
  const [trashedFolder, setTrashedFolder] = useState([]);
  const [trashedDocument, setTrashedDocument] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [loadingFolders, setLoadingFolders] = useState(false);
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
      showToast({
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
      showToast({
        title: "Failed to fetch top-level folders",
        variant: "destructive",
      });
    } finally {
      setLoadTopLevelFolder(false);
    }
  };

  const fetchFolderStructure = useCallback(async () => {
    setLoadingStarredFolders(true);
    try {
      const data = await apiCall("get", `/api/folder?type=withChildren`);
      setFolderStructure(data.response);
    } catch (error) {
      showToast({
        title: "Failed to fetch folder structure",
        variant: "destructive",
      });
    } finally {
      setLoadingStarredFolders(false);
    }
  }, []);

  const fetchTrashFolders = useCallback(async () => {
    try {
      setLoadingFolders(true);
      const data = await apiCall("get", `/api/folder?type=trash`);
      setTrashedFolder(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFolders(false);
    }
  }, []);

  const fetchTrashDocuments = useCallback(async () => {
    try {
      setLoadingDocuments(true);
      const data = await apiCall("get", `/api/document?type=trash`);
      setTrashedDocument(data.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDocuments(false);
    }
  }, []);

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
      showToast({
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
        showToast({
          title: "Folder rename successfully.",
          className: "bg-[green] border-none text-white",
        });
      } else {
        showToast({
          title:
            data?.message ||
            error?.response?.data?.message ||
            "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      showToast({
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
      showToast({ title: "Failed to remove item", variant: "destructive" });
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
        showToast({
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

    showToast({
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

  const handleRestoreTrashedFolder = async (folderId) => {
    // Find the folder in trashed folders
    const restoredFolder = trashedFolder.find(
      (folder) => folder.id === folderId
    );

    setTrashedFolder((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== folderId)
    );

    if (restoredFolder?.favorite) {
      setStarredFolders((prevStarredFolders) => [
        ...prevStarredFolders,
        restoredFolder,
      ]);
    }

    showToast({
      title: "Item restore successfully.",
      className: "bg-[green] border-none text-white",
    });
    try {
      await apiCall("put", `/api/folder`, {
        folderId,
        action: "restore",
      });
    } catch (error) {
      // Revert changes if the API call fails
      setTrashedFolder((prevFolders) => [...prevFolders, restoredFolder]);

      if (restoredFolder?.favorite) {
        setStarredFolders((prevStarredFolders) =>
          prevStarredFolders.filter((folder) => folder.id !== folderId)
        );
      }
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  /**
   * Add a new folder to the folder structure.
   * @param {Object} newFolder - The new folder object to add.
   * @param {string} [parentId] - The ID of the folder to add a subfolder to (optional).
   */

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
        trashedFolder,
        trashedDocument,
        loadingStarredFolders,
        loading,
        loadTopLevelFolder,
        loadingFolders,
        loadingDocuments,
        renameFolderStatus,
        addFolder,
        setFolder,
        setStarredFolders,
        setTrashedDocument,
        setTrashedFolder,
        setLink,
        resetCheckBox,
        removeItem,
        handleCheckboxChange,
        handleAddToFavorite,
        handleRenameFolder,
        handleGenerateShareLink,
        handleRevokeShareLink,
        handleMoveFolder,
        handleRestoreTrashedFolder,
        fetchStarredFolders,
        fetchTopLevelFolders,
        fetchFolderStructure,
        fetchTrashFolders,
        fetchTrashDocuments,
      }}
    >
      {children}
    </FolderCRUDOperation.Provider>
  );
};

export const useFolderCRUD = () => useContext(FolderCRUDOperation);
