import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const user = await client.user.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
    });

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    const msgError = error.message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export async function PUT(request, context) {
  const newUserData = await request.json();

  try {
    const updateUser = await client.user.update({
      where: {
        id: Number(context.params.id),
      },
      data: newUserData,
    });

    return new NextResponse(JSON.stringify(updateUser), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    const msgError = error.meta?.cause;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export async function DELETE(request, context) {
  try {
    await client.user.delete({
      where: {
        id: Number(context.params.id),
      },
    });

    return new NextResponse(null, {
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    const msgError = error.meta?.cause;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: "Not Found",
    });
  }
}
