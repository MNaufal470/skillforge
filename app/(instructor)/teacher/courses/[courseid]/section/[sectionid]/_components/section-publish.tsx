"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { decrypting } from "@/lib/encrypt-decrypt";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2, ShieldAlert, ShieldBan, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SectionPublish = ({
  value,
  setOpen,
  sectionid,
  courseid,
  isPublished,
}: {
  value: boolean;
  setOpen: (state: boolean) => void;
  sectionid: string;
  courseid: string;
  isPublished: boolean;
}) => {
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    if (!value) {
      return setOpen(true);
    }
    setOpenWarning(true);
  };
  const handleUnOrPublish = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/course/${courseid}/section/${sectionid}/unorpublish`
      );
      toast.success(response.data.message);
      setOpenWarning(false);
      router.refresh();
    } catch (error) {
      console.log("[ERROR UN/PUBLISH]");
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <TooltipProvider delayDuration={10}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                `${value ? "cursor-pointer" : "cursor-not-allowed"}`
              )}
              onClick={handleClick}
            >
              {value ? (
                isPublished ? (
                  <ShieldBan className="text-red-500" />
                ) : (
                  <ShieldCheck className={"text-emerald-400"} />
                )
              ) : (
                <ShieldAlert className="text-yellow-300" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {value
                ? isPublished
                  ? "Unpublish This Section"
                  : "Publish This Section"
                : "Complete all field to publish"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Modal
        open={openWarning}
        setOpen={setOpenWarning}
        title={`${isPublished ? "Unpublish" : "Publish"} this section`}
        description={`Are you sure to ${
          isPublished ? "Unpublish" : "Publish"
        } this section`}
      >
        <div className="flex items-end justify-end gap-x-3">
          <Button
            variant={"default"}
            className="outline-none "
            onClick={handleUnOrPublish}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin " />
            ) : (
              `${isPublished ? "Unpublish" : "Publish"}`
            )}
          </Button>
          <Button
            variant={"outline"}
            className="outline-none"
            onClick={() => setOpenWarning(false)}
          >
            Cancell
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SectionPublish;
