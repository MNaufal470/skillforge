import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
export async function PUT(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const { list } = await request.json();
    const token = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptIdUser = decrypting(String(token.id));
    const decryptId = decrypting(params.courseid);
    if (!list)
      return NextResponse.json(
        { message: "List is required", status: 400 },
        { status: 400 }
      );

    const courseOwner = await db.course.findFirst({
      where: {
        id: decryptId,
        userId: decryptIdUser,
      },
    });

    if (!courseOwner)
      return NextResponse.json(
        { message: "Not Authorized User", status: 403 },
        { status: 403 }
      );

    for (let item of list) {
      let decryptId = decrypting(item.id);
      await db.section.update({
        where: {
          id: decryptId,
        },
        data: {
          position: item.position,
        },
      });
    }
    return NextResponse.json(
      { message: "Reorder successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const { title } = await request.json();
    const token = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptIdUser = decrypting(String(token.id));
    const decryptId = decrypting(params.courseid);
    if (!title)
      return NextResponse.json(
        { message: "List is required", status: 400 },
        { status: 400 }
      );
    const courseOwner = await db.course.findFirst({
      where: {
        id: decryptId,
        userId: decryptIdUser,
      },
    });

    if (!courseOwner)
      return NextResponse.json(
        { message: "Not Authorized User", status: 403 },
        { status: 403 }
      );

    const lastChapter = await db.section.findFirst({
      where: {
        courseId: decryptId,
      },
      orderBy: { position: "desc" },
    });
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;
    const section = await db.section.create({
      data: {
        title: title,
        courseId: decryptId,
        position: newPosition,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
    });
    return NextResponse.json(
      { message: "Section added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
