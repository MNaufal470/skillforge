import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { isValidForSection } from "@/lib/verify-for-publish";
import { verifyAuth } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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
      include: {
        section: true,
      },
    });

    if (!ownedCourse)
      return NextResponse.json(
        { message: "Section Not Found or Unauthorized", status: 400 },
        { status: 400 }
      );

    const section = await db.section.findFirst({
      where: { id: decryptIdSection },
      include: { chapter: true },
    });

    if (!section)
      return NextResponse.json(
        { message: "Section Not Found or Unauthorized", status: 400 },
        { status: 400 }
      );
    const ruleToPublishedSection = [
      {
        title: "Enter Course Title and Ensure Titles Are Not Identical.",
        isValid: section.title,
      },
      {
        title: "Enter Section Chapter and Minimum Chapter is 2.",
        isValid: section?.chapter?.length >= 2,
      },
      {
        title: "Each Chapter Already Fulfills All the Required Fields.",
        isValid: isValidForSection(section.chapter),
      },
    ];
    let completedField = ruleToPublishedSection.filter(
      (cpt) => cpt.isValid
    ).length;
    if (section?.isPublished) {
      await db.section.update({
        where: { id: decryptIdSection },
        data: { isPublished: false },
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
        {
          message: "Section successfuly Unpublished",
        },
        { status: 200 }
      );
    }

    if (completedField !== ruleToPublishedSection.length) {
      return NextResponse.json(
        {
          message:
            "Unable to publish this section because it is still not valid for publishing.",
        },
        { status: 200 }
      );
    }
    await db.section.update({
      where: { id: decryptIdSection },
      data: { isPublished: true },
    });

    return NextResponse.json(
      { message: "Section Successfuly Publish" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR UN/PUBLISH]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
