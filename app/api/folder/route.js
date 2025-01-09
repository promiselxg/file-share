import prisma from "@/utils/db";
import { createErrorResponse, errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const POST = async (req) => {
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
    return errorResponse("Something went wrong!", error);
  }
};

export const GET = async (req) => {
  const query = req.nextUrl.searchParams;
  const queryType = query.get("type");
  let response;

  try {
    if (queryType === "withChildren") {
      response = await fetchFolderWithChildren();
    } else if (queryType === "favorite") {
      response = await fetchFavoriteFolders();
    } else {
      response = await fetchParentFolders();
    }

    return NextResponse.json(
      {
        count: response.length,
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    return createErrorResponse(
      error.message || "Something went wrong!",
      error,
      400
    );
  }
};

export const PUT = async (req) => {
  const body = await req.json();
  try {
    if (!body.folderId) {
      return errorResponse("Folder ID is required");
    }

    const data = await toggleFolderFavoriteStatus(body);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return errorResponse("Something went wrong!", error);
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

const toggleFolderFavoriteStatus = async (body) => {
  const folder = await prisma.folder.findUnique({
    where: { id: body?.folderId },
    select: { favorite: true },
  });

  if (!folder) {
    throw new Error("Folder not found");
  }

  const toggleFavorite = await prisma.folder.update({
    where: { id: body?.folderId },
    data: {
      favorite: !folder.favorite,
    },
    select: {
      favorite: true,
      name: true,
      id: true,
    },
  });

  return toggleFavorite;
};

const fetchFavoriteFolders = async () => {
  const favoriteFolders = await prisma.folder.findMany({
    where: {
      favorite: true,
    },
    select: {
      id: true,
      name: true,
      favorite: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return favoriteFolders;
};
