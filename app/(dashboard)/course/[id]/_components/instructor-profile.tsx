import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const InstructorProfile = () => {
  return (
    <div className="pt-10 md:pt-0">
      <Card>
        <CardContent className="space-y-2 pt-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-x-6 ">
            <img
              src="/reviews/teacher__2.png"
              alt=""
              className="w-24 h-24 object-cover"
            />
            <div className="space-y-1 text-center md:text-left">
              <h1 className="font-bold">Tommy Zeed Musique</h1>
              <p className="text-muted-foreground text-xs">
                Blogger/Photographer
              </p>
              <p className="text-muted-foreground !mt-3">
                An Instructor Web Development LMS prioritizes collaboration and
                community engagement within the learning environment. It fosters
                communication between instructors and students through forums,
                live coding sessions, project collaborations, and mentorship
                opportunities, encouraging a supportive and interactive
                community.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorProfile;
