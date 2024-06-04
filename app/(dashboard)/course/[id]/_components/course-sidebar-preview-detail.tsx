"use client";
import { SingleCourse, courseDetail } from "@/action/get-course";
import { countAttachments } from "@/lib/count-attachment";
import { countVideos } from "@/lib/count-videos";
import moment from "moment";
import React from "react";

const CourseSidebarPreviewDetail = ({ course }: { course: courseDetail }) => {
  let formatedDate = moment(
    course.createdAt,
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (Z)"
  ).format("DD MMMM YYYY");
  let countAtt = countAttachments({ section: course.section });
  let CourseSidebarPreviewDetailConstant = [
    {
      title: "Instructor",
      name: `${course.user.firstname} ${course.user.lastname}`,
    },
    {
      title: "Course Published",
      name: `${formatedDate}`,
    },
    {
      title: "Total Sections",
      name: course.section.length,
    },
    {
      title: "Total Videos",
      name: `${countVideos({ course })}`,
    },
    {
      title: "Total Attachments",
      name: `${countAtt}`,
    },
    {
      title: "Skill Level",
      name: `${course.level.name}`,
    },
    {
      title: "Language",
      name: `${course.language.name}`,
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
