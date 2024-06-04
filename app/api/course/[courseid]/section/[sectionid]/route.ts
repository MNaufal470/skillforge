import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { removeUploadthing } from "@/lib/remove-uploadthing";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseid: string; sectionid: string } }
) {
  try {
    const value = await request.json();

    const decryptId = decrypting(params.sectionid);
    const res = await db.section.findFirst({ where: { id: decryptId } });

    await db.section.update({
      where: {
        id: Number(decryptId),
      },
      data: {
        ...value,
      },
    });

    return NextResponse.json(
      { message: "Update Successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log("[SECTION ID PATCH]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseid: string; sectionid: string } }
) {
  try {
    const user = await verifyAuth(request.cookies.get("access-token")?.value!);
    const decryptIdSection = decrypting(params.sectionid);
    const decryptIdCourse = decrypting(params.courseid);
    const decryptIdUser = decrypting(String(user.id));
    const ownedCourse = await db.course.findFirst({
      where: {
        id: { equals: decryptIdCourse },
        userId: decryptIdUser,
        section: { some: { id: decryptIdSection } },
      },
    });
    if (!ownedCourse)
      return NextResponse.json(
        { message: "Section Not Found or Unauthorized", status: 400 },
        { status: 400 }
      );

    const section = await db.section.findFirst({
      where: { id: decryptIdSection },
      include: {
        chapter: {
          include: {
            attachment: true,
          },
        },
      },
    });
    if (!section)
      return NextResponse.json(
        { message: "Section Not Found or Unauthorized", status: 400 },
        { status: 400 }
      );

    for (let cpt of section.chapter) {
      if (cpt.videoUrl) {
        await removeUploadthing(cpt.videoUrl);
      }
      for (let att of cpt.attachment) {
        if (att.fileUrl) {
          await removeUploadthing(att.fileUrl);
          await db.attachment.delete({ where: { id: att.id } });
        }
      }
      await db.chapter.delete({
        where: {
          id: cpt.id,
        },
      });
    }
    const deleteSection = await db.section.delete({
      where: { id: decryptIdSection },
    });

    if (ownedCourse.isPublished) {
      const publishedSectionInCourse = await db.section.findMany({
        where: {
          courseId: decryptIdCourse,
          isPublished: true,
        },
      });
      if (publishedSectionInCourse.length === 1) {
        await db.course.update({
          where: { id: decryptIdCourse },
          data: { isPublished: false },
        });
      }
    }

    return NextResponse.json(
      { message: "Successfully delete section" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR DELETE SECTION]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
