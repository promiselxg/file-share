import prisma from "@/utils/db";
import {
  createErrorResponse,
  createSuccessResponse,
  errorResponse,
  successResponse,
} from "@/utils/errorMessage";
import { generateRandomString } from "@/utils/randomStringGenerator";

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

export const GET = async (req, { params }) => {
  const query = req.nextUrl.searchParams;
  const queryType = query.get("type");
  const action = query.get("action");

  let response;

  try {
    // Check if queryType exists and action is not "revoke"
    if (queryType && action !== "revoke") {
      response = await handleGenerateShareableLink(params?.id, queryType);
    }
    // If action is "revoke"
    else if (queryType && action === "revoke") {
      response = await handleRevokeShareableLink(params?.id, queryType);
    }
    // Default: Fetch folder details
    else {
      response = await handleFetchFolderDetails(params?.id);
    }
    return createSuccessResponse(response);
  } catch (error) {
    console.error("Error processing GET request:", error);
    return createErrorResponse(error.message, error, 400);
  }
};

export const DELETE = async (req, { params }) => {
  if (!isIdValid(params?.id)) {
    return errorResponse("Invalid Request ID", 400);
  }
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: params.id },
    });
    if (!folder) {
      throw new Error("Folder ID not found", 400);
    }
    // Delete the document
    if (
      await prisma.folder.delete({
        where: { id: params.id },
      })
    ) {
      return successResponse("folder deleted successfully", 200);
    }
  } catch (error) {
    return errorResponse(
      "An error occurred while trying to delete the item. Please try again later.",
      500
    );
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
  // check if userId match with logged user

  // Rename the folder
  const renamedFolder = await prisma.folder.update({
    where: { id: body.folderId },
    data: { name: body.folder_name },
  });

  return renamedFolder;
};

const handleGenerateShareableLink = async (id, doctype) => {
  if (doctype !== "folder" && doctype !== "document") {
    throw new Error("Invalid document type");
  }

  const link = generateRandomString(25);

  const linkExist = await prisma.folder.findUnique({
    where: { id },
    select: { shareLink: true },
  });

  if (!linkExist) {
    throw new Error("Document or Folder ID not found");
  }

  if (!linkExist.shareLink) {
    const updatedFolder = await prisma[doctype].update({
      where: { id },
      data: { shareLink: link },
    });
    return updatedFolder.shareLink;
  }

  return linkExist.shareLink;
};

const handleFetchFolderDetails = async (id) => {
  const response = await prisma.folder.findUnique({
    where: { id },
    include: {
      documents: true,
      children: true,
      parent: true,
    },
  });
  return response;
};

const handleRevokeShareableLink = async (id, doctype) => {
  const linkExist = await prisma.folder.findUnique({
    where: { id },
    select: { shareLink: true },
  });

  if (!linkExist) {
    throw new Error("Document or Folder ID not found");
  }
  const updatedFolder = await prisma[doctype].update({
    where: { id },
    data: { shareLink: null },
  });

  return updatedFolder;
};

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
