import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Medal } from "lucide-react";
import React from "react";

const StudentHeader = () => {
  return (
    <div className="px-5 md:px-10 lg:px-0">
      <div className="w-full p-10 flex flex-col md:flex-row gap-x-4 items-center justify-between rounded-xl bg-bluePrimary ">
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-1 items-center">
          <div className="p-1 border-[#dddd] border-2 rounded-full">
            <img
              src="/reviews/teacher__2.png"
              alt=""
              className="w-32 h-32 object-cover"
            />
          </div>
          <div className="space-y-3 ">
            <h1 className="text-white font-bold text-2xl text-center md:text-left">
              James Dones
            </h1>
            <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-x-1 text-white">
                <BookOpen className="w-6 h-6 " />
                <span>17 Courses Enrolled</span>
              </div>
              <div className="flex items-center gap-x-1 text-white">
                <Medal className="w-6 h-6 " />
                <span>10 Certificate</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <Button variant={"danger"} className="outline-none border-none">
            Enroll A New Course <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
