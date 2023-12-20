import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prerequisites } from "@/constant/prerequisites";
import { Check } from "lucide-react";
import React from "react";

const Prerequisites = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            What are the prerequisites for starting this course?
          </CardTitle>
          <CardDescription>
            You need to understand some materials to comprehend this course.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className=" grid gap-y-5">
            {prerequisites.map((item, idx) => (
              <div className="flex items-center gap-x-2" key={idx}>
                <div className="bg-icon p-1 rounded-md">
                  <Check className="text-[#5f2ded] h-4 w-4 2xl:w-6 2xl:h-6" />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prerequisites;
