import React from "react";
import ModalNewCourse from "./modal-new-course";
import { ImageMinus } from "lucide-react";
import { Teacher } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TeacherHeader = ({
  data,
}: {
  data: Teacher & { user: { firstname: string; lastname: string } };
}) => {
  return (
    <div className="px-5 md:px-10 lg:px-0">
      <div className="w-full p-10 flex flex-col md:flex-row gap-x-4 items-center justify-between rounded-xl bg-[#17093e] ">
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-1 items-center">
          <div
            className={cn(
              " border-[#dddd] border-2 rounded-full",
              data?.imageUrl ? "p-1" : "p-3 bg-slate-100"
            )}
          >
            {data?.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt={data.user.firstname}
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <ImageMinus className="w-20 h-20" />
            )}
          </div>
          <div className="space-y-3 ">
            <h1 className="text-white font-bold text-2xl text-center md:text-left">
              {data?.user?.firstname} {data?.user?.lastname}
            </h1>
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
              <p className="ms-2 text-sm font-bold text-white">4.95</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a href="#" className="text-sm font-mediu underline text-white">
                73 reviews
              </a>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <ModalNewCourse />
        </div>
      </div>
    </div>
  );
};

export default TeacherHeader;
