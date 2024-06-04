import { SingleCourse, courseDetail } from "@/action/get-course";

export const countVideos = ({ course }: { course: courseDetail }) => {
  let length = 0;
  const lengthVideos = course?.section?.map((sct) =>
    sct.chapter.map((cpt) => {
      if (cpt.videoUrl) {
        length += 1;
      }
    })
  );
  return length;
};
