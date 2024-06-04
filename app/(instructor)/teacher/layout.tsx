import React from "react";
import TeacherHeader from "./_components/teacher-header";
import TeacherSidebar from "./_components/teacher-sidebar";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/verifyToken";
import { decrypting } from "@/lib/encrypt-decrypt";
import { getTeacher } from "@/action/get-teacher";

const teacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get("access-token");
  const user = await verifyAuth(token?.value!);
  const decryptedId = decrypting(user.id!);
  console.log({ decryptedId });
  const data = await getTeacher(decryptedId, true);
  console.log({ data });
  return (
    <>
      <div className="relative py-20 ">
        <div className="relative section">
          <TeacherHeader data={data} />
          <div className="py-10 flex flex-col lg:flex-row gap-x-10">
            <TeacherSidebar />
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default teacherLayout;
