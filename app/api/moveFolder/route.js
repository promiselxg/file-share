import prisma from "@/utils/db";
import { errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { folderToMoveId: folderId, newFolderParentId } = body;

  if (!folderId || !newFolderParentId) {
    throw new Error("Invalid request", 400);
  }

  try {
    // Find the folder to move and the new parent folder
    const folderToMove = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { parent: true },
    });

    const newParentFolder = await prisma.folder.findUnique({
      where: { id: newFolderParentId },
      include: { children: true },
    });

    if (!folderToMove || !newParentFolder) {
      throw new Error("Folder to move or new parent folder not found", 400);
    }

    // If the folder is already under the new parent, no need to update
    if (folderToMove.parentId === newFolderParentId) {
      throw new Error("Folder is already under the specified parent", 400);
    }

    // Ensure folderToMove is removed from its current parent's children
    if (folderToMove.parentId) {
      await prisma.folder.update({
        where: { id: folderToMove.parentId },
        data: {
          children: {
            disconnect: { id: folderId },
          },
        },
      });
    }

    // Update the parentId of the folder being moved
    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: {
        parentId: newFolderParentId,
      },
    });

    // Add the folder to the new parent's children
    await prisma.folder.update({
      where: { id: newFolderParentId },
      data: {
        children: {
          connect: { id: folderId },
        },
      },
    });

    return NextResponse.json(
      {
        updatedFolder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Internal server Error", error);
  }
};
