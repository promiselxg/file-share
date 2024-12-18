"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { FiEye, FiTrash2 } from "react-icons/fi";
import CustomModal from "../modal";
import { useDialog } from "@/context/Dialog.context";

const SelectedImagesDisplay = ({ source, onRemoveImage }) => {
  return source?.map((image, i) => (
    <div
      className="w-full h-[60px] rounded-md relative mb-5   bg-contain"
      key={i}
    >
      {type === "file" && (
        <X
          className="absolute -top-2 -right-2 bg-[rgba(0,0,0,0.9)] rounded-full text-white p-[5px]  cursor-pointer"
          onClick={() => onRemoveImage(i)}
        />
      )}
      <Image
        src={image}
        alt={`images ${i}`}
        width={200}
        height={100}
        className="object-contain h-[60px]"
      />
    </div>
  ));
};

export const renderImages = (source, type, onRemoveImage, files) => {
  const { dialogs, openDialog, closeDialog } = useDialog();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");

  return source?.map((image, i) => (
    <div
      className="w-full h-[110px] rounded-md relative mb-5 bg-contain imageWrapper link-transition overflow-hidden"
      key={i}
    >
      {type === "file" && (
        <div className="imageBtn">
          <div className="absolute w-full top-0 bottom-0 bg-[rgba(0,0,0,0.5)]"></div>
          <div className="absolute left-[30%] bottom-[40%] text-white cursor-pointer flex items-center gap-3 justify-center z-10">
            <FiEye
              className="cursor-pointer"
              size={20}
              onClick={() => {
                openDialog("showImage"),
                  setSelectedImage(image),
                  setSelectedImageTitle(files[i].name);
              }}
            />
            <FiTrash2
              className="cursor-pointer"
              onClick={() => onRemoveImage(i)}
              size={20}
            />
          </div>
        </div>
      )}

      <Image
        src={image}
        alt={`images ${i}`}
        width={200}
        height={200}
        className="object-cover h-[110px] border-[2px] border-[--primary-btn] p-[2px] rounded-[5px] cursor-pointer"
      />
      <CustomModal
        className="w-[100px]"
        heading={selectedImageTitle}
        isOpen={dialogs.showImage}
        openDialog={() => openDialog("showImage")}
        closeDialog={() => closeDialog("showImage")}
      >
        <Image
          src={selectedImage}
          width={200}
          height={200}
          alt={selectedImageTitle}
          className="w-full object-cover"
        />
      </CustomModal>
    </div>
  ));
};

export default SelectedImagesDisplay;
