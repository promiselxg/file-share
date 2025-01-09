import prisma from "@/utils/db";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/errorMessage";

export const PUT = async (req) => {
  try {
    const body = await req.json();
    // Validate input
    if (!body.folderId || !body.folder_name) {
      return createErrorResponse("Invalid input request", null, 400);
    }
    // Rename the folder
    const data = await handleRenameFolder(body);
    return createSuccessResponse(data);
  } catch (error) {
    return createErrorResponse(error.message, error, 400);
  }
};

const handleRenameFolder = async (body) => {
  // Validate if the folder exists
  const existingFolder = await prisma.folder.findUnique({
    where: {
      id: body.folderId,
    },
  });

  if (!existingFolder) {
    throw new Error("Folder not found. Please try again.");
  }

  // Check for duplicate folder name
  const duplicateFolder = await prisma.folder.findFirst({
    where: { name: body.folder_name },
  });

  if (duplicateFolder) {
    throw new Error("Renaming folder failed. Name already exists.");
  }

  // Rename the folder
  const renamedFolder = await prisma.folder.update({
    where: { id: body.folderId },
    data: { name: body.folder_name },
  });

  return renamedFolder;
};
