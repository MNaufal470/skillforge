import React from "react";
import VideoPlayer from "./_components/video-player";
import BannerHeader from "@/components/banner-header";
import CourseBar from "./_components/course-bar";
import { getDetailCourse } from "@/action/get-course";

const page = async ({ params }: { params: { id: string } }) => {
  const course = await getDetailCourse(params.id);
  return (
    <div>
      <BannerHeader title={course.title} />
      <div className="section py-20">
        <VideoPlayer />
        <CourseBar course={course} />
      </div>
    </div>
  );
};

export default page;
