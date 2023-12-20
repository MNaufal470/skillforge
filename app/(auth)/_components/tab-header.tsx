import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface TabHeaderProps {
  value: boolean;
  setIsLoginTab: (value: boolean) => void;
}

const TabHeader = ({ value, setIsLoginTab }: TabHeaderProps) => {
  const toggleHeader = (value: boolean) => {
    setIsLoginTab(value);
  };
  return (
    <div className=" mt-32">
      <div className="flex justify-center items-center gap-x-5 md:gap-x-10">
        <div
          className={cn(
            `relative group p-6 px-10 md:px-20 w-[150px] md:w-[300px] flex justify-center items-center rounded-md cursor-pointer bg-white`,
            value ? "bg-white" : "bg-[#F3F4FD]"
          )}
          onClick={() => toggleHeader(true)}
        >
          <h1 className="text-xl md:text-2xl font-semibold">Login</h1>
          <div
            className={cn(
              " group-hover:w-full h-2 bg-bluePrimary absolute top-0 left-0 transition-all duration-500",
              value ? "w-full" : "w-0"
            )}
          />
        </div>
        <div
          className={cn(
            `relative group p-6 px-10 md:px-20 w-[150px] md:w-[300px] flex justify-center items-center rounded-md cursor-pointer bg-white`,
            value ? "bg-[#F3F4FD] " : "bg-white"
          )}
          onClick={() => toggleHeader(false)}
        >
          <h1 className="text-xl md:text-2xl font-semibold">Sign up</h1>
          <div
            className={cn(
              " group-hover:w-full h-2 bg-bluePrimary absolute top-0 left-0 transition-all duration-500",
              value ? "w-0" : " w-full"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
