import React from "react";

const CourseSidebarPreviewDetail = () => {
  let CourseSidebarPreviewDetailConstant = [
    {
      title: "Instructor",
      name: "Tommy Zeed Musique",
    },
    {
      title: "Course Published",
      name: "05 June 2023",
    },
    {
      title: "Total Chapters",
      name: "5",
    },
    {
      title: "Total Videos",
      name: "45",
    },
    {
      title: "Total Attachments",
      name: "25",
    },
    {
      title: "Skill Level",
      name: "Basic",
    },
    {
      title: "Language",
      name: "English",
    },
    {
      title: "Certificate",
      name: "Yes",
    },
  ];
  return (
    <div className="mt-10">
      <div className="space-y-5">
        {CourseSidebarPreviewDetailConstant.map((item, idx) => (
          <div
            className="flex justify-between items-center pb-3 border-b border-b-[#dddd]"
            key={idx}
          >
            <h3 className="font-normal text-[#5F6C76] text-sm">
              {item.title} :
            </h3>
            <h3 className="font-normal text-[#5F6C76] text-sm bg-[#eeeeee] rounded-full p-1 px-3">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebarPreviewDetail;
