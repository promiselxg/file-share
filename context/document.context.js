"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { apiCall } from "@/utils/apiCall";
import { createContext, useContext, useEffect, useState } from "react";

const DocumentCRUDOperation = createContext();

export const DocumentCRUDProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
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
        documents,
        resetCheckBox,
        handleCheckboxChange,
        setDocuments,
      }}
    >
      {children}
    </DocumentCRUDOperation.Provider>
  );
};

export const useDocument = () => useContext(DocumentCRUDOperation);
