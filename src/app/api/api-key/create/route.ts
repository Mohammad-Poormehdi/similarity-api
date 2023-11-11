import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { z } from "zod";
import getUser from "@/actions/getUser";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });
    if (existingApiKey) {
      return NextResponse.json("You already have an API Key", { status: 400 });
    }
    const newApiKey = await db.apiKey.create({
      data: { userId: user.id, key: nanoid() },
    });
    return NextResponse.json(newApiKey, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
