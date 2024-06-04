"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Book, ListTodo, Star, User } from "lucide-react";
import Chapters from "./chapters";
import Prerequisites from "./prerequisites";
import Reviews from "./reviews";
import InstructorProfile from "./instructor-profile";
import { courseDetail } from "@/action/get-course";
const SectionTabDetails = ({ course }: { course: courseDetail }) => {
  let tabHeader = [
    {
      value: "curriculum",
      icon: Book,
    },
    {
      value: "prerequisites",
      icon: ListTodo,
    },
    {
      value: "reviews",
      icon: Star,
    },
    {
      value: "Instructor",
      icon: User,
    },
  ];
  const [tabActive, setTabActive] = useState<string>("curriculum");
  const toggleTabActive = (value: string) => {
    if (value === tabActive) return null;
    setTabActive(value);
  };
  return (
    <div className="mt-10">
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-20 pb-36 md:pb-0">
          {tabHeader.map((item, idx) => (
            <TabsTrigger
              key={idx}
              value={item.value}
              className={cn(
                `h-20 md:h-16 flex items-center gap-x-1 !text-black capitalize bg-white `,
                tabActive === item.value && "!bg-bluePrimary !text-white"
              )}
              onClick={() => setTabActive(item.value)}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  tabActive === item.value ? "text-white" : "text-black"
                )}
              />
              {item.value}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="curriculum">
          <Chapters section={course.section} />
        </TabsContent>
        <TabsContent value="prerequisites">
          <Prerequisites prerequisites={course.prerequisites} />
        </TabsContent>
        <TabsContent value="reviews">
          <Reviews />
        </TabsContent>
        <TabsContent value="Instructor">
          <InstructorProfile teacher={course.user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionTabDetails;
