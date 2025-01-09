import { NextResponse } from "next/server";

export const errorResponse = (message, error) => {
  return new NextResponse(JSON.stringify({ message, error }, { status: 400 }));
};

export const successResponse = (message) => {
  return new NextResponse(JSON.stringify({ message }, { status: 200 }));
};

export const createErrorResponse = (
  message = "Something went wrong",
  error = null,
  status = 500
) => {
  return NextResponse.json(
    {
      status: "error",
      message,
      ...(error && { error: error.message }),
    },
    { status }
  );
};

export const createSuccessResponse = (data, status = 200) => {
  return NextResponse.json(
    {
      status: "success",
      data,
    },
    { status }
  );
};
