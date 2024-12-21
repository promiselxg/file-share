"use client";

import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState({});
  const [alertDescription, setAlertDescription] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const openDialog = (dialogName, desc, title) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: true }));
    setAlertDescription(desc);
    setAlertTitle(title);
  };

  const closeDialog = (dialogName) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: false }));
  };

  return (
    <DialogContext.Provider
      value={{ dialogs, alertDescription, alertTitle, openDialog, closeDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
