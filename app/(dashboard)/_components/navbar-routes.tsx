"use client";
import {
  BookHeadphones,
  Heart,
  LayoutGrid,
  LogIn,
  Speech,
  User,
  XCircle,
  XSquare,
} from "lucide-react";
import React, { useState } from "react";
import NavbarRoutesItem from "./navbar-routes-item";

const NavbarRoutes = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [show, setShow] = useState(false);
  let routes = [
    {
      icon: Heart,
      href: "/wishlist",
      label: "Wishlist",
    },
    {
      label: "Instructor",
      href: "/my-courses",
      icon: Speech,
    },
    {
      label: "My Learning",
      href: "/my-courses",
      icon: BookHeadphones,
    },
    {
      label: "My Account",
      href: "/my-account",
      icon: User,
    },
  ];
  return (
    <div className=" z-50 ">
      <LayoutGrid className="block lg:hidden" onClick={() => setShow(true)} />
      <div
        className={`absolute lg:relative w-full  border-b md:border-none bg-white right-0 ${
          show ? "top-0" : "top-[-500px] lg:top-0"
        }  flex flex-col md:flex-row items-center justify-center py-10 lg:py-0 pt-20  transition-all duration-500`}
      >
        {isLogin ? (
          routes.map((item) => (
            <NavbarRoutesItem
              key={item.label}
              label={item.label}
              Icon={item.icon}
              href={item.href}
            />
          ))
        ) : (
          <NavbarRoutesItem
            key={"My Account"}
            label={"Get Started"}
            Icon={LogIn}
            href={"/login"}
            style="bg-[#5F2DED] text-white rounded-lg pl-0 px-3 pl-4 border hover:border-[#5F2DED] hover:bg-white hover:text-[#5F2DED]"
          />
        )}
        <div
          className="absolute lg:hidden top-5 right-5 flex items-center gap-x-1"
          onClick={() => setShow(false)}
        >
          <XSquare />
          <span>Close</span>
        </div>
      </div>
    </div>
  );
};

export default NavbarRoutes;
