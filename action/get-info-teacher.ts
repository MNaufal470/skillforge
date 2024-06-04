import { db } from "@/lib/db";
import { decrypting } from "@/lib/encrypt-decrypt";
import { verifyAuth } from "@/lib/verifyToken";

export const getInfoTeacher = async (info: string, cookies: string) => {
  const verifyUserCookie = await verifyAuth(cookies);
  if (info === "courses") {
    const data = await db.course.findMany({
      where: {
        userId: decrypting(verifyUserCookie.id!),
      },
    });
    return data.length;
  }
};
