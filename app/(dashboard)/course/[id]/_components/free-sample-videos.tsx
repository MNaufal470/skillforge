import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { PlaySquareIcon } from "lucide-react";
import React, { useState } from "react";

const FreeSampleVideos = ({
  preview,
}: {
  preview: { title: string; video: string }[];
}) => {
  const [active, setActive] = useState(preview[0]);

  return (
    <div>
      <MuxPlayer
        src={active.video}
        autoPlay
        className="w-full text-white"
        title={active.title}
      />
      <div className="text-[#d1d7dc] pt-6">
        <h3 className="text-sm">Free Sample Videos:</h3>
        <div className="pt-4 space-y-3">
          {preview.map((item, idx) => (
            <div
              className={cn(
                "flex items-center gap-x-2 w-full cursor-pointer  py-3 pl-3 rounded-md",
                item.video === active.video && "bg-white/5"
              )}
              key={idx}
              onClick={() => setActive(item)}
            >
              <span>{idx + 1}.</span>
              {item.video === active.video && <PlaySquareIcon />}
              <h1>{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeSampleVideos;
