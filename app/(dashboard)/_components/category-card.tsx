"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  title: string;
  desc: string;
  img: string;
}

const CategoryCard = ({ title, desc, img }: CategoryCardProps) => {
  return (
    <div
      className="relative cursor-pointer group hover:bg-[#5f2ded] hover:-translate-y-5 transition duration-300 bg-white rounded-md p-6 py-10 shadow-lg flex justify-center flex-col items-center"
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-once="false"
      data-aos-anchor-placement="left"
    >
      <div className="p-5 rounded-full bg-[#5F2DED]/10 group-hover:bg-white">
        <Image src={img} alt="stock" height={65} width={65} />
      </div>
      <div className="mt-5 text-center">
        <h1 className="group-hover:text-white  text-2xl mb-3 font-semibold">
          {title}
        </h1>
        <p className="group-hover:text-white text-muted-foreground">{desc}</p>
      </div>
      <div className="">
        <ChevronLeft className="h-8 w-8 rotate-45 absolute top-0 left-0 text-[#5f2ded] group-hover:text-white" />
        <ChevronRight className="h-8 w-8 rotate-45 absolute bottom-0 right-0 text-[#5f2ded] group-hover:text-white" />
      </div>
    </div>
  );
};

export default CategoryCard;
