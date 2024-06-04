import { Banner } from "@/components/banner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import CourseForm from "./_components/course-form";
import { getDetailCourseTeacher } from "@/action/get-course";
import { getCategories } from "@/action/get-categories";
import CourseInfo from "./_components/course-info";

const page = async ({ params }: { params: { courseid: string } }) => {
  const course = await getDetailCourseTeacher(params.courseid);
  const categories = await getCategories();
  const label = course?.isPublished
    ? "This course is Published"
    : "This course is unpublished. It will not be visible to the student";

  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      {
        <Banner
          variant={course?.isPublished ? "success" : "warning"}
          label={label}
        />
      }
      <div className="flex  flex-col gap-y-2 mt-10">
        <Link
          href={`/teacher/courses`}
          className="flex items-center text-sm hover:opacity-75 transition mb-3 "
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back To Dashboard
        </Link>
        <CourseInfo course={course} />
      </div>
      <div className="mt-10">
        <CourseForm course={course} categories={categories} />
      </div>
    </div>
  );
};

export default page;
