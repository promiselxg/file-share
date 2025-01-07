import prisma from "@/utils/db";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const body = await req.json();
    const { parentId, name } = body;

    let createdFolder;

    if (parentId) {
      // Create subfolder if `parentId` is provided
      createdFolder = await prisma.folder.create({
        data: {
          name,
          userId: "user123", // Replace with actual userId
          parentId: parentId,
        },
      });
    } else {
      // Create a standalone folder
      createdFolder = await prisma.folder.create({
        data: {
          name,
          userId: "user123", // Replace with actual userId
        },
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: parentId
          ? "Subfolder created successfully"
          : "Folder created successfully",
        folder: createdFolder,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return errorResponse("Something went wrong!", error);
  }
};

export const GET = async (req) => {
  const query = req.nextUrl.searchParams;
  const queryType = query.get("type");
  let response; // Declare response variable outside the try block

  try {
    if (queryType === "withChildren") {
      response = await fetchFolderWithChildren();
    } else {
      response = await fetchParentFolders();
    }

    return NextResponse.json(
      {
        count: response.length,
        response,
      },
      { status: 200 }
    ); // Respond with JSON and status 200
  } catch (error) {
    return errorResponse("Something went wrong!", error); // Handle errors
  }
};

const fetchFolderWithChildren = async () => {
  // Fetch all folders (including those with parent-child relationships)
  const folders = await prisma.folder.findMany({
    where: {},
    include: {
      children: true, // Includes immediate subfolders (1 level of nesting)
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Recursive function to build the folder hierarchy
  const buildFolderHierarchy = (folders, parentId = null) => {
    return folders
      .filter((folder) => folder.parentId === parentId) // Get folders that are children of the given parentId
      .map((folder) => ({
        ...folder,
        children: buildFolderHierarchy(folders, folder.id), // Recursively get the subfolders
      }));
  };

  // Build the folder hierarchy starting from the root folders (those with no parentId)
  const folderHierarchy = buildFolderHierarchy(folders, null);

  return folderHierarchy;
};

const fetchParentFolders = async () => {
  // Fetch only the parent folders (those with no parentId)
  const parentFolders = await prisma.folder.findMany({
    where: {
      OR: [
        {
          parentId: null,
        },
        {
          parentId: {
            isSet: false,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return parentFolders;
};
