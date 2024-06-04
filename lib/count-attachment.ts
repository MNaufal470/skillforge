import { Section } from "@/action/get-course";

export const countAttachments = ({ section }: { section: Section[] }) => {
  let length = 0;
  const lengthAttachments = section?.map((sct) =>
    sct.chapter.map((cpt) => {
      if (cpt.attachment) {
        cpt.attachment.map((att) => {
          if (att.id) {
            length += 1;
          }
        });
      }
    })
  );
  return length;
};
