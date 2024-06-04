import React from "react";
import Hero from "./_components/hero";
import Partners from "./_components/partners";
import About from "./_components/about";
import Categories from "./_components/categories";
import CoursesList from "./_components/courses-list";
import SubscribeEmails from "./_components/email-subscribe";
import { getCourse } from "@/action/get-course";

const page = async () => {
  const course = await getCourse();
  return (
    <div className="relative ">
      <div className="relative">
        <Hero />
        <Partners />
      </div>
      <About />
      <Categories />
      <SubscribeEmails />

      <CoursesList course={course} />
    </div>
  );
};

export default page;
