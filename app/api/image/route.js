import prisma from "@/utils/db";
import {
  createErrorResponse,
  createSuccessResponse,
  errorResponse,
} from "@/utils/errorMessage";

import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
  const user = await currentUser();

  const body = await req.json();
  console.log(user?.id);
  try {
    const { photos, doc } = body;

    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: user?.id },
    });

    if (!existingUser) {
      throw new Error("User record not found.");
    }

    if (!photos || photos.length === 0) {
      return errorResponse("Invalid file parameters", 401);
    }

    const responses = [];
    for (const photo of photos) {
      const fileData = getIndividualDocumentDataFromPhoto(
        photo,
        doc,
        existingUser
      );
      const createdDocument = await prisma.document.create({
        data: fileData,
      });
      responses.push(createdDocument);
    }
    return createSuccessResponse(responses);
  } catch (error) {
    console.log(error);
    return createErrorResponse(
      error.message || "Something went wrong!",
      error,
      400
    );
  }
};

const getIndividualDocumentDataFromPhoto = (photo, body, user) => {
  return {
    title: photo?.original_filename,
    imgUrl: [photo?.secure_url],
    imageId: [photo?.public_id?.split("/")[1]],
    folderId: body?.folderId,
    mediaInfo: {
      file_name: photo?.original_filename,
      imageId: photo?.public_id?.split("/")[1],
      resource_type: photo?.resource_type,
      imgUrl: photo?.secure_url,
      file_format: photo?.format,
    },
    createdBy: {
      username: user?.username || user.firstName,
      photoUrl: user?.imageUrl,
    },
    user: {
      connect: {
        id: user?.id,
      },
    },
  };
};
