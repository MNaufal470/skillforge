import { formatToRupiah } from "@/lib/rupiah";
import { BookMarked, Video } from "lucide-react";
import Image from "next/image";
import React from "react";
import SectionCourseDetails from "./section-course-details";
import SectionTabDetails from "./section-tab-detail";
import Preview from "@/components/preview-quill";
import { countVideos } from "@/lib/count-videos";
import { courseDetail } from "@/action/get-course";

const CourseDetail = ({ course }: { course: courseDetail }) => {
  let length = countVideos({ course });
  return (
    <div className="max-w-3xl ">
      <div className="flex flex-col gap-y-3">
        <Image
          src={course.imageUrl!}
          width={896}
          height={800}
          objectFit="cover"
          alt="html"
          className="rounded-md"
        />
        <div className="flex flex-wrap gap-y-3 md:flex-nowrap justify-between items-center">
          <div className="flex items-center gap-x-3">
            <div className="flex w-36 justify-center items-center p-2 rounded-md bg-bluePrimary">
              <h1 className="text-white  font-semibold text-sm">
                {course.category.title}
              </h1>
            </div>
            <div className="flex w-36 justify-center items-center p-2 rounded-md bg-redPrimary">
              <h1 className="text-white font-semibold text-sm">Best Seller</h1>
            </div>
          </div>
          <div>
            <h1 className="text-muted-foreground text-sm">
              Last Update:{" "}
              <span className="text-black">September 29, 2023</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-y-3 items-start justify-start">
        <h1 className="text-3xl font-extrabold">{course.title}</h1>
        <div className="flex flex-wrap gap-y-2 gap-x-6 items-center">
          <h3 className="text-xl text-bluePrimary font-bold">
            {formatToRupiah(course.price!)}
          </h3>
          <div className="flex  items-center gap-x-1">
            <BookMarked className="text-[#5f2ded]" />
            <span className="text-sm">{course.section.length} Sections</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Video className="text-[#5f2ded]" />
            <span className="text-sm">{length} Videos</span>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <svg
                key={idx}
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
              4.95
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400 hidden md:block"></span>
            <a
              href="#"
              className="hidden md:block text-sm font-medium text-gray-900 underline  dark:text-white"
            >
              73 reviews
            </a>
          </div>
        </div>
        <Preview value={course.description!} />
      </div>
      <SectionCourseDetails course={course} />
      <SectionTabDetails course={course} />
    </div>
  );
};

export default CourseDetail;
