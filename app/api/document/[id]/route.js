import { removeUploadedImage } from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { errorResponse, successResponse } from "@/utils/errorMessage";

export const DELETE = async (req, { params }) => {
  if (!isIdValid(params?.id)) {
    return errorResponse("Invalid Request ID", 400);
  }
  try {
    const document = await prisma.document.findUnique({
      where: { id: params.id },
    });
    if (!document) {
      return errorResponse("Document not found", 404);
    }
    // Attempt to remove the uploaded image
    const imageRemoved = await removeUploadedImage(
      document.imageId,
      "file-share"
    );
    if (!imageRemoved) {
      return errorResponse("Failed to remove associated image", 500);
    }
    // Delete the document
    await prisma.document.delete({
      where: { id: params.id },
    });
    return successResponse("Record deleted successfully", 200);
  } catch (error) {
    console.error("Error deleting document:", error);
    return errorResponse(
      "An error occurred while trying to delete the item. Please try again later.",
      500
    );
  }
};

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
