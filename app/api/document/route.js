import prisma from "@/utils/db";
import { createErrorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const query = req.nextUrl.searchParams;
  const queryType = query.get("type");
  let response;

  try {
    response = await fetchTopLevelDocuments();
    return NextResponse.json(
      {
        count: response.length,
        response,
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

const fetchTopLevelDocuments = async () => {
  // Fetch only documents without parentID (documents inside no Folder)
  const topLevelDocuments = await prisma.document.findMany({
    where: {
      OR: [
        {
          folderId: null,
        },
        {
          folderId: {
            isSet: false,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return topLevelDocuments;
};
