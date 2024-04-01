import client from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await client.user.findMany();

  return new NextResponse(JSON.stringify(users), {
    status: 200,
    statusText: "OK",
  });
}

export async function POST(request) {
  const newUser = await request.json();
  const createdUser = await client.user.create({
    data: newUser,
  });

  return new NextResponse(JSON.stringify(createdUser), {
    status: 201,
    statusText: "Created",
  });
}
