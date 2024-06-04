"use client";
import { formatToRupiah } from "@/lib/rupiah";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

const AuthorMoreCourse = ({ course }: { course: Course[] }) => {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/course/${id}`);
  };
  return (
    <div className="p-5 bg-white rounded-md w-full">
      <h1 className="pl-2 border-l-2 border-bluePrimary">
        Author More Courses
      </h1>

      <div className="space-y-5 mt-10">
        {course.map((item) => (
          <div
            className="flex items-center gap-x-3 border-b border-[#dddd] pb-3 cursor-pointer"
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <img
              src={item.imageUrl!}
              alt=""
              className="w-24 h-24 object-cover rounded-sm"
            />
            <div>
              <h3 className="text-bluePrimary">
                {formatToRupiah(item.price!)}
              </h3>
              <h1 className="font-bold leading-5">{item.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorMoreCourse;
