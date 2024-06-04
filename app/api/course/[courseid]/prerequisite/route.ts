import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const { name } = await request.json();
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const userid = Number(decrypting(String(user.id)));
    const decryptingId = decrypting(params.courseid);
    const course = await db.course.findUnique({ where: { id: decryptingId } });
    if (!course) {
      return NextResponse.json(
        { message: "Course Not Found", status: 400 },
        { status: 400 }
      );
    }
    if (course.userId !== userid) {
      return NextResponse.json(
        { message: "Not Authorized User", status: 403 },
        { status: 403 }
      );
    }
    await db.prerequisites.create({
      data: {
        name: name,
        courseId: decryptingId,
      },
    });
    return NextResponse.json(
      { message: "Prerequisites add successfully", status: 200 },
      { status: 203 }
    );
  } catch (error) {
    console.log("[ADD Prerequisites]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const { prerequisiteId } = await request.json();
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const userid = Number(decrypting(String(user.id)));
    const decryptingId = decrypting(params.courseid);
    const course = await db.course.findUnique({ where: { id: decryptingId } });
    if (!course) {
      return NextResponse.json(
        { message: "Course Not Found", status: 400 },
        { status: 400 }
      );
    }
    if (course.userId !== userid) {
      return NextResponse.json(
        { message: "Not Authorized User", status: 403 },
        { status: 403 }
      );
    }
    await db.prerequisites.delete({
      where: {
        id: prerequisiteId,
      },
    });
    return NextResponse.json(
      { message: "Prerequisites remove successfully", status: 200 },
      { status: 203 }
    );
  } catch (error) {
    console.log("[ADD Prerequisites]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
