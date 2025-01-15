import prisma from "@/utils/db";
import { createSuccessResponse, errorResponse } from "@/utils/errorMessage";

export const DELETE = async () => {
  const userId = "dyuosuryro";

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
