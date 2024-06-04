"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface NavbarRoutesItemProps {
  label?: string;
  Icon: LucideIcon;
  href: string;
  style?: string;
}

const NavbarRoutesItem = ({
  label,
  Icon,
  href,
  style,
}: NavbarRoutesItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        `group flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-[#5F2DED]`,
        style
        // isActive &&
        //   "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex tracking-wide items-center gap-x-2 py-4">
        <Icon size={22} className={cn(" group-hover:text-[#5F2DED")} />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all"
          // isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default NavbarRoutesItem;
