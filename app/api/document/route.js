import prisma from "@/utils/db";
import { createErrorResponse, errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

//const userId = "user123";
export const GET = async (req) => {
  const { userId } = await auth();
  const query = req.nextUrl.searchParams;
  const queryType = query.get("type");
  let documents;

  try {
    if (queryType === "trash") {
      documents = await fetchDocumentsInTrash(userId);
    } else {
      documents = await fetchDocumentsWithoutFolderId(userId);
    }
    if (!documents) {
      return NextResponse.json(
        { message: "No documents found", count: 0, documents: [] },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        count: documents.length,
        documents,
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
  try {
    const body = await req.json();
    if (!body.documentId) {
      throw new Error("Folder ID is required");
    }

    const actions = {
      restore: {
        handler: () => restoreDeletedDocument(body.documentId),
        message: "Item restored successfully",
      },
      moveDocument: {
        handler: () =>
          moveDocumentToNewFolder(body.documentId, body.newFolderId),
        message: "Items moved successfully.",
      },
      default: {
        handler: () => moveItemToTrash(body.documentId),
        message: "Items moved to Trash successfully.",
      },
    };

    const action = actions[body.action] || actions.default;
    const response = await action.handler();

    return NextResponse.json(
      {
        status: "success",
        message: action.message,
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return createErrorResponse(
      error.message || "Something went wrong!",
      error,
      400
    );
  }
};

const fetchDocumentsWithoutFolderId = async (userId) => {
  const documentsWithoutFolderId = await prisma.document.findMany({
    where: {
      userId,
      AND: [
        {
          OR: [{ folderId: null }, { folderId: { isSet: false } }],
        },
        {
          OR: [{ trashed: null }, { trashed: { isSet: false } }],
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return documentsWithoutFolderId;
};

const moveItemToTrash = async (documentId) => {
  if (!isIdValid(documentId)) {
    throw new Error("Folder ID is required", 400);
  }
  const isFound = await prisma.document.findUnique({
    where: {
      id: documentId,
      userId,
      OR: [
        {
          trashed: {
            isSet: false,
          },
        },
        {
          trashed: null,
        },
      ],
    },
  });

  if (!isFound) {
    throw new Error(
      "The document you are trying to delete does not exist.",
      400
    );
  }
  const moveToTrash = await prisma.document.update({
    where: { id: documentId },
    data: {
      trashed: true,
    },
  });

  return moveToTrash;
};

const fetchDocumentsInTrash = async (userId) => {
  const trashedDocuments = await prisma.document.findMany({
    where: {
      userId,
      trashed: true,
    },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      mediaInfo: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return trashedDocuments;
};

const moveDocumentToNewFolder = async (documentId, folderId) => {
  try {
    const isDocument = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!isDocument) {
      throw new Error("Invalid document ID", 501);
    }

    const isMovedAlready = await prisma.document.findUnique({
      where: { id: documentId, folderId },
    });

    if (isMovedAlready) {
      throw new Error("This document already exist in this folder.", 501);
    }

    const moveDocument = await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        folderId,
      },
    });
    return moveDocument;
  } catch (error) {
    throw new Error(error);
  }
};

const restoreDeletedDocument = async (documentId) => {
  if (!isIdValid(documentId)) {
    throw new Error("Folder ID is required", 400);
  }
  const documentExit = await prisma.document.findUnique({
    where: {
      userId,
      id: documentId,
      trashed: true,
    },
  });
  if (!documentExit) {
    throw new Error("The Item you are trying to restore does not exist.", 400);
  }

  const restoreDocument = await prisma.document.update({
    where: { userId, id: documentId },
    data: {
      trashed: null,
    },
  });
  restoreDocument;
};

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
