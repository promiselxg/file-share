import { NextResponse } from "next/server";

export const errorResponse = (message, error) => {
  return new NextResponse(JSON.stringify({ message, error }, { status: 400 }));
};

export const successResponse = (message) => {
  return new NextResponse(JSON.stringify({ message }, { status: 200 }));
};
