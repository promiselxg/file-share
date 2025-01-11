"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { apiCall } from "@/utils/apiCall";
import { createContext, useContext, useEffect, useState } from "react";

const DocumentCRUDOperation = createContext();

export const DocumentCRUDProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteActionLoading, setDeleteActionLoading] = useState(false);
  const [documentActionErroMessage, setDocumentActionErroMessage] =
    useState("");

  const {
    checkedStates,
    checkedIds,
    checkedCount,
    resetCheckBox,
    handleCheckboxChange,
  } = useCheckboxStates();

  // Document CRUD
  const handleDeleteDocument = async (id) => {
    try {
      setDeleteActionLoading(true);
      const data = await apiCall("put", `/api/document`, { documentId: id });
      console.log(data);
    } catch (error) {
      setDocumentActionErroMessage(error?.response?.data?.message);
    } finally {
      setDeleteActionLoading(false);
      setTimeout(() => {
        setDocumentActionErroMessage(null);
      }, 3000);
    }
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
        documentActionErroMessage,
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
