import { cn } from "@/lib/utils";
import { Eye, Lock, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ChapterItemProps {
  label: string;
  isLock: boolean;
  courseid: string | number;
}

const ChapterItem = ({ label, isLock, courseid }: ChapterItemProps) => {
  return (
    <Link href={`/course/${courseid}/detail`}>
      <div
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 cursor-pointer"
        )}
      >
        <div className="border-b w-full flex items-center justify-between pr-5">
          <div className="flex items-center gap-x-2 py-4">
            <Video size={22} className={cn("text-black")} />
            <h1 className="text-black">{label}</h1>
          </div>
          {isLock ? (
            <Lock className="w-4 h-4 " />
          ) : (
            <Eye className="w-4 h-4 " />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChapterItem;
