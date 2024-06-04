import { db } from "@/lib/db";
import { decrypting, encrypting } from "@/lib/encrypt-decrypt";
import { Attachment, Chapter, Section } from "@prisma/client";

export const getSection = async (id: string) => {
  const decryptId = decrypting(id);
  const FindSection: (Section & { chapter: Chapter }) | any =
    await db.section.findFirst({
      where: {
        id: Number(decryptId),
      },
      include: {
        chapter: {
          orderBy: { position: "asc" },
          include: {
            attachment: true,
          },
        },
      },
    });

  for (let cpt of FindSection.chapter) {
    cpt.id = encrypting(cpt.id);
    for (let att of cpt.attachment) {
      att.id = encrypting(att.id);
    }
  }
  const section = {
    ...FindSection,
    id: id,
    courseId: encrypting(FindSection.courseId),
  };
  return section as Section & {
    chapter: Chapter[];
    attachment: Attachment[];
  };
};
