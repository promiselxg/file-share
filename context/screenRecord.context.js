"use client";

import { createContext, useContext, useState } from "react";
import useCamera from "@/hooks/use-camera";
import useMicrophone from "@/hooks/use-microphone";

const ScreenRecordContext = createContext();

export const ScreenRecordProvider = ({ children }) => {
  const [toggleCamera, setToggleCamera] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(3);
  const [selectedMediaSource, setSelectedMediaSource] = useState("");

  const resolutions = [
    {
      name: "HD 720p",
      value: "hd",
    },
    {
      name: "FHD 1080p",
      value: "fhd",
      pro: true,
    },
    {
      name: "4k",
      value: "4k",
      pro: true,
    },
  ];
  const [selectedResolution, setSelectedResolution] = useState(
    resolutions[0].value
  );

  // useCamera Hook
  const {
    videoRef,
    turnOnCamera,
    turnOffCamera,
    devices,
    selectedCamera,
    setSelectedCamera,
    error,
  } = useCamera();

  // useMicrophone Hook
  const {
    hasPermission,
    audioStream,
    deviceMic,
    toggleMicrophone,
    isMicOn,
    selectedMicrophone,
    setSelectedMicrophone,
  } = useMicrophone();

  const handleToggleCamera = () => {
    setToggleCamera(!toggleCamera);
    if (!toggleCamera) {
      turnOnCamera();
    } else {
      turnOffCamera();
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };
  const handleAudioDeviceChange = (value) => {
    setSelectedMicrophone(value);
  };
  const handleResolutionChange = (value) => {
    setSelectedResolution(value);
  };
  const handleSelectedMediaSource = (value) => {
    setSelectedMediaSource(value);
  };

  return (
    <ScreenRecordContext.Provider
      value={{
        toggleCamera,
        toggleMicrophone,
        handleToggleCamera,
        handleCameraChange,
        handleAudioDeviceChange,
        handleResolutionChange,
        handleSelectedMediaSource,
        videoRef,
        turnOnCamera,
        turnOffCamera,
        devices,
        deviceMic,
        selectedCamera,
        selectedMicrophone,
        selectedResolution,
        selectedCounter,
        selectedMediaSource,
        setSelectedCamera,
        setSelectedMicrophone,
        setSelectedCounter,
        setSelectedMediaSource,
        hasPermission,
        audioStream,
        resolutions,
        isMicOn,
        error,
        setToggleCamera,
      }}
    >
      {children}
    </ScreenRecordContext.Provider>
  );
};

export const useScreenRecord = () => useContext(ScreenRecordContext);
