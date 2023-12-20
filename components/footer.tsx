import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { subjects } from "@/constant/categories";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  let icons = [Facebook, Twitter, Instagram, Youtube, Linkedin];
  return (
    <div className="w-full bg-[#0C0E2B]">
      <div className="max-w-[1440px] mx-auto p-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex  items-center gap-x-2">
            <Image height={50} width={50} alt="logo" src="/logo.svg" />
            <span className="tracking-wide uppercase text-white">
              SkillForge
            </span>
          </div>
          <div className="mt-10 flex gap-x-1.5">
            <Input
              placeholder="Your email address"
              className="w-64 text-base py-6 bg-[#202942] outline-none !border-none text-white"
            />
            <Button
              variant={"success"}
              size={"lg"}
              className="py-6 outline-none border-none  text-base"
            >
              Subscribe
            </Button>
          </div>
        </div>
        <Separator className="mt-10 " />
        <div className="flex flex-col md:flex-row gap-y-10 justify-between mt-14">
          <div className="max-w-sm space-y-3">
            <h1 className="font-semibold text-white text-xl">About Us</h1>
            <p className="text-muted-foreground text-base text-justify">
              Welcome to LearnEase LMS, your all-in-one solution for seamless
              and effective learning management! Whether youre an educator, a
              student, or a corporate training professional, LearnEase LMS is
              designed to simplify the learning process and enhance your
              educational experience.
            </p>
            <div className="flex gap-x-2 items-center mt-5">
              {icons.map((Icon, idx) => (
                <div
                  className="p-2 rounded-full bg-[#202942] group hover:cursor-pointer"
                  key={idx}
                >
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-white transition" />
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-sm space-y-3">
            <h1 className="font-semibold text-white text-xl">Courses</h1>
            {subjects.map((item) => (
              <p
                className="text-muted-foreground text-base text-justify hover:text-white transition cursor-pointer"
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
        <Separator className="mt-10 " />
        <div className="mt-3">
          <p className="text-white text-center text-sm">
            &copy;2023 SkillForge. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
