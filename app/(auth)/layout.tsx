import Navbar from "@/app/(dashboard)/_components/navbar";
import Footer from "@/components/footer";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className=" ">{children}</div>
      <Footer />
    </>
  );
};

export default AuthLayout;
