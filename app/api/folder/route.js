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

  const userId = "user123";
  try {
    if (queryType === "withChildren") {
      response = await fetchFolderWithChildren(userId);
    } else if (queryType === "favorite") {
      response = await fetchFavoriteFolders(userId);
    } else {
      response = await fetchParentFolders(userId);
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
  let data;
  try {
    if (!body.folderId) {
      return errorResponse("Folder ID is required");
    }
    if (body.action === "trash") {
      data = await moveFolderToTrash(body?.folderId);
    } else {
      data = await toggleFolderFavoriteStatus(body);
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return errorResponse("Something went wrong!", error);
  }
};

const fetchFolderWithChildren = async (userId) => {
  // Fetch all folders (including those with parent-child relationships)
  const folders = await prisma.folder.findMany({
    //  filter => don't include delted folders (trash  = true)
    where: {
      userId,
      OR: [
        {
          trashed: {
            isSet: false,
          },
        },
      ],
    },
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

const fetchParentFolders = async (userId) => {
  // Fetch only the parent folders (those with no parentId)
  const parentFolders = await prisma.folder.findMany({
    where: {
      userId,
      AND: [
        {
          parentId: {
            isSet: false,
          },
        },
        {
          trashed: {
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

const fetchFavoriteFolders = async (userId) => {
  const favoriteFolders = await prisma.folder.findMany({
    where: {
      favorite: true,
      userId,
    },
    select: {
      id: true,
      name: true,
      userId: true,
      favorite: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return favoriteFolders;
};

const moveFolderToTrash = async (folderId) => {
  if (!isIdValid(folderId)) {
    return errorResponse("Invalid Request ID", 400);
  }
  const folderExist = await prisma.folder.findUnique({
    where: {
      id: folderId,
      OR: [
        {
          trashed: null,
        },
        {
          trashed: {
            isSet: false,
          },
        },
      ],
    },
  });

  if (!folderExist) {
    return errorResponse(
      "The folder you are trying to delete does not exist.",
      400
    );
  }
  const moveToTrash = await prisma.folder.update({
    where: { id: folderId },
    data: {
      trashed: true,
    },
  });

  return moveToTrash;
};

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
