import Navbar from "@/app/(dashboard)/_components/navbar";
import Footer from "@/components/footer";
import React from "react";
import StudentHeader from "./_components/student-header";
import StudentSidebar from "./_components/student-sidebar";

const studentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative bg-[#fbfbfb]">
        <div className="relative section">
          <StudentHeader />
          <div className="py-10 flex gap-x-10">
            <StudentSidebar />
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default studentLayout;
