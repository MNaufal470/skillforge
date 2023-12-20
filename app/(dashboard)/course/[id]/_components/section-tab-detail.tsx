"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Book, ListTodo, Star, User } from "lucide-react";
import Chapters from "./chapters";
import Prerequisites from "./prerequisites";
const SectionTabDetails = () => {
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
      value: "instrucor",
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
        <TabsList className="grid w-full grid-cols-4 h-20">
          {tabHeader.map((item, idx) => (
            <TabsTrigger
              key={idx}
              value={item.value}
              className={cn(
                `h-16 flex items-center gap-x-1 !text-black capitalize bg-white `,
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
          <Chapters />
        </TabsContent>
        <TabsContent value="prerequisites">
          <Prerequisites />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionTabDetails;
