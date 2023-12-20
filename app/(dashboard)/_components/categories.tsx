"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";
import Aos from "aos";
const Categories = () => {
  let subjects = [
    {
      name: "Business Analytics and Intelligence",
      desc: "Delve into business analytics, focusing on data-driven decision-making, predictive modeling, and performance optimization. Acquire skills to turn data into actionable insights for business growth.",
      img: "/category/stock.png",
    },
    {
      name: "Web Development",
      desc: "Master the fundamentals of web development, including HTML, CSS, and JavaScript. Explore responsive design principles and learn how to create interactive and visually appealing websites.",
      img: "/category/stock.png",
    },
    {
      name: "Digital Marketing Strategies",
      desc: "Dive into the world of digital marketing with courses on SEO, social media marketing, content creation, and online advertising. Develop skills to create effective digital campaigns and enhance brand visibility.",
      img: "/category/stock.png",
    },
    {
      name: "Data Science and Analytics Fundamentals",
      desc: "Explore the basics of data science, covering statistical analysis, data visualization, and introductory machine learning. Gain insights into extracting meaningful information from datasets.",
      img: "/category/stock.png",
    },
    {
      name: "Graphic Design Mastery",
      desc: "Explore the principles of graphic design, including layout, color theory, and typography. Develop proficiency in design tools and unleash your creativity in crafting visually stunning graphics.",
      img: "/category/stock.png",
    },
    {
      name: "Language Learning",
      desc: "Embark on a language learning journey with beginner courses in languages such as Spanish, French, or Mandarin. Acquire basic vocabulary, grammar, and conversational skills.",
      img: "/category/stock.png",
    },
    {
      name: "Leadership and Management Skills",
      desc: "Enhance your leadership abilities with courses on effective communication, team building, and strategic management. Develop skills to lead and inspire teams in diverse professional settings",
      img: "/category/stock.png",
    },
    {
      name: "Artificial Intelligence (AI) Fundamentals",
      desc: "Explore the world of artificial intelligence with courses covering machine learning, neural networks, and AI applications. Understand the ethical considerations surrounding AI and gain insights into how AI is shaping various industries",
      img: "/category/stock.png",
    },
  ];
  const [isAllCategory, setisAllCategory] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    Aos.init({ once: true, duration: 4000 });
  }, []);

  useEffect(() => {
    setisAllCategory(false);
  }, []);

  let renderCategories = subjects.splice(0, isAllCategory ? 8 : 4);

  if (!mounted) {
    return null;
  }
  return (
    <div className="w-full  bg-[#f7f8fd] px-10 md:px-20 2xl:px-40 py-20 ">
      <div className="relative  flex flex-col gap-y-5 md:flex-row justify-start md:justify-between md:items-center ">
        <div className="flex flex-col items-start gap-y-5 justify-start">
          <div className="p-4 px-6 rounded-full bg-[#5F2DED]/10">
            <h3 className="text-[#5F2DED] font-semibold">Course List</h3>
          </div>
          <div className="relative">
            <h1 className=" z-10 text-4xl font-extrabold ">Populer Subjects</h1>
            <div className="bg-[#f2277e]/80 w-[52%] h-2 absolute right-0 bottom-1 z-0" />
          </div>
        </div>
        <Button
          variant={"danger"}
          size={"lg"}
          className="py-7 flex items-center gap-x-1"
          onClick={() => setisAllCategory(true)}
        >
          All Categories
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={`transition-all duration-1000 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 2xl:grid-cols-4 mt-14`}
      >
        {renderCategories.map((item, idx) => (
          <CategoryCard
            key={idx}
            title={item.name}
            desc={item.desc}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
