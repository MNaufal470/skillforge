import { db } from "@/lib/db";

export const getLevels = async () => {
  const data = await db.mst_levels.findMany();
  return data;
};
