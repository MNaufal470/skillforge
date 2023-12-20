import React from "react";
import DetailCard from "./detail-card";
import { formatToRupiah } from "@/lib/rupiah";

const SectionCourseDetails = () => {
  return (
    <div className="mt-10">
      <div className="border-l-2 border-bluePrimary">
        <h1 className="pl-2 text-lg font-bold">Course Details</h1>
      </div>
      <div className="bg-[#F4F4F8]  p-6 mt-10 grid grid-cols-2 divide-x-2 divide-black shadow-lg">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <DetailCard title="Instructor" subtitle="Harris Calvington" />
          <DetailCard title="Lectures" subtitle="70 Chapters" />
          <DetailCard title="Enrolled" subtitle="100 Students" />
          <DetailCard title="Course Status" subtitle="Available" />
        </div>
        <div className="w-full space-y-2 flex flex-col justify-center items-center  ">
          <DetailCard title="Course Level" subtitle="Intermediate" />
          <DetailCard title="Language" subtitle="English" />
          <DetailCard title="Discount" subtitle="No Discount" />
          <DetailCard title="Price" subtitle={formatToRupiah(100000)} />
        </div>
      </div>
    </div>
  );
};

export default SectionCourseDetails;
