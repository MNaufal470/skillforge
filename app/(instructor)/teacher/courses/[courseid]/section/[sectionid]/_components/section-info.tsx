"use client";
import { CourseClient } from "@/action/get-course";
import Modal from "@/components/modal";
import { Chapter, Section } from "@prisma/client";
import { Check, Info, X } from "lucide-react";
import React, { useState } from "react";
import SectionPublish from "./section-publish";
import { isValidForSection } from "@/lib/verify-for-publish";

const SectionInfo = ({ section }: (Section & { chapter: Chapter[] }) | any) => {
  const [open, setOpen] = useState(false);

  const ruleToPublishedCourse = [
    {
      title: "Enter Course Title and Ensure Titles Are Not Identical.",
      isValid: section.title,
    },
    {
      title: "Enter Section Chapter and Minimum Chapter is 2.",
      isValid: section?.chapter?.length >= 2,
    },
    {
      title: "Each Chapter Already Fulfills All the Required Fields.",
      isValid: isValidForSection(section.chapter),
    },
  ];
  let completedField = ruleToPublishedCourse.filter(
    (cpt) => cpt.isValid
  ).length;
  let completionsText = `(${completedField}/${ruleToPublishedCourse.length})`;
  let isValidToPublish = ruleToPublishedCourse.length === completedField;
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Section setup</h1>
        <span className="text-sm text-slate-700 flex items-center gap-x-1">
          Complete all fields {completionsText}{" "}
          <Info
            className="w-4 h-4 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </span>
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
      <SectionPublish
        value={isValidToPublish}
        setOpen={setOpen}
        sectionid={section.id}
        courseid={section.courseId}
        isPublished={section.isPublished}
      />
    </div>
  );
};

export default SectionInfo;
