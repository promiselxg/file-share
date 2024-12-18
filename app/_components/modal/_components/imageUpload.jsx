import { useImageContext } from "@/context/imageUpload.context";
import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { renderImages } from "../../image-upload/selectedImageDisplay";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const ImageUpload = () => {
  const { files, selectedImages, handleImageChange, removeSelectedImage } =
    useImageContext();
  return (
    <>
      <div className="w-full flex mt-2">
        {selectedImages.length < 1 ? (
          <div className="shared-folder-empty border border-dashed p-[60px] rounded-[8px] border-[--sidebar-link-color] w-full cursor-pointer">
            <div className="flex flex-col  cursor-pointer justify-center">
              <label
                htmlFor="files"
                className="w-full cursor-pointer flex justify-center flex-col items-center"
              >
                <BiImageAdd
                  size={80}
                  className="cursor-pointer text-[--sidebar-link-color]"
                />
                <div className="my-2 flex flex-col justify-center items-center leading-tight">
                  <p className="text-sm text-[--sidebar-link-color]">
                    Drag and Drop images here or{" "}
                    <span className="text-[--primary-btn] hover:text-[rgba(23,125,220,.8)] link-transition">
                      browse
                    </span>
                  </p>
                  <p className="text-[12px] text-[--sidebar-link-color]">
                    Supports: PNG, JPG
                  </p>
                </div>
              </label>
            </div>
            <input
              type="file"
              name="files"
              id="files"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImageChange}
              multiple
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="w-full grid md:grid-cols-3 grid-cols-3 gap-3">
              {renderImages(selectedImages, "file", removeSelectedImage, files)}
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
                      <p className="text-sm text-[--sidebar-link-color]">
                        Add image
                      </p>
                    </div>
                  </label>
                </div>
                <input
                  type="file"
                  name="files"
                  id="files"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleImageChange}
                  multiple
                  className="hidden"
                />
              </div>
            </div>
            <Button
              varient="ghost"
              className="w-full bg-[--primary-btn] hover:bg-[--primary-btn-hover] link-transition mt-5"
            >
              Start upload ({selectedImages?.length})
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
