import { db } from "@/lib/db";

export const getLanguages = async () => {
  const data = await db.mst_languages.findMany();
  return data;
};
