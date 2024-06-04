import { db } from "@/lib/db";
import { Teacher } from "@prisma/client";

export const getTeacher = async (id: number, isJoin = false) => {
  if (isJoin) {
    const data = await db.teacher.findFirst({
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
      },
      where: { userId: id },
    });
    return data as Teacher & { user: { firstname: string; lastname: string } };
  } else {
    const data = await db.teacher.findFirst({
      where: { userId: id },
    });
    return data as Teacher & { user: { firstname: string; lastname: string } };
  }
};
