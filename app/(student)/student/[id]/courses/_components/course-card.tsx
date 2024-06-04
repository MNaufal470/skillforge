"use client";
import Image from "next/image";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
const CourseCard = () => {
  return (
    <div className="flex flex-col max-w-xs  shadow-lg relative rounded-md p-3">
      <div className="relative flex items-center justify-center">
        <Link href={"/course/1"}>
          <Image
            src={"/html.jpg"}
            alt="html"
            width={350}
            height={350}
            objectFit="cover"
            className="rounded-md"
          />
        </Link>
      </div>
      <div className="mt-5 px-2">
        <div className="mt-3 space-y-3">
          <h1 className="text-lg font-semibold">
            React & Typescript - The Practical Guide
          </h1>

          <div className="">
            <Progress className="h-2" value={Number(75)} />
            <div className="flex items-center justify-between mt-2">
              <p className={cn(" text-xs font-light")}>
                {Math.round(Number(75))}% Complete
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-3 h-3 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs ">Leave a Rating</p>
                </div>
              </div>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
