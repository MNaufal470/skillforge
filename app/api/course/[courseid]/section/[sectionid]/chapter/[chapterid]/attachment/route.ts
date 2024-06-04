import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      courseid: string;
      sectionid: string;
      chapterid: string;
    };
  }
) {
  try {
    const { fileUrl } = await request.json();
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptedCourseId = decrypting(params.courseid);
    const decryptedSectionId = decrypting(params.sectionid);
    const decryptedChapterid = decrypting(params.chapterid);
    const decryptedUserid = decrypting(String(user.id));
    if (!fileUrl)
      return NextResponse.json(
        { message: "All field is required" },
        { status: 400 }
      );
    const ownedCourse = await db.course.findFirst({
      where: {
        id: decryptedCourseId,
        userId: decryptedUserid,
        section: {
          some: {
            id: decryptedSectionId,
            chapter: { some: { id: decryptedChapterid } },
          },
        },
      },
    });
    if (!ownedCourse)
      return NextResponse.json(
        { message: "Course not found or not authorized user" },
        { status: 400 }
      );

    const attachment = await db.attachment.create({
      data: {
        fileUrl: fileUrl,
        title: fileUrl.split("/").pop(),
        chapterId: decryptedChapterid,
      },
    });
    return NextResponse.json(
      { message: "Success added Attachment" },
      { status: 200 }
    );
  } catch (error) {
    console.log(["ATTACHMENT"], error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}
