"use client";
import { LayoutGrid, LogIn, Speech, User, XSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavbarRoutesItem from "./navbar-routes-item";
import { useUserStore } from "@/zustand/user-hooks";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const NavbarRoutes = () => {
  const user = useUserStore((state) => state.user);
  const qs = useSearchParams();
  const searchParams = qs.get("status");
  const path = usePathname();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  let toastText =
    searchParams === "unauthorized"
      ? "Unauthorized Acesss"
      : "You're already logged in";
  let routes = [
    {
      label: "Instructor",
      href: "/teacher",
      icon: Speech,
    },

    {
      label: "My Account",
      href: "/student",
      icon: User,
    },
  ];
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (searchParams) {
      toast.error(toastText);
      if (searchParams === "unauthorized") {
        axios
          .patch("/api/auth/logout")
          .then((res) => setUser({}))
          .then((res) => router.replace(path));
      } else {
        router.push(path);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="z-50">
      <LayoutGrid className="block lg:hidden" onClick={() => setShow(true)} />
      <div
        className={`absolute lg:relative w-full  border-b md:border-none bg-white right-0 ${
          show ? "top-0" : "top-[-500px] lg:top-0"
        }  flex flex-col md:flex-row items-center justify-center py-10 lg:py-0 pt-20  transition-all duration-500`}
      >
        {user?.id &&
          routes.map((item) => (
            <NavbarRoutesItem
              key={item.label}
              label={item.label}
              Icon={item.icon}
              href={item.href}
            />
          ))}
        {!user?.id && (
          <NavbarRoutesItem
            key={"My Account"}
            label={"Get Started"}
            Icon={LogIn}
            href={"/auth"}
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
