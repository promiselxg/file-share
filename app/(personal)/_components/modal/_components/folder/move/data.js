export const folderStructure = [
  {
    name: "My items",
    id: "34567d",
  },
  {
    name: "folder 9",
    id: "1",
    subfolders: [
      {
        name: "bbbb",
        id: "erwwr",
        parentFolderId: "1", // Points to "folder 8"
        subfolders: [
          {
            name: "mm",
            id: "errto",
            parentFolderId: "erwwr", // Points to "bbbb"
          },
        ],
      },
    ],
  },
  {
    name: "My Folder",
    id: "345",
    subfolders: [],
  },
];
