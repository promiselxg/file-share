"use client";

import { createContext, useContext, useState } from "react";
import useCamera from "@/hooks/use-camera";

const ScreenRecordContext = createContext();

export const ScreenRecordProvider = ({ children }) => {
  const [toggleCamera, setToggleCamera] = useState(false);
  const [toggleSound, setToggleSound] = useState(false);
  const { videoRef, turnOnCamera, turnOffCamera, error } = useCamera();

  const handleToggleCamera = () => {
    setToggleCamera(!toggleCamera);
    if (!toggleCamera) {
      turnOnCamera();
    } else {
      turnOffCamera();
    }
  };

  const handleToggleSound = () => {
    setToggleSound((prev) => !prev);
  };

  return (
    <ScreenRecordContext.Provider
      value={{
        toggleCamera,
        toggleSound,
        handleToggleCamera,
        handleToggleSound,
        videoRef,
        error,
      }}
    >
      {children}
    </ScreenRecordContext.Provider>
  );
};

export const useScreenRecord = () => useContext(ScreenRecordContext);
