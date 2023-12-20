import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BannerHeaderProps {
  title: string;
}

const BannerHeader = ({ title }: BannerHeaderProps) => {
  return (
    <div className="relative h-[350px] bg-[#F5F5FE] w-full">
      <div className="relative z-10 flex w-full flex-col gap-y-5 h-full justify-center items-center">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div className="flex items-center">
          <h3 className="text-xl">Home</h3>
          <ChevronRight className="h-5 w-5 text-bluePrimary" />
          <h3 className="text-xl">{title}</h3>
        </div>
      </div>
      <div className="">
        <Image
          src={"/book.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-bounce opacity-50 duration-2000 absolute bottom-0 md:bottom-14 left-10"
        />
        <Image
          src={"/planet.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-spin duration-2000 absolute md:top-[50%] md:-translate-y-1/2 bottom-0  md:right-10 right-0"
        />
        <Image
          src={"/triangle.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-slide  absolute top-0 md:top-14 left-10"
        />
        <Image
          src={"/light.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-upDown  absolute top-0 md:top-14 right-0 md:left-[50%] md:-translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default BannerHeader;
