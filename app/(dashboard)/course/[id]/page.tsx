import BannerHeader from "@/components/banner-header";
import React from "react";
import CourseDetail from "./_components/course-detail";
import CourseSidebarPreview from "./_components/course-sidebar-preview";
import AuthorMoreCourse from "./_components/autor-more-course";
import { getDetailCourse, getMoreCourse } from "@/action/get-course";

const page = async ({ params }: { params: { id: string } }) => {
  const course = await getDetailCourse(params.id);
  const moreCourses = await getMoreCourse(course.id, course.userId);
  return (
    <div className="bg-[#f7f8fd] ">
      <BannerHeader title={course.title} />
      <div className="section overflow-hidden">
        <div className="w-full px-10 md:px-20  py-20 flex xl:flex-row flex-col gap-7">
          <CourseDetail course={course} />
          <div className="w-full space-y-10 max-w-sm mx-auto">
            <CourseSidebarPreview course={course} />
            <AuthorMoreCourse course={moreCourses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
