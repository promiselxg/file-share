//  This function recursively searches for a folder with a given id in a nested folder structure.
export const findFolderById = (id, folders) => {
  for (const folder of folders) {
    if (folder.id === id) {
      return folder;
    }
    if (folder.subfolders && folder.subfolders.length > 0) {
      const found = findFolderById(id, folder.subfolders);
      if (found) return found;
    }
  }
  return null;
};

//  This function checks if a folder with a given folderId exists within the subtree of a folder identified by parentId.
const isInSubtree = (folderId, parentId, folders) => {
  const parentFolder = findFolderById(parentId, folders);
  if (!parentFolder || !parentFolder.subfolders) return false;

  const stack = [...parentFolder.subfolders];
  while (stack.length) {
    const current = stack.pop();
    if (current.id === folderId) return true;
    if (current.subfolders && current.subfolders.length > 0) {
      stack.push(...current.subfolders);
    }
  }
  return false;
};

//  This function determines whether moving a folder is disallowed based on specific conditions.
export const isMoveDisabled = (
  selectedMoveFolderId,
  moveFolderId,
  folderStructure
) => {
  if (!selectedMoveFolderId) return true;
  if (
    selectedMoveFolderId === moveFolderId ||
    isInSubtree(selectedMoveFolderId, moveFolderId, folderStructure)
  ) {
    return true;
  }
  return false;
};
