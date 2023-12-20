"use client";
import BannerHeader from "@/components/banner-header";
import React, { useEffect, useState } from "react";
import TabHeader from "../_components/tab-header";
import { Radius, Triangle, X } from "lucide-react";
import Login from "../_components/login";
import SignUp from "../_components/sign-up";
import Image from "next/image";

const Page = () => {
  const [isLoginTab, setIsLoginTab] = useState<boolean>(true);

  return (
    <div className="relative bg-[#f7f8fd75] w-full h-full px-5 lg:px-0 pb-20">
      <BannerHeader title={isLoginTab ? "Login" : "Sign Up"} />
      <div className="relative flex justify-center items-center">
        <TabHeader value={isLoginTab} setIsLoginTab={setIsLoginTab} />
        <div className="absolute top-[30%] -translate-x-1/2 left-1/2 -translate-y-1/2 ">
          <X className="text-bluePrimary animate-spin duration-2000" />
        </div>
      </div>
      <div className="absolute top-[70%]  left-20 -translate-y-1/2 ">
        <Radius className="text-redPrimary animate-spin duration-2000 w-10 h-10 hidden lg:block" />
      </div>
      <div className="absolute hidden xl:block top-[70%]  right-20 -translate-y-1/2 ">
        <Image
          src={"/login.png"}
          width={300}
          height={300}
          objectFit="cover"
          alt="login"
          className="animate-upDown hidden md:block"
        />
      </div>
      <div className="absolute bottom-10  -translate-x-1/2 left-1/2   ">
        <Triangle className="text-green-500 animate-spin duration-2000 " />
      </div>
      <div className="my-20 flex items-center justify-center">
        {isLoginTab ? (
          <Login setIsLoginTab={setIsLoginTab} />
        ) : (
          <SignUp setIsLoginTab={setIsLoginTab} />
        )}
      </div>
    </div>
  );
};

export default Page;
