"use client";
import Modal from "@/components/modal";
import { isValidForCourse } from "@/lib/verify-for-publish";
import { Check, Info, X } from "lucide-react";
import React, { useState } from "react";
import CoursePublish from "./course-publish";
import CourseDeleted from "./course-deleted";
import { SingleCourse } from "@/action/get-course";

const CourseInfo = ({ course }: { course: SingleCourse }) => {
  const [open, setOpen] = useState(false);

  const ruleToPublishedCourse = [
    {
      title: "Enter Course Title and Ensure Titles Are Not Identical.",
      isValid: course?.title,
    },
    {
      title: "Enter Course Description.",
      isValid: course?.description,
    },
    {
      title: "Enter Course Category.",
      isValid: course?.categoryId,
    },
    {
      title: "Enter Course Price.",
      isValid: course?.price,
    },
    {
      title: "Enter Course Language.",
      isValid: course?.languageId,
    },
    {
      title: "Enter Course Level.",
      isValid: course?.levelId,
    },
    {
      title: "Enter Course Prerequisites and minimum prerequisites is 2.",
      isValid: course?.prerequisites
        ? course?.prerequisites?.length >= 2
        : false,
    },
    {
      title: "Enter Course Image.",
      isValid: course?.imageUrl,
    },
    {
      title: "Enter Course Section and Minimum Section is 2.",
      isValid: course?.section ? course?.section?.length >= 2 : false,
    },
    {
      title: "Every Section Should be Completed.",
      isValid: course?.section
        ? course?.section?.length >= 2 && isValidForCourse(course.section)
        : false,
    },
  ];
  let completedField = ruleToPublishedCourse.filter(
    (rlu) => rlu.isValid
  ).length;
  let completionsText = `(${completedField}/${ruleToPublishedCourse.length})`;
  const isValidToPublish = completedField === ruleToPublishedCourse.length;
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Course setup</h1>
        {!course?.isPublished && (
          <span className="text-sm text-slate-700 flex items-center gap-x-1">
            Complete all fields {completionsText}{" "}
            <Info
              className="w-4 h-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </span>
        )}
        <Modal
          open={open}
          setOpen={setOpen}
          title="Complete all fields to publish this course"
        >
          <div className=" grid gap-y-5">
            {ruleToPublishedCourse.map((item, idx) => (
              <div className="flex items-center gap-x-2" key={idx}>
                <div className="bg-icon p-1 rounded-md">
                  {item.isValid ? (
                    <Check className="text-[#5f2ded] h-4 w-4 2xl:w-6 2xl:h-6" />
                  ) : (
                    <X className="text-redPrimary h-4 w-4 2xl:w-6 2xl:h-6" />
                  )}
                </div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </Modal>
      </div>
      <div className="space-x-3">
        <CoursePublish
          value={isValidToPublish}
          setOpen={setOpen}
          courseid={course?.id}
          isPublished={course?.isPublished}
        />
        {!course?.isPublished && (
          <CourseDeleted
            value={isValidToPublish}
            setOpen={setOpen}
            courseid={course?.id}
            isPublished={course?.isPublished}
            title={course?.title}
          />
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
