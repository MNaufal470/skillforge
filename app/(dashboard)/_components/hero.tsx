import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full relative py-14 px-10 md:px-5 md:py-40 bg-[#f7f8fd]">
      <div className="">
        <Image
          src={"/book.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-bounce opacity-50 duration-2000 absolute bottom-14 left-10"
        />
        <Image
          src={"/planet.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-spin duration-2000 absolute top-14 right-10"
        />
        <Image
          src={"/triangle.png"}
          height={100}
          width={100}
          alt="book"
          className="animate-slide  absolute top-14 left-10"
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-10">
        <div className="w-full flex justify-center items-center">
          <div className="max-w-xl w-full flex flex-col gap-y-4">
            <h1 className="text-lg tracking-widest text-red-500 font-[500]">
              EDUCATION SOLUTION
            </h1>
            <h3 className="text-5xl font-extrabold">
              Cloud-based LMS Trusted by 1000+
            </h3>
            <p className="tracking-wide">
              Welcome to SkillForge, your all-in-one solution for seamless and
              effective learning management! Whether you &apos are an educator,
              a student, or a corporate training professional, SkillForge is
              designed to simplify the learning process and enhance your
              educational experience.
            </p>
            <div className="flex gap-x-5 items-center mt-5">
              <Button variant={"success"} size={"lg"}>
                View Course
              </Button>
              <Button variant={"danger"} size={"lg"}>
                Explore More
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex justify-center">
          <Image src={"/home.png"} alt="hero" height={350} width={550} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
