import { File, X } from "lucide-react";
import React from "react";

const ChapterAttachments = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
        <File className="h-4 w-4 mr-2 flex-shrink-0" />
        <p
          className="text-xs line-clamp-1 cursor-pointer hover:underline"
          // onClick={() => handleClick(attachment.fileUrl)}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, corporis
          sunt. Minima, aperiam alias! Provident veniam expedita saepe?
          Quisquam, saepe.
        </p>
        {/* {deletingId === String(attachment.id) && (
        <div className="ml-auto">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )} */}
      </div>
    </div>
  );
};

export default ChapterAttachments;
