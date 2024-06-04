import { db } from "@/lib/db";
import { decrypting, encrypting } from "@/lib/encrypt-decrypt";
import { removeUploadthing } from "@/lib/remove-uploadthing";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const values = await request.json();
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
    await db.course.update({
      where: { id: decryptingId },
      data: { ...values },
    });
    return NextResponse.json(
      { message: "Course update successfully", status: 200 },
      { status: 203 }
    );
  } catch (error) {
    console.log("[PATCH COURSE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseid: string } }
) {
  try {
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const userid = Number(decrypting(String(user.id)));
    const decryptingId = decrypting(params.courseid);
    const course = await db.course.findUnique({
      where: { id: decryptingId },
      include: {
        section: {
          include: {
            chapter: {
              include: { attachment: true },
            },
          },
        },
      },
    });
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
    for (let index = 0; index < course.section.length; index++) {
      const section = course.section[index];
      // Remove chapter and remove video from uploadthing
      for (let index = 0; index < section.chapter.length; index++) {
        const chapter = section.chapter[index];
        if (chapter.videoUrl) {
          await removeUploadthing(chapter.videoUrl);
        }
        // Remove attachment and remove file from uploadthing
        for (let index = 0; index < chapter.attachment.length; index++) {
          const att = chapter.attachment[index];
          if (att.fileUrl) {
            await removeUploadthing(att.fileUrl);
          }
          await db.attachment.delete({
            where: { id: att.id },
          });
        }
        await db.chapter.delete({
          where: { id: chapter.id },
        });
      }
      await db.section.delete({
        where: {
          id: section.id,
        },
      });
    }

    await db.course.delete({
      where: { id: decryptingId },
    });
    return NextResponse.json(
      { message: "Course delete successfully", status: 200 },
      { status: 203 }
    );
  } catch (error) {
    console.log("[PATCH COURSE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
