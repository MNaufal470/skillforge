import React from "react";
import CourseTabHeader from "./course-tab-header";
import { courseDetail } from "@/action/get-course";

const CourseBar = ({ course }: { course: courseDetail }) => {
  return (
    <div>
      <CourseTabHeader course={course} />
    </div>
  );
};

export default CourseBar;
