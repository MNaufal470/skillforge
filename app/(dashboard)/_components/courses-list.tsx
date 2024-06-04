"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/course-card";
import { useMediaQuery } from "react-responsive";
import { CourseDashboard } from "@/action/get-course";

const CoursesList = ({ course }: { course: CourseDashboard[] }) => {
  const [mounted, setMounted] = useState<boolean | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isBiggerScreen = useMediaQuery({
    query: "(min-width: 1920px)",
  });

  if (!mounted) {
    return null;
  }
  return (
    <div className=" w-full relative px-5 md:px-10 lg:px-20 2xl:px-40 md:py-40 py-20">
      <div className="relative space-y-10 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-y-5 justify-start">
          <div className="p-4 px-6 rounded-full bg-[#5F2DED]/10">
            <h3 className="text-[#5F2DED] font-semibold">Course List</h3>
          </div>
          <div className="relative max-w-sm">
            <h1 className="relative z-10 text-4xl font-extrabold leading-10">
              Perfect Online Course Your Carrer
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-10 2xl:gap-10">
        {course.map((item, idx) => (
          <CourseCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
