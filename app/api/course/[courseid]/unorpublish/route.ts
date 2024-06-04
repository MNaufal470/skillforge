import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import { Section } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const userid = Number(decrypting(String(user.id)));
    const decryptingId = decrypting(params.courseid);
    const course = await db.course.findUnique({
      where: { id: decryptingId, userId: userid },
      include: {
        section: true,
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Course Not Found or Unauthorized", status: 400 },
        { status: 400 }
      );
    }
    if (course.isPublished) {
      await db.course.update({
        where: { id: decryptingId },
        data: { isPublished: false },
      });
      return NextResponse.json({
        message: "Course successfully Unpublish",
      });
    }
    const ruleToPublish = (section: Section) => section.isPublished;
    let isValidToPublish = course.section.every(ruleToPublish);

    if (!isValidToPublish) {
      return NextResponse.json(
        {
          message: "Course not valid to Publish",
          confetti: false,
        },
        { status: 400 }
      );
    }
    await db.course.update({
      where: { id: decryptingId },
      data: { isPublished: true },
    });
    return NextResponse.json({
      message: "Course successfully Publish",
      confetti: true,
    });
  } catch (error) {
    console.log("[UNORPUBLISH COURSE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
