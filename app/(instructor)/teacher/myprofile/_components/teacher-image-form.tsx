"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface TeacherImageFormProps {
  initialData?: string | any;
  userid: string | undefined;
}
const formSchema = z.object({
  imageUrl: z.string().min(5, { message: "Image is required field" }),
});

const TeacherImageForm = ({ initialData, userid }: TeacherImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: initialData || undefined },
  });

  const onSubmit = async (values: z.infer<typeof formSchema> | any) => {
    try {
      if (initialData) {
        await axios.delete("/api/uploadthing", {
          data: {
            url: initialData,
          },
        });
      }
      const response = await axios.put(`/api/teacher/`, values);
      setIsEditing(false);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 mb-14">
      <div className="font-medium flex items-center justify-between">
        Teacher Image
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData ? (
          <div className="flex flex-col items-center justify-center h-60 bg-slate-200 rounded-md ">
            <ImageIcon className="h-10 w-10 text-slate-500" />
            <p className="text-sm mt-2 font-semibold">
              {initialData || "Image has not been set yet."}
            </p>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-contain rounded-md"
              src={initialData}
            />
          </div>
        ))}
      {isEditing && (
        <div className="cursor-pointer">
          <FileUpload
            endpoint="teacherImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
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

export default TeacherImageForm;
