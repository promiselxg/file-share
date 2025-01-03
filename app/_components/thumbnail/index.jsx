import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React, { useEffect } from "react";
import { RiExternalLinkLine } from "react-icons/ri";

import { FiEdit3, FiMoreHorizontal, FiVideo } from "react-icons/fi";
import { LinkWithIcon } from "../nav/sideBarNav";
import { GrLink } from "react-icons/gr";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { LuCopyCheck } from "react-icons/lu";
import { BsArrowRightSquare, BsTrash3 } from "react-icons/bs";
import { useDialog } from "@/context/Dialog.context";
import { ImageVideoMenuItem } from "../menuItem/menu";
import { useFolderCRUD } from "@/context/folder.context";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const ThumbNail = ({ data }) => {
  const {
    openRenameDialog,
    openDialog,
    setSharedData,
    handleViewSelectedDocument,
    openMoveFolderDialog,
  } = useDialog();
  const { checkedCount, checkedStates, handleCheckboxChange } = useFolderCRUD();

  useEffect(() => {
    setSharedData(data);
  }, [data, setSharedData]);

  return (
    <>
      {data?.map((item) => {
        const isChecked = !!checkedStates[item.id];
        return (
          <ContextMenu className="flex flex-col" key={item?.id}>
            {/* Context Menu Trigger */}
            <ContextMenuTrigger>
              <div
                className={cn(
                  `${
                    isChecked
                      ? "border border-[--primary-btn] checkedBoxShadow bg-[--sidebar-link-active-bg]"
                      : "border border-[--folder-border-color]"
                  } w-full overflow-hidden h-[200px] rounded-[8px]  relative imgThubnail group cursor-pointer folder transition-all delay-200 duration-200 link-transition`
                )}
                onClick={() =>
                  checkedCount < 1 && handleViewSelectedDocument(item)
                }
              >
                <Image
                  src={item?.mediaInfo?.mediaUrl}
                  width={500}
                  height={200}
                  alt={item.title}
                  className={cn(
                    `${
                      isChecked
                        ? "scale-75 object-cover"
                        : "scale-100 object-cover"
                    } w-full h-[200px] transition-all delay-200 duration-200 link-transition`
                  )}
                />
                {item?.mediaInfo?.mediaDuration && (
                  <div className="absolute bottom-5 right-2 bg-[rgba(0,0,0,.8)] text-white text-sm py-[2px] px-[8px] rounded-[5px] font-[600]">
                    {item?.mediaInfo?.mediaDuration}
                  </div>
                )}
                <div className="link-transition">
                  <div
                    class={cn(
                      `absolute top-0 bottom-0 inset-0 bg-overlay opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 ${
                        checkedCount > 0
                          ? "bg-[--sidebar-link-active-bg]"
                          : "bg-[rgba(0,0,0,.5)] "
                      } `
                    )}
                  ></div>

                  {checkedCount < 1 && (
                    <Popover className="w-full">
                      <PopoverTrigger
                        className="flex items-center gap-[4px] text-[--sidebar-link-color] text-[14px] absolute top-1 right-1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span className="hover:bg-[--folder-bg] p-2 rounded-[8px] horizontalIcon opacity-0">
                          <FiMoreHorizontal size={20} className="text-white" />
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] z-10">
                        <ImageVideoMenuItem
                          openDialog={openDialog}
                          openRenameDialog={openRenameDialog}
                          openMoveFolderDialog={openMoveFolderDialog}
                          handleCheckboxChange={handleCheckboxChange}
                          id={item.id}
                          title={item.title}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                  {checkedCount > 0 && (
                    <div
                      className={cn(
                        `${isChecked ? "" : "folderBtn"} absolute top-4 right-5`
                      )}
                    >
                      <Checkbox
                        className="text-[25px] w-[25px] h-[25px] rounded-[5px]  bg-[#fff] transition-all delay-75 duration-100 z-10 data-[state=checked]:bg-[--primary-btn] data-[state=checked]:text-white border border-[--gray] hover:border-[whitesmoke] link-transition"
                        checked={isChecked}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(item.id, checked)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="py-2 text-[--gray]">
                <h1 className="text-white text-sm leading-tight">
                  {item?.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <FiVideo size={14} />
                  <span className="text-[--gray] text-[12px]">
                    {item?.createdAt}
                  </span>
                </div>
              </div>
            </ContextMenuTrigger>
            {checkedCount < 1 && (
              <ContextMenuContent className="flex bg-[--dialog-bg] shadow-md border-none w-[220px] flex-col text-[--sidebar-link-color] p-2">
                <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
                  <LinkWithIcon
                    Icon={<FiEdit3 size={20} />}
                    name="Rename"
                    color="text-[--popover-text-color]"
                    onClick={() =>
                      openRenameDialog("rename", item?.id, item?.title)
                    }
                  />
                </ContextMenuItem>
                <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
                  <LinkWithIcon
                    Icon={<GrLink size={20} />}
                    name="Copy sharable link"
                    color="text-[--popover-text-color]"
                  />
                </ContextMenuItem>
                <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
                  <LinkWithIcon
                    Icon={<BsArrowRightSquare size={20} />}
                    name="Move"
                    color="text-[--popover-text-color]"
                    onClick={() =>
                      openMoveFolderDialog("moveFolder", item?.id, "image")
                    }
                  />
                </ContextMenuItem>
                <ContextMenuItem className="flex w-full hover:bg-[--folder-bg]   rounded-[5px] link-transition p-0">
                  <LinkWithIcon
                    Icon={<LuCopyCheck size={20} />}
                    name="Select multiple items"
                    color="text-[--popover-text-color]"
                    onClick={() => handleCheckboxChange(item?.id, true)}
                  />
                </ContextMenuItem>
                <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] rounded-[5px] link-transition p-0">
                  <LinkWithIcon
                    Icon={<RiExternalLinkLine size={20} />}
                    name="Open in new tab"
                    color="text-[--popover-text-color]"
                  />
                </ContextMenuItem>
                <ContextMenuItem className="flex w-full hover:bg-[--folder-bg] link-transition p-0 outline-none border-none rounded-[5px]">
                  <LinkWithIcon
                    color="text-[--bg-red] hover:text-white "
                    Icon={<BsTrash3 size={20} />}
                    name="Remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDialog(
                        "alert",
                        "Are you sure you want to remove this item?",
                        ""
                      );
                    }}
                  />
                </ContextMenuItem>
              </ContextMenuContent>
            )}
          </ContextMenu>
        );
      })}
    </>
  );
};

export default ThumbNail;
