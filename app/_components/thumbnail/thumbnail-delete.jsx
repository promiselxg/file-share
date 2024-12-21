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

const ImageVideoDelete = ({ data }) => {
  const { checkedCount, checkedStates, handleCheckboxChange } = useFolderCRUD();
  return (
    <>
      {data?.map((item) => {
        const isChecked = !!checkedStates[item.id];
        return (
          <div
            className={cn(
              `${
                isChecked
                  ? "border-[--primary-btn] border-[2px] bg-[#010b22]"
                  : "border-[#434343] border-[2px] bg-current"
              } trash-folder w-full h-[200px] rounded-[8px] cursor-pointer relative overflow-hidden link-transition`
            )}
            key={item?.id}
          >
            <div
              className={cn(
                `${
                  isChecked ? "p-8" : "p-0"
                } relative overflow-hidden transition-all delay-200 duration-200 link-transition`
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
                      ? "h-[130px] object-contain"
                      : "h-[200px] object-cover"
                  } w-full  z-10 `
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
                          <GoTrash className=" cursor-pointer" size={35} />
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
        );
      })}
    </>
  );
};

export default ImageVideoDelete;
