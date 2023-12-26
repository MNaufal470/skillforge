import React from "react";
import CourseSidebarPreviewMain from "./course-sidebar-preview-main";
import CourseSidebarPreviewDetail from "./course-sidebar-preview-detail";

const CourseSidebarPreview = () => {
  return (
    <div className="p-5 bg-white rounded-md w-full shadow-2xl">
      <CourseSidebarPreviewMain />
      <CourseSidebarPreviewDetail />
    </div>
  );
};

export default CourseSidebarPreview;
