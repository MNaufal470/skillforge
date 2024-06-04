import { LayoutDashboard } from "lucide-react";
import React from "react";
import CourseTitleForm from "./course-title-form";
import { CourseClient } from "@/action/get-course";
import CourseDescriptionForm from "./course-description-form";
import CourseCategoryForm from "./course-category-form";
import { Category } from "@prisma/client";
import CoursePriceForm from "./course-price-form";
import CourseImageForm from "./course-image-form";
import CourseSectionForm from "./course-section-form";
import CourseLanguageForm from "./course-language-form";
import { getLanguages } from "@/action/get-languages";
import { getLevels } from "@/action/get-levels";
import CourseLevelForm from "./course-level-form";
import CoursePrerequisitesForm from "./course-prerequisites-form";

const CourseForm = async ({
  course,
  categories,
}: {
  course: CourseClient;
  categories: Category[];
}) => {
  const languages = await getLanguages();
  const levels = await getLevels();
  return (
    <div className="">
      <div className="flex items-center gap-x-2 mb-0 ">
        <LayoutDashboard className="text-sky-700 h-8 w-8" />
        <h2 className="text-xl">Customize your course</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 ">
        <div>
          <CourseTitleForm initialData={course?.title} courseid={course?.id} />
          <CourseDescriptionForm
            initialData={course?.description}
            courseid={course?.id}
          />
          <CourseCategoryForm
            initialData={course?.category?.title}
            courseid={course?.id}
            options_ctg={categories.map((ctg) => ({
              label: ctg.title,
              value: ctg.id,
            }))}
          />
          <CoursePriceForm initialData={course?.price} courseid={course?.id} />
          <CourseLanguageForm
            initialData={course?.language?.name}
            courseid={course?.id}
            options_lng={languages.map((ctg) => ({
              label: ctg.name,
              value: ctg.id,
            }))}
          />
          <CourseLevelForm
            initialData={course?.level?.name}
            courseid={course?.id}
            options_lvl={levels.map((ctg) => ({
              label: ctg.name,
              value: ctg.id,
            }))}
          />
        </div>
        <div>
          <CourseSectionForm
            initialData={course?.section}
            courseid={course?.id}
          />
          <CoursePrerequisitesForm
            initialData={course?.prerequisites}
            courseid={course?.id}
          />
          <CourseImageForm
            initialData={course?.imageUrl}
            courseid={course?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
