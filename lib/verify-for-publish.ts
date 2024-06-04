import { Chapter } from ".prisma/client";
import { Section } from "@/action/get-course";

export const isValidForSection = (chapter: Chapter[]) => {
  let isValid = false;
  for (let cpt of chapter) {
    if (cpt.title && cpt.description && cpt.videoUrl) {
      isValid = true;
    } else {
      isValid = false;
    }
  }
  return isValid;
};

export const isValidForCourse = (section: Section[]) => {
  let isValid = false;
  let lengthPublished = 0;
  for (let index = 0; index < section.length; index++) {
    if (section[index].isPublished) {
      lengthPublished += 1;
    }
  }
  if (section.length === lengthPublished) {
    isValid = true;
  }
  return isValid;
};
