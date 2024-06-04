"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface SectionTitleFormProps {
  initialData?: string;
  sectionid: string;
  courseid: string;
}

const SectionTitleForm = ({
  initialData,
  sectionid,
  courseid,
}: SectionTitleFormProps) => {
  const formSchema = z.object({
    title: z.string().min(5, {
      message: "Title is required and must be greater than 5 character",
    }),
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: initialData || "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.title === initialData) {
      toast.error("You cannot update the same title as the previous one.", {
        style: { textAlign: "center" },
      });
      return;
    }
    try {
      const response = await axios.patch(
        `/api/course/${courseid}/section/${sectionid}`,
        values
      );
      setIsEditing(false);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 h-fit">
      <div className="font-medium flex items-center justify-between">
        Section Title
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction Course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SectionTitleForm;
