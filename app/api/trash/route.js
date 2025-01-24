import prisma from "@/utils/db";
import { createSuccessResponse, errorResponse } from "@/utils/errorMessage";
import { auth } from "@clerk/nextjs/server";

export const DELETE = async () => {
  const { userId } = await auth();
  try {
    if (!userId) {
      throw new Error("something went wrong", 400);
    }
    // Delete all trashed folder for logged in user
    const deleteFolders = await prisma.folder.deleteMany({
      where: { userId, trashed: true },
    });
    // Delete all trashed folder for logged in user
    const deleteDocuments = await prisma.document.deleteMany({
      where: { userId, trashed: true },
    });
    if (deleteFolders || deleteDocuments) {
      return createSuccessResponse("Trash cleared successfully.");
    }
  } catch (error) {
    console.log(error);
    return errorResponse(
      "An error occurred while trying to delete the item. Please try again later.",
      500
    );
  }
};

export const PUT = async (req) => {
  const body = await req.json();
  try {
    const data = await moveItemsToTrash(body);
    console.log(data);
    return createSuccessResponse("Trash cleared successfully.");
  } catch (error) {
    return errorResponse(
      "An error occurred while trying to move the item(s). Please try again later.",
      500
    );
  }
};

const moveItemsToTrash = async (items) => {
  const groupedItems = items.reduce(
    (acc, item) => {
      acc[item.docType].push(item.id);
      return acc;
    },
    { folder: [], document: [] }
  );

  try {
    // Delete items from the 'folder' collection
    if (groupedItems.folder.length > 0) {
      await prisma.folder.updateMany({
        where: { id: { in: groupedItems.folder } },
        data: {
          trashed: true,
        },
      });
    }

    // Delete items from the 'document' collection
    if (groupedItems.document.length > 0) {
      await prisma.document.updateMany({
        where: { id: { in: groupedItems.document } },
        data: {
          trashed: true,
        },
      });
    }

    console.log("Deletion complete!");
    return "items moved to trash";
  } catch (error) {
    console.error("Error deleting items:", error);
  }
};
