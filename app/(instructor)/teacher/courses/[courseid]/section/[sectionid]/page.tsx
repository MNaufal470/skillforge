import { getSection } from "@/action/get-section";
import { Banner } from "@/components/banner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import SectionTitleForm from "./_components/section-title-form";
import SectionChapterForm from "./_components/course-section-form";
import SectionInfo from "./_components/section-info";
import { Chapter, Section } from "@prisma/client";
import SectionPublish from "./_components/section-publish";

const page = async ({
  params,
}: {
  params: { courseid: string; sectionid: string };
}) => {
  const section: Section & { chapter: Chapter[] } = await getSection(
    params.sectionid
  );
  const label = section.isPublished
    ? "This section is Published. To make changes to a chapter, Section must be unpublished first."
    : "This section is unpublished. It will not be visible to the student";
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      {
        <Banner
          variant={section.isPublished ? "success" : "warning"}
          label={label}
        />
      }
      <div className="flex  flex-col gap-y-2 mt-10">
        <Link
          href={`/teacher/courses/${params.courseid}`}
          className="flex items-center text-sm hover:opacity-75 transition mb-3 "
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back To Course
        </Link>
        <SectionInfo section={section} />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-y-10 ">
        <SectionTitleForm
          initialData={section.title}
          sectionid={params.sectionid}
          courseid={params.courseid}
        />
        <SectionChapterForm
          isPublished={section.isPublished}
          initialData={section.chapter}
          courseid={params.courseid}
          sectionid={params.sectionid}
        />
      </div>
    </div>
  );
};

export default page;
