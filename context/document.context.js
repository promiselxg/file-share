"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { toast } from "@/hooks/use-toast";
import { apiCall } from "@/utils/apiCall";
import { createContext, useContext, useEffect, useState } from "react";
import { useDialog } from "./Dialog.context";
import { useFolderCRUD } from "./folder.context";

const DocumentCRUDOperation = createContext();

export const DocumentCRUDProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteActionLoading, setDeleteActionLoading] = useState(false);
  const { closeDialog } = useDialog();
  const { setFolder } = useFolderCRUD();

  const {
    checkedStates,
    checkedIds,
    checkedCount,
    resetCheckBox,
    handleCheckboxChange,
  } = useCheckboxStates();

  // Document CRUD
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

  const moveToTrash = async (id, isDocument) => {
    try {
      setDeleteActionLoading(true);
      const endpoint = isDocument ? "/api/document" : "/api/folder";
      const payload = isDocument
        ? { documentId: id }
        : { documentId: id, action: "trash" };

      const data = await apiCall("put", endpoint, payload);

      // Refresh the appropriate state
      if (isDocument) {
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== id)
        );
      } else {
        setFolder((prevFolders) =>
          prevFolders.filter((folder) => folder.id !== id)
        );
      }

      toast({
        title: data.message || "Items moved to Trash successfully.",
        className: "bg-[green] border-none text-white",
      });
      closeDialog("alert");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrongx",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setDeleteActionLoading(false);
    }
  };

  useEffect(() => {
    fetchTopLevelDocuments();
  }, []);

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
        setDocuments,
      }}
    >
      {children}
    </DocumentCRUDOperation.Provider>
  );
};

export const useDocument = () => useContext(DocumentCRUDOperation);
