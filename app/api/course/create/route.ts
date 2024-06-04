import { db } from "@/lib/db";
import { decrypting, encrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import { Course } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    if (!title) {
      return NextResponse.json(
        { message: "Title is required ", status: 400 },
        { status: 400 }
      );
    }
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptId = Number(decrypting(String(user.id)));
    const availableTitleCourse: Course | any = await db.course.findFirst({
      where: { title, userId: decryptId },
    });
    if (availableTitleCourse) {
      return NextResponse.json(
        { message: "Title already exist in your courses", status: 400 },
        { status: 400 }
      );
    }
    const course = await db.course.create({
      data: {
        title,
        userId: decryptId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    const encryptIdCourse = encrypting(String(course.id));
    return NextResponse.json(
      {
        message: "Course created",
        status: 203,
        data: {
          title: course.title,
          courseId: encryptIdCourse,
          createdAt: course.createdAt,
        },
      },
      { status: 203 }
    );
  } catch (error) {
    console.log("[CREATE COURSE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
