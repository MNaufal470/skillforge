import React from "react";
import CourseSidebarPreviewMain from "./course-sidebar-preview-main";
import CourseSidebarPreviewDetail from "./course-sidebar-preview-detail";
import { SingleCourse, courseDetail } from "@/action/get-course";

const CourseSidebarPreview = ({ course }: { course: courseDetail }) => {
  return (
    <div className="p-5 bg-white rounded-md w-full shadow-2xl">
      <CourseSidebarPreviewMain course={course} />
      <CourseSidebarPreviewDetail course={course} />
    </div>
  );
};

export default CourseSidebarPreview;
