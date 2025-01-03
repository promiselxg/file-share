import { Checkbox } from "@/components/ui/checkbox";
import { useFolderCRUD } from "@/context/folder.context";
import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdOutlineRestorePage } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { cn } from "@/lib/utils";
import { useDialog } from "@/context/Dialog.context";
import { FiVideo } from "react-icons/fi";

const ImageVideoDelete = ({ data }) => {
  const { checkedCount, checkedStates, handleCheckboxChange } = useFolderCRUD();
  const { openDialog } = useDialog();
  return (
    <>
      {data?.map((item) => {
        const isChecked = !!checkedStates[item.id];
        return (
          <div key={item.id}>
            <div
              className={cn(
                `${
                  isChecked
                    ? "border-[--primary-btn] border-[1px] bg-[#010b22]"
                    : "border-[#434343] border-[1px] bg-current"
                } trash-folder w-full h-[200px] rounded-[8px] cursor-pointer relative overflow-hidden link-transition`
              )}
            >
              <div
                className={cn(
                  `relative overflow-hidden transition-all delay-200 duration-200 link-transition`
                )}
              >
                <Image
                  src={item?.img}
                  width={500}
                  height={200}
                  alt="video thumbnail"
                  className={cn(
                    `${
                      isChecked
                        ? "scale-75 object-cover"
                        : "scale-100 object-cover"
                    } w-full h-[200px] transition-all delay-200 duration-200 link-transition`
                  )}
                />
                {item?.type === "video" && (
                  <div className="absolute bottom-5 right-2 bg-[rgba(0,0,0,.8)] text-white text-sm py-[2px] px-[8px] rounded-[5px] font-[600]">
                    {item.time}
                  </div>
                )}
              </div>
              <div
                className={cn(
                  `${
                    !isChecked && "imageVideoControls"
                  } absolute top-0 bottom-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center text-white z-40 w-full overflow-hidden`
                )}
              >
                <div className="flex flex-col ">
                  <div className="absolute top-3 left-3">
                    <Checkbox
                      className="text-[25px] w-[25px] h-[25px] bg-[#000] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white border border-[--gray] hover:border-[whitesmoke] link-transition"
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(item.id, checked)
                      }
                    />
                  </div>
                  {checkedCount < 1 && (
                    <div className="flex items-center justify-center gap-8 h-[200px] ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <MdOutlineRestorePage
                              className=" cursor-pointer"
                              size={35}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-[--gray]">
                            Restore
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <GoTrash
                              className=" cursor-pointer"
                              size={35}
                              onClick={() =>
                                openDialog(
                                  "alert",
                                  "Are you sure you want to permanently delete the selected item(s)?"
                                )
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-[--gray]">
                            Delete forever
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="py-2 text-[--gray]">
              <h1 className="text-white text-[16px] leading-[1.2]">
                {item?.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <FiVideo size={14} />
                <span className="text-[--gray] text-[12px]">{item?.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ImageVideoDelete;
