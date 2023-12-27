"use client";
import { cn } from "@/lib/utils";
import { Book, Heart, Home, LogOut, Speech, User } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const StudentSidebar = () => {
  let sidebarNav = [
    {
      icon: Home,
      name: "dashboard",
    },
    {
      icon: User,
      name: "my profile",
    },
    {
      icon: Book,
      name: "ernrolled courses",
    },
    {
      icon: Heart,
      name: "wishlist",
    },
    {
      icon: Speech,
      name: "instructor",
    },
    {
      icon: LogOut,
      name: "logout",
    },
  ];

  let pathname = usePathname();
  return (
    <div className="p-10 max-w-xs w-full bg-white shadow-2xl rounded-xl">
      <div className="p-1 px-3 bg-[#F0F0F5] ">
        <h1 className="text-[#5F6C76] text-sm uppercase">
          Welcome, James Dones
        </h1>
      </div>
      <div className="space-y-4 mt-8">
        {sidebarNav.map((item, idx) => (
          <div
            className={cn(
              `text-[#5F6C76] flex items-center gap-x-3 cursor-pointer pb-3 border-b border-b-[#dddd] hover:border-r-8 hover:border-r-redPrimary`,
              pathname.includes(item.name)
                ? "border-r-8 border-r-redPrimary"
                : ""
            )}
            key={idx}
          >
            <item.icon className="w-5 h-5" />
            <h1 className="capitalize">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSidebar;
