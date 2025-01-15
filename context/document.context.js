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
  const [moveActionLoading, setMoveActionLoading] = useState(false);
  const { closeDialog } = useDialog();
  const { setFolder, setStarredFolders, setTrashedFolder, setTrashedDocument } =
    useFolderCRUD();

  const {
    checkedStates,
    checkedIds,
    checkedCount,
    resetCheckBox,
    handleCheckboxChange,
  } = useCheckboxStates();

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

  // Delete Document or Folder
  const handleDeleteDocument = async (id, actionType) => {
    const apiEndpoints = {
      deleteFolder: `/api/folder/${id}`,
      deleteDocument: `/api/document/${id}`,
      trashFolder: "/api/folder",
      trashDocument: "/api/document",
      emptyTrash: "/api/trash",
    };

    const payloads = {
      deleteFolder: null,
      deleteDocument: null,
      trashFolder: { folderId: id, action: "trash" },
      trashDocument: { documentId: id },
      emptyTrash: null,
    };

    const methods = {
      deleteFolder: "delete",
      deleteDocument: "delete",
      trashFolder: "put",
      trashDocument: "put",
      emptyTrash: "delete",
    };

    if (!apiEndpoints[actionType]) return;

    try {
      setDeleteActionLoading(true);

      const endpoint = apiEndpoints[actionType];
      const payload = payloads[actionType];
      const method = methods[actionType];

      if (actionType.startsWith("trash")) {
        await moveToTrash(id, endpoint, payload, method, actionType);
      } else if (actionType.startsWith("empty")) {
        await emptyTrash(endpoint, method);
      } else {
        await deleteItem(id, endpoint, method, actionType);
      }
    } catch (error) {
      console.error(error);
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setDeleteActionLoading(false);
    }
  };

  // Utility: Move to Trash
  const moveToTrash = async (id, endpoint, payload, method, actionType) => {
    try {
      // API Call
      const data = await apiCall(method, endpoint, payload);
      // Show success toast
      showToast({
        title: data.message || "Items moved to Trash successfully.",
        className: "bg-[green] border-none text-white",
      });
      // Update state based on action type
      updateStateAfterTrash(id, actionType);
      // Close dialog
      closeDialog("alert");
    } catch (error) {
      console.error("Error in moveToTrash:", error);
      // Show error toast
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleMoveDocument = async (
    documentToBeMoved,
    documentToBeMovedId,
    moveDocumentToFolderWithThisId
  ) => {
    try {
      setMoveActionLoading(true);
      const data = await apiCall("put", "/api/document", {
        documentId: documentToBeMovedId,
        newFolderId: moveDocumentToFolderWithThisId,
        action: "moveDocument",
      });
      if (data.status === "success") {
        showToast({
          title: data.message,
          className: "bg-[green] border-none text-white",
        });
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== documentToBeMovedId)
        );
        closeDialog("moveFolder");
      }
    } catch (error) {
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message || "something went wrong",
        variant: "destructive",
      });
    } finally {
      setMoveActionLoading(false);
    }
  };

  // Utility: Delete Item
  const deleteItem = async (id, endpoint, method, actionType) => {
    try {
      await apiCall(method, endpoint);
      // Show success toast
      showToast({
        title: "Item deleted successfully.",
        className: "bg-[green] border-none text-white",
      });
      updateStateAfterDelete(id, actionType);
      closeDialog("alert");
    } catch (error) {
      console.error("Error in deleteItem:", error);
      // Show error toast
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  // Utility: Empty Trash
  const emptyTrash = async (endpoint, method) => {
    try {
      const response = await apiCall(method, endpoint);
      // Show success toast
      if (response.status === "success") {
        showToast({
          title: response.data,
          className: "bg-[green] border-none text-white",
        });
        setFolder([]);
        setDocuments([]);
        closeDialog("alert");
      }
    } catch (error) {
      console.error("Error in deleteItem:", error);
      // Show error toast
      showToast({
        title: "Something went wrong",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  // Helper function to update state
  const updateStateAfterTrash = (id, actionType) => {
    if (actionType === "trashDocument") {
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id)
      );
    } else {
      setFolder((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== id)
      );
      setStarredFolders((prev) =>
        prev.filter((favorite) => favorite.id !== id)
      );
    }
  };

  const updateStateAfterDelete = (id, actionType) => {
    if (actionType === "deleteDocument") {
      setTrashedDocument((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id)
      );
    } else {
      setTrashedFolder((prevFolders) =>
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
        moveActionLoading,
        documents,
        resetCheckBox,
        handleCheckboxChange,
        handleDeleteDocument,
        fetchTopLevelDocuments,
        setDocuments,
        handleMoveDocument,
      }}
    >
      {children}
    </DocumentCRUDOperation.Provider>
  );
};

export const useDocument = () => useContext(DocumentCRUDOperation);
