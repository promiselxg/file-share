/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { useToast } from "@/hooks/use-toast";
import { apiCall } from "@/utils/apiCall";
import { uploadImagesToCloudinary } from "@/utils/uploadImageToCloudinary";
import React, { createContext, useContext, useState } from "react";
import { useDocument } from "./document.context";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Create context
const ImageContext = createContext();

// Provider component
export const ImageProvider = ({ children }) => {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("pending");
  const { setDocuments } = useDocument();

  // Handle Image Change
  const handleImageChange = (e, maxFiles) => {
    if (!e?.target?.files) return;

    // Clear previous selections
    setSelectedImages([]);
    setFiles([]);

    const filesArray = Array.from(e.target.files);
    const selectedFiles = [];
    const fileURLs = [];

    if (filesArray.length > maxFiles) {
      toast({
        variant: "destructive",
        title: "File Length Error",
        description: `You can only upload up to ${maxFiles} files simultaneously.`,
      });
      e.target.value = "";
      return;
    }

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

  const handleImageUpload = async (files) => {
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/promiselxg/image/upload";
    const upload_preset = "file-share";
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

    try {
      setLoading(true);
      const { photos } = await uploadImagesToCloudinary(
        files,
        cloudinaryUrl,
        upload_preset,
        apiKey
      );
      setUploadStatus("completed");
      const response = await apiCall("post", `/api/image`, { photos });
      const uploadedDocuments = response?.data || [];
      setDocuments((prevDocuments) => [...uploadedDocuments, ...prevDocuments]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        uploadStatus,
        loading,
        handleImageChange,
        removeSelectedImage,
        handleImageUpload,
        setSelectedImages,
        setUploadStatus,
        setFiles,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  return useContext(ImageContext);
};
