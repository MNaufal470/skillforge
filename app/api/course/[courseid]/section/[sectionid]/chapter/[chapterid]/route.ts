import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { removeUploadthing } from "@/lib/remove-uploadthing";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface paramsProps {
  params: {
    courseid: string;
    sectionid: string;
    chapterid: string;
  };
}
export async function PUT(request: NextRequest, { params }: paramsProps) {
  try {
    const values = await request.json();
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptedCourseId = decrypting(params.courseid);
    const decryptedSectionId = decrypting(params.sectionid);
    const decryptedChapterid = decrypting(params.chapterid);
    const decryptedUserid = decrypting(String(user.id));

    if (!values)
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

    await db.chapter.update({
      where: {
        id: decryptedChapterid,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(
      { message: "Success updated chapter" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("[EDIT CHAPTER]", error);
    return new NextResponse(`${error}`, { status: 500 });
  }
}
export async function PATCH(request: NextRequest, { params }: paramsProps) {
  try {
    const decryptedSectionId = decrypting(params.sectionid);
    const decryptedChapterid = decrypting(params.chapterid);
    const values = await request.json();
    if (!values.videoUrl) {
      return new NextResponse("All field is required", { status: 401 });
    }
    const existingVideo = await db.chapter.findFirst({
      where: {
        id: decryptedChapterid,
      },
    });
    if (existingVideo?.videoUrl) {
      //   Delete file in Uploadthing
      const existedVideo = await db.chapter.findFirst({
        where: { id: decryptedChapterid },
      });
      await removeUploadthing(existedVideo?.videoUrl!);
    }
    await db.chapter.update({
      where: { id: decryptedChapterid, sectionId: decryptedSectionId },
      data: {
        ...values,
      },
    });

    return NextResponse.json(
      { message: "Chapter updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[UPLOAD VIDEO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: paramsProps) {
  try {
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptedCourseId = decrypting(params.courseid);
    const decryptedSectionId = decrypting(params.sectionid);
    const decryptedChapterid = decrypting(params.chapterid);
    const decryptedUserid = decrypting(String(user.id));

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
        { message: "Chapter not found or not authorized user" },
        { status: 400 }
      );

    const ownedChapter = await db.chapter.findUnique({
      where: { id: decryptedChapterid },
      include: {
        attachment: true,
      },
    });
    if (ownedChapter?.videoUrl) {
      //   Delete file in Uploadthing
      await removeUploadthing(ownedChapter.videoUrl);
    }
    if (ownedChapter?.attachment?.length! > 0) {
      ownedChapter?.attachment.map(async (att) => {
        //   Delete file in Uploadthing
        await removeUploadthing(att.fileUrl);
        await db.attachment.delete({
          where: { id: att.id },
        });
      });
    }
    await db.chapter.delete({
      where: { id: decryptedChapterid },
    });
    return NextResponse.json(
      { message: "Deleted Chapter Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[UPLOAD VIDEO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
