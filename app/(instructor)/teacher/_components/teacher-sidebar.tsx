"use client";
import { cn } from "@/lib/utils";
import { Book, Home, LogOut, User } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserStore } from "@/zustand/user-hooks";

const StudentSidebar = () => {
  let sidebarNav = [
    {
      icon: Home,
      name: "dashboard",
      href: "/teacher",
    },
    {
      icon: Book,
      name: "my courses",
      href: "/teacher/courses",
    },
    {
      icon: User,
      name: "teacher profile",
      href: "/teacher/myprofile",
    },
  ];

  const [open, setOpen] = useState(false);
  const router = useRouter();
  let pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const handleClick = (href: string) => {
    router.push(href);
  };
  const handleLogout = async () => {
    try {
      const response = await axios
        .patch("/api/auth/logout")
        .then((res) => toast.success(res.data.message))
        .then((res) => setUser({}))
        .then((res) => router.push("/auth"));
    } catch (error) {
      console.log(error);
    }
  };
  if (pathname.includes("/courses/")) return null;
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
              pathname === "/teacher/"
                ? "border-r-8 border-r-redPrimary"
                : pathname === item.href
                ? "border-r-8 border-r-redPrimary"
                : ""
            )}
            key={idx}
            onClick={() => handleClick(item.href)}
          >
            <item.icon className="w-5 h-5" />
            <h1 className="capitalize">{item.name}</h1>
          </div>
        ))}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="w-full text-[#5F6C76] flex items-center gap-x-3 cursor-pointer pb-3 border-b border-b-[#dddd] hover:border-r-8 hover:border-r-redPrimary">
            <LogOut className="w-5 h-5" />
            <h1 className="capitalize">Logout</h1>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure to logout?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will logout your account.
              </DialogDescription>
              <DialogFooter>
                <div className="mt-5 flex justify-end gap-x-3">
                  <Button variant={"danger"} onClick={handleLogout}>
                    Logout
                  </Button>
                  <Button variant={"success"}>Cancell</Button>
                </div>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentSidebar;
