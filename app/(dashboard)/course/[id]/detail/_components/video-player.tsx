"use client";
import MuxPlayer from "@mux/mux-player-react";
import React from "react";

const VideoPlayer = () => {
  return (
    <div className="px-5 flex justify-center ">
      <MuxPlayer
        src={
          "https://utfs.io/f/adf2a8a9-e1dc-4f56-b6d4-3844c64cea2f-plfhjq.mp4"
        }
        className="w-full "
        title="chapter number just got edited"
      />
    </div>
  );
};

export default VideoPlayer;
