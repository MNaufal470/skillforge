import React from "react";
import StudentHeader from "./_components/student-header";
import StudentSidebar from "./_components/student-sidebar";

const studentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative bg-[#fbfbfb]">
        <div className="relative section">
          <StudentHeader />
          <div className="py-10 flex flex-col gap-y-10 lg:flex-row gap-x-10">
            <StudentSidebar />
            <div className="w-full px-10 lg:px-0">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default studentLayout;
