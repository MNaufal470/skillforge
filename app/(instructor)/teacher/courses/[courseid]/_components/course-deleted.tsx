"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CourseDeleted = ({
  value,
  setOpen,
  courseid,
  isPublished,
  title,
}: {
  value: boolean;
  setOpen: (state: boolean) => void;
  courseid: string;
  isPublished: boolean;
  title: string;
}) => {
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textValue, setTextValue] = useState("");
  const router = useRouter();
  const handleClick = async () => {
    setOpenWarning(true);
  };
  const handleUnOrPublish = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/course/${courseid}`);
      toast.success(response.data.message);
      setOpenWarning(false);
      router.refresh();
      router.push("/teacher/courses");
    } catch (error: any) {
      console.log("[ERROR UN/PUBLISH]", error);
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
      setOpenWarning(false);
    }
  };

  let isValidToSubmit = `${textValue}` === `delete ${title}`;
  return (
    <>
      <TooltipProvider delayDuration={10}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("cursor-pointer")}
              onClick={handleClick}
            >
              <Trash2 className="text-red-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete This Course</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Modal
        open={openWarning}
        setOpen={setOpenWarning}
        title={`Delete this course`}
        description={`To confirm, type "delete ${title}" in the box below`}
      >
        <div className="flex flex-col gap-y-3">
          <Input
            className="border border-[#f2277e]"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button
            variant={"danger"}
            className="outline-none w-full !bg-none"
            onClick={handleUnOrPublish}
            disabled={isLoading || !isValidToSubmit}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin " />
            ) : (
              `Delete`
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CourseDeleted;
