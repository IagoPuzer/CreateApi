import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await client.article.findMany();

  return new NextResponse(JSON.stringify(articles), {
    status: 200,
    statusText: "OK",
  });
}

export async function POST(request) {
  const newArticle = await request.json();
  const createdArticle = await client.article.create({
    data: newArticle,
  });

  return new NextResponse(JSON.stringify(createdArticle), {
    status: 201,
    statusText: "Created",
  });
}
