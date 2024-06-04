import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { teacherid: string } }
) {
  try {
    const values = await request.json();
    const token = await request.cookies.get("access-token")?.value;
    const activeUser = await verifyAuth(token!);
    const decrytedUserId = decrypting(activeUser.id!);

    const user = await db.user.findUnique({
      where: { id: decrytedUserId },
    });

    if (!user)
      return NextResponse.json(
        { message: "User not found", status: 400 },
        { status: 400 }
      );

    await db.teacher.upsert({
      where: {
        userId: decrytedUserId,
      },
      update: {
        ...values,
      },
      create: {
        ...values,
        userId: decrytedUserId,
      },
    });
    return NextResponse.json(
      { message: "Update Successfuly", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("[TEACHER]", error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
