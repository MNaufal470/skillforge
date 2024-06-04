import { BookOpenCheck, GraduationCap, Trophy } from "lucide-react";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/verifyToken";
import { db } from "@/lib/db";
import { decrypting, encrypting } from "@/lib/encrypt-decrypt";

async function getData(id: string) {
  const decryptedId = decrypting(id);
  const response: any = await db.course.findMany({
    where: {
      userId: decryptedId,
    },
    include: {
      category: {
        select: { title: true },
      },
    },
  });
  for (let crs of response) {
    crs.id = encrypting(String(crs.id));
  }
  return response;
}
const page = async () => {
  const token = cookies().get("access-token");
  const user = await verifyAuth(token?.value!);
  const data = await getData(user.id!);
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      <div className="w-full pb-3 border-b-2 border-[#dddd]">
        <h1 className="font-bold text-xl">My Courses</h1>
      </div>
      <div className="mt-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;
