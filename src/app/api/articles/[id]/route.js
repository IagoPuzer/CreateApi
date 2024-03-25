import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const article = await client.article.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
    });

    return new NextResponse(JSON.stringify(article), {
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
  const newArticleData = await request.json();

  try {
    const updatedArticle = await client.article.update({
      where: {
        id: Number(context.params.id),
      },
      data: newArticleData,
    });

    return new NextResponse(JSON.stringify(updatedArticle), {
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
    await client.article.delete({
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
