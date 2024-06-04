"use client";
import { cn } from "@/lib/utils";
import { Book, Heart, Home, LogOut, Speech, User } from "lucide-react";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
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
      href: "dashboard",
    },
    {
      icon: User,
      name: "my profile",
      href: "myprofile",
    },
    {
      icon: Book,
      name: "enrolled courses",
      href: "courses",
    },
    {
      icon: Heart,
      name: "wishlist",
      href: "wishlist",
    },
  ];
  const setUser = useUserStore();
  const router = useRouter();
  const { id } = useParams();
  let pathname = usePathname();
  const handleClick = (href: string) => {
    router.push(`/student/${id}/${href}`);
  };

  const handleLogout = async () => {
    try {
      const response = await axios
        .patch("/api/auth/logout")
        .then((res) => toast.success(res.data.message))
        .then((res) => setUser.setUser({}))
        .then((res) => router.push("/auth"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10 h-fit max-w-xs mx-auto w-full bg-white shadow-2xl rounded-xl">
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
              pathname.includes(item.href)
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
        <Dialog>
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
