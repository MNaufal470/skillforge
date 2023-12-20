import BannerHeader from "@/components/banner-header";
import { formatToRupiah } from "@/lib/rupiah";
import Image from "next/image";
import React from "react";
import CourseDetail from "./_components/course-detail";

const page = () => {
  return (
    <div>
      <BannerHeader title="Course Detail" />
      <div className="w-full  bg-[#f7f8fd] px-10 md:px-20 2xl:px-40 py-20">
        <CourseDetail />
        <div></div>
      </div>
    </div>
  );
};

export default page;
