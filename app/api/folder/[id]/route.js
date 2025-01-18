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
  // Validate the document type
  if (doctype !== "folder" && doctype !== "document") {
    throw new Error("Invalid document type");
  }

  // Generate a random token for the shareable link
  const linkToken = generateRandomString(25);

  // Check if a shareable link already exists for the given document/folder
  const existingLink = await prisma.shareableLink.findFirst({
    where: {
      [`${doctype}Id`]: id,
    },
  });

  if (existingLink) {
    // Return the existing link token if it exists
    return existingLink.token;
  }

  // Check if the document or folder exists
  const itemExists = await prisma[doctype].findUnique({
    where: { id },
  });

  if (!itemExists) {
    throw new Error(
      `${doctype.charAt(0).toUpperCase() + doctype.slice(1)} ID not found`
    );
  }

  // Create a new shareable link
  const newLink = await prisma.shareableLink.create({
    data: {
      token: linkToken,
      [`${doctype}Id`]: id,
      createdBy: itemExists.userId,
    },
  });

  return newLink.token;
};

const handleFetchFolderDetails = async (id) => {
  const response = await prisma.folder.findUnique({
    where: { id },
    include: {
      documents: {
        orderBy: {
          createdAt: "desc",
        },
      },
      children: {
        where: {
          OR: [
            {
              trashed: {
                isSet: false,
              },
            },
            { trashed: null },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      parent: true,
    },
  });
  return response;
};

const handleRevokeShareableLink = async (id, doctype) => {
  // Validate the document type
  if (doctype !== "folder" && doctype !== "document") {
    throw new Error(
      "Invalid document type. Must be either 'folder' or 'document'."
    );
  }

  // Check if a shareable link exists for the given document/folder
  const linkExist = await prisma.shareableLink.findFirst({
    where: {
      [`${doctype}Id`]: id,
    },
  });

  if (!linkExist) {
    throw new Error(
      `${
        doctype.charAt(0).toUpperCase() + doctype.slice(1)
      } shareable link not found.`
    );
  }

  // Delete the shareable link entry
  await prisma.shareableLink.delete({
    where: {
      id: linkExist.id,
    },
  });

  return { message: "Shareable link revoked successfully." };
};

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
