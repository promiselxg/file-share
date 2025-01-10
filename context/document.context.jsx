"use client";

import useCheckboxStates from "@/hooks/use-checkbox";
import { toast } from "@/hooks/use-toast";
import { apiCall } from "@/utils/apiCall";
import { createContext, useState } from "react";

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
      setDocuments(data.response);
    } catch (error) {
      toast({
        title: "Failed to fetch starred folders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
        fetchTopLevelDocuments,
      }}
    >
      {children}
    </DocumentCRUDOperation.Provider>
  );
};
