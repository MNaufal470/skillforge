import CourseCard from "@/components/course-card";
import React from "react";

const page = () => {
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      <div className="w-full pb-3 border-b-2 border-[#dddd]">
        <h1 className="font-bold text-xl">My Wishlist</h1>
      </div>
      <div className="mt-10  grid grid-cols-2 gap-5">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default page;
