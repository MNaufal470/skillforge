import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const SubscribeEmails = () => {
  return (
    <div className="relative bg-[#f7f8fd]/50 py-10 px-10 lg:py-40  md:px-20 2xl:px-40 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-20">
        <div className="relative w-full flex items-center justify-center">
          <img
            src="/business.png"
            alt=""
            className="z-10 relative object-cover md:w-[350px] 2xl:w-auto"
          />
          <img
            src="/bg-2.png"
            alt=""
            className="absolute -top-28 z-[2] md:w-[500px]  lg:w-[1000px] w-[1000px]"
          />
          <div className="absolute z-[10] rounded-md p-3 px-10 gap-x-5 animate-upDown top-0 left-0 bg-white shadow-2xl flex">
            <Image
              src={"/avatar.jpg"}
              alt="avatar"
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
            />
            <div>
              <h1 className="text-green-500">Congratulations</h1>
              <h1 className="text-muted-foreground">
                Your Admission Completed
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="max-w-xl">
            <h1 className="text-lg tracking-widest text-red-500 font-[500]">
              EDUCATION SKILLFORGE
            </h1>
            <h3 className="text-3xl md:text-5xl font-extrabold mt-5 tracking-wide md:tracking-wider leading-tight">
              Subscibe your email for interesting promotions
            </h3>
            <p className="tracking-wide mt-3 pl-3 border-l-4 border-[#5f2ded] text-muted-foreground ">
              Join our community and be the first to receive exclusive updates,
              special offers, and exciting news delivered directly to your
              inbox. Stay informed about our latest products, upcoming events,
              and valuable insights tailored just for you
            </p>
            <div className="mt-10 flex gap-x-3">
              <Input
                placeholder="Your email address"
                className="w-64 text-base py-6"
              />
              <Button variant={"success"} size={"lg"} className="py-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeEmails;
