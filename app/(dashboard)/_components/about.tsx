import { Check } from "lucide-react";
import React from "react";

const About = () => {
  let advantage = [
    "Flexibility and Accessibility",
    "Personalized Learning Paths",
    "Real-time Progress Tracking",
    "Collaborative Learning Spaces",
    "Assessment and Feedback",
    "Mobile Accessibility",
  ];
  return (
    <div className="relative bg-[#f7f8fd]/50 py-10 md:py-40 px-5 md:px-20 2xl:px-40 w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-20">
        <div className="relative w-full flex items-center justify-center">
          <img
            src="/about_12.png"
            alt=""
            className="z-10 relative object-cover md:w-[350px] 2xl:w-auto"
          />
          <img
            src="/about_13.png"
            alt=""
            className="absolute top-0 z-[2]  md:w-[450px] 2xl:w-auto"
          />
        </div>
        <div className="w-full">
          <div className="max-w-xl">
            <h1 className="text-lg tracking-widest text-red-500 font-bold">
              EDUCATION SOLUTION
            </h1>
            <h3 className="text-3xl md:text-5xl font-extrabold my-5 tracking-wide md:tracking-wider leading-tight">
              Welcome to the online Learning Center
            </h3>
            <p className="tracking-wide  pl-3 border-l-4 border-[#5f2ded] text-muted-foreground">
              Experience the future of learning with our LMS application, where
              innovation meets education to create a more engaging,
              personalized, and effective learning environment for all users.
            </p>
            <div className="mt-10 grid md:grid-cols-2 gap-y-5">
              {advantage.map((item, idx) => (
                <div className="flex items-center gap-x-5" key={idx}>
                  <div className="bg-icon p-1 rounded-md">
                    <Check className="text-[#5f2ded] h-4 w-4 2xl:w-6 2xl:h-6" />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
