"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachment, Chapter } from "@prisma/client";
import axios from "axios";
import { File, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ChapterAttachmentFormProps {
  initialData?: Attachment[] | [];
  chapterid: number;
  courseid: string;
  sectionid: string;
}
const formSchema = z.object({
  fileUrl: z.string().min(5, { message: "Attachment is required field" }),
});

const ChapterAttachmentForm = ({
  initialData,
  courseid,
  chapterid,
  sectionid,
}: ChapterAttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { fileUrl: initialData || undefined },
  });

  const onSubmit = async (values: z.infer<typeof formSchema> | any) => {
    try {
      const response = await axios.patch(
        `/api/course/${courseid}/section/${sectionid}/chapter/${chapterid}/attachment`,
        values
      );
      setIsEditing(false);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };
  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await axios.delete(
        `/api/course/${courseid}/section/${sectionid}/chapter/${chapterid}/attachment/${id}`
      );
      setIsEditing(false);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Attachment
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an File
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData!.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              Attachment has not been set yet.
            </p>
          )}
          {initialData!.length > 0 && (
            <div className="space-y-2">
              {initialData!.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p
                    className="text-xs line-clamp-1 cursor-pointer hover:underline"
                    onClick={() => handleClick(attachment.fileUrl)}
                  >
                    {attachment.title}
                  </p>
                  {deletingId === String(attachment.id) && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== String(attachment.id) && (
                    <button
                      onClick={() => onDelete(String(attachment.id))}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div className="cursor-pointer">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ fileUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterAttachmentForm;
