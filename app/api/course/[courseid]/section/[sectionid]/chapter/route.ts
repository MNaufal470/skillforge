import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseid: string; sectionid: string } }
) {
  try {
    const { title }: { title: string } = await request.json();
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptIdSection = decrypting(params.sectionid);
    const decryptIdCourse = decrypting(params.courseid);
    const decryptIdUser = decrypting(String(user.id));

    if (!title)
      return NextResponse.json(
        { message: "All field is required", status: 400 },
        { status: 400 }
      );

    const ownedCourse = await db.course.findFirst({
      include: {
        section: {
          where: { id: decryptIdSection },
        },
      },
      where: {
        id: decryptIdCourse,
        userId: decryptIdUser,
        section: { some: { id: decryptIdSection } },
      },
    });

    if (!ownedCourse)
      return NextResponse.json(
        { message: "Course Not Found", status: 400 },
        { status: 400 }
      );
    const lastChapter = await db.chapter.findFirst({
      where: { sectionId: decryptIdSection },
      orderBy: { position: "desc" },
    });

    const position = lastChapter ? lastChapter.position + 1 : 1;
    const newChapter = await db.chapter.create({
      data: {
        title: title,
        sectionId: decryptIdSection,
        position: position,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      },
    });
    return NextResponse.json(
      { message: "Chapter added successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("[CREATE CHAPTER]", error);
    return new NextResponse("Somthing went wrong", { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseid: string; sectionid: string } }
) {
  try {
    const { list } = await request.json();
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptIdSection = decrypting(params.sectionid);
    const decryptIdCourse = decrypting(params.courseid);
    const decryptIdUser = decrypting(String(user.id));

    if (!list)
      return NextResponse.json(
        { message: "All field is required", status: 400 },
        { status: 400 }
      );

    const ownedCourse = await db.course.findFirst({
      include: {
        section: {
          where: { id: decryptIdSection },
        },
      },
      where: {
        id: decryptIdCourse,
        userId: decryptIdUser,
        section: { some: { id: decryptIdSection } },
      },
    });
    if (!ownedCourse)
      return NextResponse.json(
        { message: "Course Not Found", status: 400 },
        { status: 400 }
      );

    for (let cpt of list) {
      const decryptedId = decrypting(cpt.id);
      await db.chapter.update({
        where: { id: decryptedId },
        data: {
          position: cpt.position,
        },
      });
    }
    return NextResponse.json(
      { message: "Chapters Successfuly Reordered", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("[REORDERED CHAPTER]", error);
    return new NextResponse("Something Went Wrong", { status: 500 });
  }
}
