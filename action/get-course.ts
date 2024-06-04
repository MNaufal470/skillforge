import { db } from "@/lib/db";
import { decrypting, encrypting } from "@/lib/encrypt-decrypt";
import { Attachment, Course, Prerequisites, User } from "@prisma/client";

interface Chapter {
  id: number | string;
  sectionId: number;
  title: string;
  videoUrl: string;
  position: number;
  description: string;
  isFree: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  attachment?: Attachment[];
}

export interface Section {
  id: String | Number;
  courseId: number | string;
  title: string;
  position: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  chapter: Chapter[];
}
export interface SingleCourse extends Course {
  id: string | number | any;
  category: {
    title?: string;
  };
  language: {
    name?: string;
  };
  section: Section[];
  level: {
    name?: string;
  };
  prerequisites: Prerequisites[] | [];
}

export interface courseDetail extends SingleCourse {
  user: User & {
    teacher: {
      imageUrl: string;
      description: string;
      expert: string;
    }[];
  };
}

export interface CourseDashboard extends Course {
  category: {
    title: string;
  };
  section: Section[];
  user?: User & {
    teacher: {
      imageUrl: string;
    }[];
  };
}

export const getCourse = async (value?: string) => {
  const course: any = await db.course.findMany({
    include: {
      section: {
        include: {
          chapter: true,
        },
      },
      category: {
        select: { title: true },
      },
      user: {
        include: {
          teacher: {
            select: {
              imageUrl: true,
            },
          },
        },
      },
    },
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (course) {
    for (let index = 0; index < course.length; index++) {
      const csr = course[index];
      csr.id = encrypting(String(csr.id));
    }
  }
  return course as CourseDashboard[];
};

export const getDetailCourseTeacher = async (value: string) => {
  const course: any = await db.course.findFirst({
    include: {
      category: {
        select: {
          title: true,
        },
      },
      section: {
        include: {
          chapter: true,
        },

        orderBy: {
          position: "asc",
        },
      },
      language: {
        select: {
          name: true,
        },
      },
      level: {
        select: {
          name: true,
        },
      },
      prerequisites: true,
    },
    where: { id: decrypting(value) },
  });
  const encryptId = encrypting(String(course?.id));
  if (course) {
    for (let index = 0; index < course.section.length; index++) {
      const section = course.section[index];
      section.id = encrypting(String(section.id));
    }
  }
  const final = { ...course, id: encryptId };
  return final as SingleCourse;
};

export const getDetailCourse = async (value: string) => {
  const course: any = await db.course.findFirst({
    include: {
      category: {
        select: {
          title: true,
        },
      },
      section: {
        include: {
          chapter: {
            include: {
              attachment: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },

        orderBy: {
          position: "asc",
        },
      },
      language: {
        select: {
          name: true,
        },
      },
      level: {
        select: {
          name: true,
        },
      },
      prerequisites: true,
      user: {
        include: {
          teacher: {
            select: {
              imageUrl: true,
              description: true,
              expert: true,
            },
          },
        },
      },
    },
    where: { id: decrypting(value) },
  });
  const encryptId = encrypting(String(course?.id));
  if (course) {
    for (let index = 0; index < course.section.length; index++) {
      const section = course.section[index];
      section.id = encrypting(String(section.id));
      section.courseId = encrypting(String(section.courseId));
    }
  }
  const final = { ...course, id: encryptId };
  return final as courseDetail;
};

export const getMoreCourse = async (value: string, userid: number) => {
  const decryptedId = decrypting(value);
  const course: any = await db.course.findMany({
    where: {
      id: { notIn: [decryptedId] },
      isPublished: true,
      userId: userid,
    },
  });
  for (let index = 0; index < course.length; index++) {
    const csr = course[index];
    csr.id = encrypting(csr.id);
  }
  return course;
};
