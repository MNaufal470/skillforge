import { BookOpenCheck, GraduationCap, Trophy } from "lucide-react";
import React from "react";

const page = () => {
  let data = [
    {
      icon: Trophy,
      name: "Enrolled Courses",
      title: 27,
    },
    {
      icon: GraduationCap,
      name: "Finish Courses",
      title: 10,
    },
    {
      icon: BookOpenCheck,
      name: "Complete Courses",
      title: 13,
    },
  ];
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      <div className="w-full pb-3 border-b-2 border-[#dddd]">
        <h1 className="font-bold text-xl">Summary</h1>
      </div>
      <div className="mt-10 flex  justify-between">
        {data.map((items, idx) => (
          <div
            className="flex items-center gap-x-3 bg-[#F0F0F5] p-7 rounded-lg shadow-dashboard"
            key={idx}
          >
            <items.icon className="w-16 h-16 text-redPrimary" />
            <div className="">
              <h1 className="font-bold text-5xl">{items.title}</h1>
              <h3 className="font-bold text-lg">{items.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
