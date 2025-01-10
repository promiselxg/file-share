import prisma from "@/utils/db";
import { createErrorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const documents = await fetchDocumentsWithoutFolderId();
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

const fetchDocumentsWithoutFolderId = async () => {
  const documentsWithoutFolderId = await prisma.document.findMany({
    where: {
      AND: [
        { userId: "dyuosuryro" },
        {
          OR: [{ folderId: null }, { folderId: { isSet: false } }],
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return documentsWithoutFolderId;
};
