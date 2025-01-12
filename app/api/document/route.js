import prisma from "@/utils/db";
import { createErrorResponse, errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

const userId = "dyuosuryro";
//const userId = "user123";
export const GET = async (req) => {
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
  const body = await req.json();
  let response;
  try {
    if (!body.documentId) {
      throw new Error("Folder ID is required", 400);
    }
    if (body.action === "restore") {
      response = await restoreDeletedDocument(body?.documentId);
    } else {
      response = await moveItemToTrash(body?.documentId);
    }
    return NextResponse.json(
      {
        status: "success",
        message: body?.action
          ? "Item restored successfully"
          : "Items move to Trash successfully.",
        response,
      },
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

const fetchDocumentsWithoutFolderId = async (userId) => {
  const documentsWithoutFolderId = await prisma.document.findMany({
    where: {
      AND: [
        { userId },
        {
          OR: [{ folderId: null }, { folderId: { isSet: false } }],
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
    throw new Error("TheItem you are trying to restore does not exist.", 400);
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
