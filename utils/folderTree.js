//  This function recursively searches for a folder with a given id in a nested folder structure.
export const findFolderById = (id, folders) => {
  // Guard clause to handle undefined, null, or non-array values for folders
  if (!Array.isArray(folders) || folders.length === 0) {
    return null; // Return null if folders is not a valid array or is empty
  }

  for (const folder of folders) {
    if (folder.id === id) {
      return folder;
    }
    if (
      folder.children &&
      Array.isArray(folder.children) &&
      folder.children.length > 0
    ) {
      const found = findFolderById(id, folder.children);
      if (found) return found;
    }
  }
  return null;
};

//  This function checks if a folder with a given folderId exists within the subtree of a folder identified by parentId.
const isInSubtree = (folderId, parentId, folders) => {
  const parentFolder = findFolderById(parentId, folders);
  if (!parentFolder || !parentFolder.children) return false;

  const stack = [...parentFolder.children];
  while (stack.length) {
    const current = stack.pop();
    if (current.id === folderId) return true;
    if (current.children && current.children.length > 0) {
      stack.push(...current.children);
    }
  }
  return false;
};

//  This function determines whether moving a folder is disallowed.
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
