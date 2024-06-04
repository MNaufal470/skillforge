import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { removeUploadthing } from "@/lib/remove-uploadthing";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      courseid: string;
      sectionid: string;
      chapterid: string;
      attachmentid: string;
    };
  }
) {
  try {
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptedCourseId = decrypting(params.courseid);
    const decryptedSectionId = decrypting(params.sectionid);
    const decryptedChapterid = decrypting(params.chapterid);
    const decryptedAttachmentId = decrypting(params.attachmentid);
    const decryptedUserid = decrypting(String(user.id));
    const ownedCourse = await db.course.findFirst({
      where: {
        id: decryptedCourseId,
        userId: decryptedUserid,
        section: {
          some: {
            id: decryptedSectionId,
            chapter: {
              some: {
                id: decryptedChapterid,
                attachment: { some: { id: decryptedAttachmentId } },
              },
            },
          },
        },
      },
    });
    if (!ownedCourse)
      return NextResponse.json(
        { message: "Course not found or not authorized user" },
        { status: 400 }
      );
    const existedAttachment = await db.attachment.findUnique({
      where: { id: decryptedAttachmentId },
    });
    //   Delete file in Uploadthing
    await removeUploadthing(existedAttachment?.fileUrl!);
    // Delete in database
    const attachment = await db.attachment.delete({
      where: {
        id: decryptedAttachmentId,
      },
    });
    return NextResponse.json(
      { message: "Success deleted Attachment" },
      { status: 200 }
    );
  } catch (error) {
    console.log(["DELETE ATTACHMENT"], error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}
