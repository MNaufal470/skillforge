import Image from "next/image";
import React from "react";
import NavbarRoutes from "./navbar-routes";
import SearchInput from "./search-input";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="relative px-2 py-6 md:px-6 2xl:px-40 flex items-center justify-between border-b border-[#eeeeee]">
      <div className="flex flex-1 w-full  items-center md:gap-x-10 gap-x-2">
        <Link href={"/"} className="flex  items-center gap-x-2">
          <Image height={50} width={50} alt="logo" src="/logo.svg" />
          <span className="hidden md:block tracking-wide uppercase ">
            SkillForge
          </span>
        </Link>
        <SearchInput />
      </div>
      {/* Navbar Routes */}
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
