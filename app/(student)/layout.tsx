import Navbar from "@/app/(dashboard)/_components/navbar";
import Footer from "@/components/footer";
import React from "react";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="py-20">{children}</div>
      <Footer />
    </>
  );
};

export default StudentLayout;
