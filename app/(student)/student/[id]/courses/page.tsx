import CourseCard from "./_components/course-card";
import { BookOpenCheck, GraduationCap, Trophy } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      <div className="w-full pb-3 border-b-2 border-[#dddd]">
        <h1 className="font-bold text-xl">My Courses</h1>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CourseCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default page;
