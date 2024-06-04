import React from "react";

import ExpertForm from "./_components/expert-form";
import BiographyForm from "./_components/biography-form";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/verifyToken";
import { decrypting } from "@/lib/encrypt-decrypt";
import { getTeacher } from "@/action/get-teacher";
import TeacherImageForm from "./_components/teacher-image-form";

const page = async () => {
  const token = cookies().get("access-token");
  const user = await verifyAuth(token?.value!);
  const decryptedId = decrypting(user.id!);
  const data = await getTeacher(decryptedId);
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      <div className="w-full pb-3 border-b-2 border-[#dddd]">
        <h1 className="font-bold text-xl">My Profile</h1>
      </div>
      <div className="mt-10 space-y-3">
        <TeacherImageForm userid={user.id} initialData={data?.imageUrl} />
        <ExpertForm initialData={data?.expert} />
        <BiographyForm initialData={data?.description} />
      </div>
    </div>
  );
};

export default page;
