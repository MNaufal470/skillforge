import { Card, CardContent } from "@/components/ui/card";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

const InstructorProfile = ({
  teacher,
}: {
  teacher: User & {
    teacher: {
      imageUrl: string;
      description: string;
      expert: string;
    }[];
  };
}) => {
  return (
    <div className="pt-10 md:pt-0">
      <Card>
        <CardContent className="space-y-2 pt-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-x-6 ">
            <Image
              src={teacher.teacher[0].imageUrl}
              alt={teacher.firstname}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-full"
            />

            <div className="space-y-1 text-center md:text-left">
              <h1 className="font-bold">{`${teacher.firstname} ${teacher.lastname}`}</h1>
              <p className="text-muted-foreground text-xs">
                {teacher.teacher[0].expert}
              </p>
              <p className="text-muted-foreground !mt-3">
                {teacher.teacher[0].description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorProfile;
