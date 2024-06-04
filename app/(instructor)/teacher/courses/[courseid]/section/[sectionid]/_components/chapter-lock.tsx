import { Lock } from "lucide-react";
import React from "react";

const ChapterLock = () => {
  return (
    <div className="flex justify-center items-center py-20 flex-col gap-5">
      <Lock className="w-10 h-10" />
      <p>To make changes, Section must be unpublished first.</p>
    </div>
  );
};

export default ChapterLock;
