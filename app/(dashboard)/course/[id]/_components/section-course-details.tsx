import React from "react";
import DetailCard from "./detail-card";
import { formatToRupiah } from "@/lib/rupiah";
import { courseDetail } from "@/action/get-course";

const SectionCourseDetails = ({ course }: { course: courseDetail }) => {
  return (
    <div className="mt-10">
      <div className="border-l-2 border-bluePrimary">
        <h1 className="pl-2 text-lg font-bold">Course Details</h1>
      </div>
      <div className="bg-[#F4F4F8] space-y-2  p-6 mt-10 grid md:grid-cols-2 md:divide-x-2 divide-black shadow-lg">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <DetailCard
            title="Instructor"
            subtitle={`${course.user.firstname} ${course.user.lastname}`}
          />
          <DetailCard
            title="Lectures"
            subtitle={`${course.section.length} Sections`}
          />
          <DetailCard title="Enrolled" subtitle="100 Students" />
          <DetailCard
            title="Course Status"
            subtitle={course.active ? "Available" : "Unavailable"}
          />
        </div>
        <div className="w-full space-y-2 flex flex-col justify-center items-center ">
          <DetailCard title="Course Level" subtitle={course.level.name!} />
          <DetailCard title="Language" subtitle={course.language.name!} />
          <DetailCard title="Discount" subtitle="No Discount" />
          <DetailCard title="Price" subtitle={formatToRupiah(course.price!)} />
        </div>
      </div>
    </div>
  );
};

export default SectionCourseDetails;
