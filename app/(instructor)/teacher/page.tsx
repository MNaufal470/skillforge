import React from "react";
import { BookHeadphones, GraduationCap, ListOrdered } from "lucide-react";
import { cookies } from "next/headers";
import { getInfoTeacher } from "@/action/get-info-teacher";
const page = async () => {
  const cookie = cookies().get("access-token")?.value;
  let dataCourses = await getInfoTeacher("courses", String(cookie));
  let data = [
    {
      icon: BookHeadphones,
      name: "Total Courses",
      title: dataCourses,
    },
    {
      icon: GraduationCap,
      name: "Total Students",
      title: 10,
    },
    {
      icon: ListOrdered,
      name: "Total Orders",
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
