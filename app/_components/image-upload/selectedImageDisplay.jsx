"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import CustomModal from "../modal/custom.modal";
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

const ImageCard = ({ image, type, onRemoveImage, index, fileName }) => {
  const { dialogs, openDialog, closeDialog } = useDialog();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");

  const handleViewImage = () => {
    setSelectedImage(image);
    setSelectedImageTitle(fileName);
    openDialog("showImage");
  };

  return (
    <div
      className="w-full h-[110px] rounded-md relative mb-5 bg-contain imageWrapper link-transition overflow-hidden"
      key={index}
    >
      {type === "file" && (
        <div className="imageBtn">
          <div className="absolute w-full top-0 bottom-0 bg-[rgba(0,0,0,0.5)]"></div>
          <div className="absolute left-[30%] bottom-[40%] text-white cursor-pointer flex items-center gap-3 justify-center z-10">
            <FiEye
              className="cursor-pointer"
              size={20}
              onClick={handleViewImage}
            />
            <FiTrash2
              className="cursor-pointer"
              onClick={() => onRemoveImage(index)}
              size={20}
            />
          </div>
        </div>
      )}

      <Image
        src={image}
        alt={`Image ${index}`}
        width={200}
        height={200}
        className="object-cover h-[110px] border-[2px] border-[--primary-btn] p-[2px] rounded-[5px] cursor-pointer"
      />

      <CustomModal
        className="w-[400px] h-fit"
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
  );
};

export const RenderImages = ({
  source,
  type,
  onRemoveImage,
  files,
  handleImageChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {source?.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          type={type}
          onRemoveImage={onRemoveImage}
          index={index}
          fileName={files[index]?.name}
        />
      ))}
      <div className="h-[110px] shared-folder-empty border border-dashed p-2 rounded-[8px] border-[--sidebar-link-color] w-full cursor-pointer items-center flex justify-center">
        <div className="flex flex-col  cursor-pointer justify-center items-center">
          <label
            htmlFor="files"
            className="w-full cursor-pointer flex justify-center flex-col items-center leading-tight"
          >
            <FiPlus
              size={35}
              className="cursor-pointer text-[--sidebar-link-color]"
            />
            <div className="flex flex-col justify-center items-center leading-tight">
              <p className="text-sm text-[--sidebar-link-color]">Add image</p>
            </div>
          </label>
        </div>
        <input
          type="file"
          name="files"
          id="files"
          accept="image/png, image/gif, image/jpeg"
          onChange={(event) => handleImageChange(event, 8)}
          multiple
          className="hidden"
        />
      </div>
    </div>
  );
};

export default SelectedImagesDisplay;
