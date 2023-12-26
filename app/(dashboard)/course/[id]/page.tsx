import BannerHeader from "@/components/banner-header";
import React from "react";
import CourseDetail from "./_components/course-detail";
import CourseSidebarPreview from "./_components/course-sidebar-preview";
import AuthorMoreCourse from "./_components/autor-more-course";

const page = () => {
  return (
    <div className="bg-[#f7f8fd] ">
      <BannerHeader title="Course Detail" />
      <div className="section overflow-hidden">
        <div className="w-full px-10 md:px-20  py-20 flex xl:flex-row flex-col gap-7">
          <CourseDetail />
          <div className="w-full space-y-10 max-w-sm mx-auto">
            <CourseSidebarPreview />
            <AuthorMoreCourse />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
