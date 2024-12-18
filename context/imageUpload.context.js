/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useState } from "react";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Create context
const ImageContext = createContext();

// Provider component
export const ImageProvider = ({ children }) => {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Handle Image Change
  const handleImageChange = (e) => {
    if (!e?.target?.files) return;

    // Clear previous selections
    setSelectedImages([]);
    setFiles([]);

    const filesArray = Array.from(e.target.files);
    const selectedFiles = [];
    const fileURLs = [];

    filesArray.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        // File exceeds size limit
        toast({
          variant: "destructive",
          title: "File Size Error",
          description: `The file "${file.name}" exceeds the 5MB limit.`,
        });
      } else {
        // File size is valid
        selectedFiles.push(file);
        fileURLs.push(URL.createObjectURL(file));
      }
    });

    // Update state with valid files and their preview URLs
    setFiles(selectedFiles);
    const fileArray = selectedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => prevImages.concat(fileArray));

    // Revoke object URLs to free memory
    fileURLs.forEach(URL.revokeObjectURL);
  };

  // Remove a selected image
  const removeSelectedImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <ImageContext.Provider
      value={{
        files,
        selectedImages,
        handleImageChange,
        removeSelectedImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the image context
export const useImageContext = () => {
  return useContext(ImageContext);
};
