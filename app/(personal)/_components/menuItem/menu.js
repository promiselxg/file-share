import { BsTrash3 } from "react-icons/bs";
import { FiEdit3, FiStar } from "react-icons/fi";
import { GrLink } from "react-icons/gr";
import { LuCopyCheck } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";
import { LinkWithIcon } from "../nav/sideBarNav";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { RiShareForwardLine } from "react-icons/ri";
import { CgPushDown } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import { MdDriveFileMoveOutline } from "react-icons/md";

export const ImageVideoMenuItem = ({
  id,
  title,
  openRenameDialog,
  openDialog,
  openMoveFolderDialog,
  handleCheckboxChange,
  handleDuplicate,
  mediaType,
}) => {
  const menuItem = [
    {
      name: "Rename",
      icon: <FiEdit3 size={20} />,
      action: (e) => {
        e.stopPropagation();
        openRenameDialog("rename", id, title);
      },
    },
    {
      name: "Copy sharable link",
      icon: <GrLink size={20} />,
      action: (e) => {
        e.stopPropagation();
      },
    },
    {
      name: "Move",
      icon: <MdDriveFileMoveOutline size={20} />,
      action: (e) => {
        e.stopPropagation();
        openMoveFolderDialog("moveFolder", id, "image");
      },
    },
    {
      name: "Duplicate",
      icon: <HiOutlineDocumentDuplicate size={20} />,
      image: `${mediaType}`,
      action: (e) => {
        e.stopPropagation();
        handleDuplicate(id);
      },
    },
    {
      name: "Select multiple items",
      icon: <LuCopyCheck size={20} />,
      action: (e) => {
        e.stopPropagation();
        handleCheckboxChange(id, true);
      },
    },
    { name: "Open in new tab", icon: <RiExternalLinkLine size={20} /> },
    {
      name: "Remove",
      icon: <BsTrash3 size={20} />,
      color: "text-[--bg-red] hover:text-white",
      action: (e) => {
        e.stopPropagation();
        openDialog("alert", "Are you sure you want to remove this item?", "");
      },
    },
  ];

  return (
    <ul className="flex flex-col w-full">
      {menuItem.map((item, index) => {
        if (item.image !== "video") {
          return (
            <li
              key={index}
              className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition"
            >
              <LinkWithIcon
                Icon={item?.icon}
                name={item.name}
                color={item?.color || "text-[--popover-text-color]"}
                onClick={item.action}
              />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export const FolderMenuItem = ({
  id,
  title,
  openRenameDialog,
  openMoveFolderDialog,
  openDownloadFolderDialog,
  handleCheckboxChange,
  openDialog,
}) => {
  const menuItem = [
    {
      name: "Share",
      icon: <RiShareForwardLine size={20} />,
      action: (e) => {
        e.stopPropagation();
        openDialog("share");
      },
    },
    {
      name: "Rename",
      icon: <FiEdit3 size={20} />,
      action: (e) => {
        e.stopPropagation();
        openRenameDialog("rename", id, title);
      },
    },
    {
      name: "Move",
      icon: <MdDriveFileMoveOutline size={20} />,
      action: (e) => {
        e.stopPropagation();
        openMoveFolderDialog("moveFolder", id);
      },
    },
    {
      name: "Download",
      icon: <CgPushDown size={20} />,
      action: (e) => {
        e.stopPropagation();
        openDownloadFolderDialog("download", id);
      },
    },
    { name: "Add to starred", icon: <FiStar size={20} /> },
    {
      name: "Multiple select",
      icon: <LuCopyCheck size={20} />,
      action: (e) => {
        e.stopPropagation();
        handleCheckboxChange(id, true);
      },
    },
    {
      name: "Remove",
      icon: <BsTrash3 size={20} />,
      color: "text-[--bg-red] hover:text-white",
      action: (e) => {
        e.stopPropagation();
        openDialog("alert", "Are you sure you want to remove this item?", "");
      },
    },
  ];

  return (
    <ul className="flex flex-col w-full">
      {menuItem.map((item, index) => (
        <li
          key={index}
          className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition"
        >
          <LinkWithIcon
            Icon={item?.icon}
            name={item.name}
            color={item?.color || "text-[--popover-text-color]"}
            onClick={item.action}
          />
        </li>
      ))}
    </ul>
  );
};

export const RouteMenuItem = ({
  id,
  title,
  openRenameDialog,
  openDownloadFolderDialog,
  openDialog,
  openMoveFolderDialog,
}) => {
  const menuItem = [
    {
      name: "Rename",
      icon: <FiEdit3 size={20} />,
      action: (e) => {
        e.stopPropagation();
        openRenameDialog("rename", id, title);
      },
    },
    {
      name: "Edit description",
      icon: <GrNotes size={20} />,
      action: (e) => {
        e.stopPropagation();
        openRenameDialog("editDescription", id, title);
      },
    },
    {
      name: "Move",
      icon: <MdDriveFileMoveOutline size={20} />,
      action: (e) => {
        e.stopPropagation();
        openMoveFolderDialog("moveFolder", id);
      },
    },
    {
      name: "Download",
      icon: <CgPushDown size={20} />,
      action: (e) => {
        e.stopPropagation();
        openDownloadFolderDialog("download", id);
      },
    },
    { name: "Add to starred", icon: <FiStar size={20} /> },
    {
      name: "Remove",
      icon: <BsTrash3 size={20} />,
      color: "text-[--bg-red] hover:text-white",
      action: (e) => {
        e.stopPropagation();
        openDialog("alert", "Are you sure you want to remove this item?", "");
      },
    },
  ];

  return (
    <ul className="flex flex-col w-full">
      {menuItem.map((item, index) => (
        <li
          key={index}
          className="flex w-full text-[--sidebar-link-active-text] hover:bg-[--folder-bg] rounded-[5px] link-transition"
        >
          <LinkWithIcon
            Icon={item?.icon}
            name={item.name}
            color={item?.color || "text-[--popover-text-color]"}
            onClick={item.action}
          />
        </li>
      ))}
    </ul>
  );
};
