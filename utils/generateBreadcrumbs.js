// function buildBreadcrumb(folder, parentPath = "") {
//   const currentPath = parentPath
//     ? `${parentPath} > ${folder.name}`
//     : folder.name;
//   const breadcrumbs = [];

//   if (folder.children && folder.children.length > 0) {
//     folder.children.forEach((child) => {
//       breadcrumbs.push(...buildBreadcrumb(child, currentPath));
//     });
//   } else {
//     breadcrumbs.push(currentPath);
//   }

//   return breadcrumbs;
// }

// export function generateBreadcrumbs(response) {
//   const breadcrumbs = [];
//   response?.children?.forEach((folder) => {
//     breadcrumbs.push(...buildBreadcrumb(folder));
//   });
//   return breadcrumbs;
// }
// function buildBreadcrumb(folder, currentFolder, parentPath = "") {
//   const currentPath = parentPath
//     ? `${parentPath} > ${folder.name}`
//     : folder.name;

//   // Check if the current folder is the clicked folder
//   if (folder.id === currentFolder) {
//     return [currentPath];
//   }

//   const breadcrumbs = [];

//   if (folder.children && folder.children.length > 0) {
//     for (const child of folder.children) {
//       const result = buildBreadcrumb(child, currentFolder, currentPath);
//       if (result.length > 0) {
//         return result; // Stop further recursion once the path is found
//       }
//     }
//   }

//   return breadcrumbs;
// }

// export function generateBreadcrumbs(response, currentFolder) {
//   if (!response || !currentFolder) {
//     return [];
//   }

//   const breadcrumbs = [];

//   response.children?.forEach((folder) => {
//     const result = buildBreadcrumb(folder, currentFolder);
//     if (result.length > 0) {
//       breadcrumbs.push(...result);
//     }
//   });

//   return breadcrumbs;
// }
export function generateBreadcrumb(folder, targetId) {
  // We need to trace the parent and current folder to generate the breadcrumb
  const breadcrumb = [];

  let currentFolder = folder;

  // Collect all the parent folders in the breadcrumb until we reach the targetId
  while (currentFolder) {
    breadcrumb.unshift({
      name: currentFolder.name,
      id: currentFolder.id,
    }); // Add current folder's name and id to the beginning of the breadcrumb

    // Move to the parent folder
    currentFolder = currentFolder.parent || null; // If there's no parent, stop
  }

  return breadcrumb; // Return the breadcrumb as an array of objects
}
