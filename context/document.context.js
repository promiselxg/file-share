"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { apiCall } from "@/utils/apiCall";
import { createContext, useContext, useState } from "react";
import { useDialog } from "./Dialog.context";
import { useFolderCRUD } from "./folder.context";
import { showToast } from "@/utils/showToast";

const DocumentCRUDOperation = createContext();

export const DocumentCRUDProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteActionLoading, setDeleteActionLoading] = useState(false);
  const { closeDialog } = useDialog();
  const { setFolder, setStarredFolders } = useFolderCRUD();

  const {
    checkedStates,
    checkedIds,
    checkedCount,
    resetCheckBox,
    handleCheckboxChange,
  } = useCheckboxStates();

  // Delete document or Folder
  const handleDeleteDocument = async (id, actionType) => {
    const isDocument = actionType === "document";
    moveToTrash(id, isDocument);
  };

  // Fetch Functions
  const fetchTopLevelDocuments = async () => {
    setLoading(true);
    try {
      const data = await apiCall("get", `/api/document`);
      setDocuments(data?.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // called by handleDeleteDocument function
  const moveToTrash = async (id, isDocument) => {
    try {
      setDeleteActionLoading(true);
      // Determine endpoint and payload
      const endpoint = isDocument ? "/api/document" : "/api/folder";
      const payload = isDocument
        ? { documentId: id }
        : { folderId: id, action: "trash" };

      // API Call
      const data = await apiCall("put", endpoint, payload);
      // Show success toast
      showToast({
        title: data.message || "Items moved to Trash successfully.",
        className: "bg-[green] border-none text-white",
      });
      // Update state based on item type
      updateStateAfterTrash(id, isDocument);
      // Close dialog
      closeDialog("alert");
    } catch (error) {
      // Show error toast
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setDeleteActionLoading(false);
    }
  };

  // Helper function to update state
  const updateStateAfterTrash = (id, isDocument) => {
    if (isDocument) {
      // Remove document from state
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id)
      );
    } else {
      // Remove folder and starred folder from state
      setFolder((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== id)
      );
      setStarredFolders((prev) =>
        prev.filter((favorite) => favorite.id !== id)
      );
    }
  };

  return (
    <DocumentCRUDOperation.Provider
      value={{
        checkedStates,
        checkedIds,
        checkedCount,
        loading,
        deleteActionLoading,
        documents,
        resetCheckBox,
        handleCheckboxChange,
        handleDeleteDocument,
        fetchTopLevelDocuments,
        setDocuments,
      }}
    >
      {children}
    </DocumentCRUDOperation.Provider>
  );
};

export const useDocument = () => useContext(DocumentCRUDOperation);
