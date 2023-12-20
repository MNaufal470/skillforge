"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  title: string;
  desc: string;
  img: string;
  icon: string;
}

const CategoryCard = ({ title, desc, img, icon }: CategoryCardProps) => {
  let splitTitle = title.split(" ");
  return (
    <div
      className="relative max-w-sm md:max-w-none  w-full py-3 px-4 bg-white  rounded-sm shadow-2xl  space-y-3 flex flex-col"
      // data-aos="flip-left"
      // data-aos-duration="1500"
      // data-aos-offset="250"
    >
      <div className="relative  flex flex-col justify-center items-center  p-4 rounded-sm bg-[#F8F7F9]">
        <img
          src={img}
          alt=""
          className="w-full h-[350px] object-contain rounded-sm rounded-b-xl"
        />
        <div className="mt-6 absolute bottom-0 pt-5  w-full rounded-portfolio bg-white flex justify-center items-center flex-col">
          <div className="w-fit border-[10px] bg-yellowPrimary  border-white p-2 rounded-full">
            <img src={icon} alt="" className="w-10 h-10" />
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold pb-5">
          {splitTitle[0]}{" "}
          <span className="text-redPrimary">{splitTitle[1]}</span>
        </h1>
        <p className="text-xs font-light">{desc}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
