import { BookOpenCheck, GraduationCap, Trophy } from "lucide-react";
import React from "react";
import FirstNameForm from "./_components/first-name-form";
import LastNameForm from "./_components/last-name-form";
import UsernameForm from "./_components/username-form";
import EmailForm from "./_components/email-form";
import PasswordForm from "./_components/password-form";

const page = () => {
  return (
    <div className="p-10 w-full bg-white shadow-2xl rounded-xl">
      <div className="w-full pb-3 border-b-2 border-[#dddd]">
        <h1 className="font-bold text-xl">My Profile</h1>
      </div>
      <div className="mt-10 space-y-3">
        <FirstNameForm />
        <LastNameForm />
        <UsernameForm />
        <EmailForm />
        <PasswordForm />
      </div>
    </div>
  );
};

export default page;
