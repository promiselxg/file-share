import prisma from "@/utils/db";
import { createErrorResponse, errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

//const userId = "user123";
export const POST = async (req) => {
  const { userId } = await auth();

  // GET Logged In User Info
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User record not found.");
  }

  try {
    const body = await req.json();
    const { parentId, name } = body;

    // Check if the folder name already exists
    const folderExist = await prisma.folder.findFirst({
      where: { name },
    });

    if (folderExist) {
      throw new Error("Creating folder failed. Folder already exists.");
    }
    // Create the folder if it doesn't exist
    const createdFolder = await prisma.folder.create({
      data: {
        name,
        userId: user?.id,
        parentId: parentId || null,
        trashed: null,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: parentId
          ? "Subfolder created successfully"
          : "Folder created successfully",
        folder: createdFolder,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return createErrorResponse(
      error.message || "Something went wrong!",
      error,
      400
    );
  }
};

export const GET = async (req) => {
  const query = req.nextUrl.searchParams;
  const queryType = query.get("type");
  let response;

  const { userId } = await auth();
  // GET Logged In User Info
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User record not found.");
  }

  try {
    if (queryType === "withChildren") {
      response = await fetchFolderWithChildren(user?.id);
    } else if (queryType === "favorite") {
      response = await fetchFavoriteFolders(user?.id);
    } else if (queryType === "trash") {
      response = await fetchTrashFolders(user?.id);
    } else {
      response = await fetchParentFolders(user?.id);
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
      throw new Error("Folder ID is required", 400);
    }
    if (body.action === "trash") {
      data = await moveFolderToTrash(body?.folderId);
    } else if (body.action === "restore") {
      data = await restoreFolderFromTrash(body.folderId);
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
      children: true,
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
      parentId: null, // Parent folder is empty
      OR: [
        { trashed: { isSet: false } }, // Trashed is unset
        { trashed: null }, // Or trashed is null
      ],
    },
    include: {
      links: true,
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
  if (!userId) {
    throw new Error("Invalid userId provided.");
  }

  try {
    const favoriteFolders = await prisma.folder.findMany({
      where: {
        userId: userId,
        AND: [
          { favorite: true },
          {
            OR: [{ trashed: null }, { trashed: { isSet: false } }],
          },
        ],
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
  } catch (error) {
    console.error("Error fetching favorite folders:", error);
    throw new Error("Could not fetch favorite folders.");
  }
};

const moveFolderToTrash = async (folderId) => {
  if (!isIdValid(folderId)) {
    throw new Error("Invalid request", 400);
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
    throw new Error("The folder you are trying to delete does not exist.", 400);
  }
  const moveToTrash = await prisma.folder.update({
    where: { id: folderId },
    data: {
      trashed: true,
    },
  });

  return moveToTrash;
};

const restoreFolderFromTrash = async (folderId) => {
  if (!isIdValid(folderId)) {
    throw new Error("Folder ID is required", 400);
  }
  const isFound = await prisma.folder.findUnique({
    where: {
      userId,
      id: folderId,
      trashed: true,
    },
  });
  if (!isFound) {
    throw new Error(
      "The folder you are trying to restore does not exist.",
      400
    );
  }

  const restoreFolder = await prisma.folder.update({
    where: { userId, id: folderId },
    data: {
      trashed: null,
    },
  });
  restoreFolder;
};

const fetchTrashFolders = async (userId) => {
  const trashFolders = await prisma.folder.findMany({
    where: {
      userId,
      trashed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return trashFolders;
};

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
