import { useImageContext } from "@/context/imageUpload.context";
import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { RenderImages } from "../../../image-upload/selectedImageDisplay";
import { Button } from "@/components/ui/button";

const ImageUpload = () => {
  const { files, selectedImages, handleImageChange, removeSelectedImage } =
    useImageContext();
  return (
    <>
      <div className="w-full flex mt-2">
        {selectedImages.length < 1 ? (
          <div className="shared-folder-empty border border-dashed p-[50px] rounded-[8px] border-[--sidebar-link-color] w-full cursor-pointer">
            <div className="flex flex-col  cursor-pointer justify-center">
              <label
                htmlFor="files"
                className="w-full cursor-pointer flex justify-center flex-col items-center"
              >
                <BiImageAdd
                  size={80}
                  className="cursor-pointer text-[--sidebar-link-color]"
                />
                <div className="my-2 flex flex-col justify-center items-center leading-tight text-center">
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
              onChange={(event) => handleImageChange(event, 8)}
              multiple
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="w-full gap-3">
              <RenderImages
                source={selectedImages}
                type="file"
                onRemoveImage={removeSelectedImage}
                files={files}
                handleImageChange={handleImageChange}
              />
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
