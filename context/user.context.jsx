"use client";

import { createContext, useContext, useState } from "react";

const UserCRUDOperation = createContext();

export const UserCRUDProvider = ({ children }) => {
  const [folder, setFolder] = useState([
    {
      name: "My items",
      id: "34567d",
    },
    {
      name: "folder 8",
      id: "1",
      subfolders: [
        {
          name: "bbbb",
          id: "erwwr",
          parentFolderId: "1",
          subfolders: [
            {
              name: "mm",
              id: "errto",
              parentFolderId: "erwwr",
            },
          ],
        },
      ],
    },
    {
      name: "Untitled Folder",
      id: "345",
      subfolders: [],
    },
  ]);

  /**
   * Add a new folder to the folder structure.
   * @param {Object} newFolder - The new folder object to add.
   * @param {string} [parentId] - The ID of the folder to add a subfolder to (optional).
   */
  const addFolder = (newFolder, parentId = "") => {
    if (!parentId) {
      // If no parentId, add as a top-level folder
      setFolder((prev) => [newFolder, ...prev]);
    } else {
      // If parentId exists, add as a subfolder
      const addFolderRecursive = (folders) => {
        return folders.map((folder) => {
          if (folder.id === parentId) {
            // Add new folder to the `subfolders` array
            const updatedSubfolders = folder.subfolders
              ? [...folder.subfolders, newFolder]
              : [newFolder];
            return { ...folder, subfolders: updatedSubfolders };
          }

          // Recursively check subfolders
          if (folder.subfolders) {
            return {
              ...folder,
              subfolders: addFolderRecursive(folder.subfolders),
            };
          }

          return folder;
        });
      };

      setFolder((prev) => addFolderRecursive(prev));
    }
  };

  return (
    <UserCRUDOperation.Provider value={{ folder, setFolder, addFolder }}>
      {children}
    </UserCRUDOperation.Provider>
  );
};

export const useUserData = () => useContext(UserCRUDOperation);
