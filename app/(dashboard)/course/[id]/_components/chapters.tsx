import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { chapters } from "@/constant/chapter";
import ChapterItem from "./chapter-item";
import { cn } from "@/lib/utils";

export default function Chapters() {
  const [accordionActive, setAccordionActive] = useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    if (accordionActive === value) {
      return setAccordionActive(null);
    }
    setAccordionActive(value);
  };
  return (
    <div className="mt-10">
      <Accordion type="single" collapsible className="w-full space-y-5">
        {chapters.map((item, idx) => (
          <AccordionItem
            value={item.title}
            key={idx}
            className={cn(`border-none bg-white rounded-md w-full`)}
            onClick={() => toggleAccordion(item.title)}
          >
            <AccordionTrigger
              className={cn(
                "!no-underline   w-full h-full px-5 pr-1 flex justify-between items-center",
                accordionActive === item.title && "bg-[#e7f1ff]"
              )}
            >
              <h1 className="font-extrabold text-lg">{item.title}</h1>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {item.chapter.map((cpt, idx) => (
                  <ChapterItem
                    label={cpt.title}
                    isLock={cpt.isFree ? false : true}
                    key={idx}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
