import prisma from "@/utils/db";
import { createErrorResponse, errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

const userId = "dyuosuryro";
//const userId = "user123";
export const GET = async (req) => {
  try {
    const documents = await fetchDocumentsWithoutFolderId(userId);
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
  try {
    if (!body.documentId) {
      return errorResponse("Folder ID is required");
    }
    const response = await moveItemToTrash(body?.documentId);
    return NextResponse.json(
      {
        status: "success",
        message: "Items move to Trash successfully.",
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
    return errorResponse("Invalid Request ID", 400);
  }
  const documentExit = await prisma.document.findUnique({
    // where: {
    //   id: documentId,
    //   OR: [
    //     {
    //       trashed: null,
    //     },
    //     {
    //       trashed: {
    //         isSet: false,
    //       },
    //     },
    //   ],
    // },
    where: {
      id: documentId,
      AND: [
        {
          trashed: {
            isSet: false,
          },
        },
        {
          userId,
        },
      ],
    },
  });
  if (!documentExit) {
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

const isIdValid = (id) => {
  return typeof id === "string" && id.trim().length > 0;
};
