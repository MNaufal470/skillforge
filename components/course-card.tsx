"use client";
import { formatToRupiah } from "@/lib/rupiah";
import { BookMarked, Heart, Video } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
const CourseCard = () => {
  return (
    <div className="flex flex-col max-w-sm  shadow-lg relative rounded-md p-3">
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
        <div className=" absolute top-2 right-2 bg-black/20 p-1 rounded-md hover:bg-[#5f2ded] cursor-pointer transition duration-200">
          <Heart className="text-white " />
        </div>
      </div>
      <div className="mt-5 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <BookMarked className="text-[#5f2ded]" />
            <span className="text-sm">25 Chapters</span>
          </div>
          <div className="flex items-center gap-x-1">
            <Video className="text-[#5f2ded]" />
            <span className="text-sm">75 Videos</span>
          </div>
        </div>
        <div className="mt-3 space-y-3">
          <h1 className="text-xl font-semibold">
            React & Typescript - The Practical Guide
          </h1>
          <p className=" text-sm">
            React is a popular JavaScript library developed by Facebook for
            building user interfaces. Known for its simplicity and efficiency,
            React allows developers to create interactive and dynamic web
            applications with reusable components.
          </p>
          <div className="bg-[#f2277e] p-2 relative inline-block rounded-lg">
            <p className=" text-white text-sm">Web Development</p>
          </div>
          <h3 className="text-lg">{formatToRupiah(100000)}</h3>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1.5 ">
              <Image
                src={"/avatar.jpg"}
                alt="avatar"
                width={50}
                height={50}
                objectFit="cover"
                className="rounded-full"
              />
              <div className="flex flex-col">
                <p>Harris Calvington</p>
                <span className="text-muted-foreground text-xs">
                  Instructor from 2013
                </span>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
