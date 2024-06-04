"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { Chapter } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

interface ChapterVideoForm {
  initialData: Chapter;
  courseid: string;
  chapterid: string;
  sectionid: string;
}
const ChapterVideoForm = ({
  initialData,
  courseid,
  chapterid,
  sectionid,
}: ChapterVideoForm) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { videoUrl: initialData?.videoUrl || "" },
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/course/${courseid}/section/${sectionid}/chapter/${chapterid}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch (err) {
      toast.error("Someting went wrong!");
      console.log(err);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {!isEditing && initialData?.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer src={initialData.videoUrl} />
          </div>
        ))}
      {isEditing && (
        <div className="cursor-pointer">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapters Video
          </div>
        </div>
      )}
      {initialData?.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
