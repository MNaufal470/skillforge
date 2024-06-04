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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import SectionList from "./section-list";

interface CourseSectionFormProps {
  initialData?: Section[];
  courseid: string;
}

const CourseSectionForm = ({
  initialData,
  courseid,
}: CourseSectionFormProps) => {
  const formSchema = z.object({
    title: z.string().min(5, {
      message: "Title is required and must be greater than 5 character",
    }),
  });
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      const response = await axios.post(
        `/api/course/${courseid}/section`,
        values
      );
      setIsCreating(false);
      form.formState.defaultValues = { title: "" };
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const onReorder = async (updateData: { id: number; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/course/${courseid}/section`, { list: updateData });
      toast.success("Section reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: number) => {
    router.push(`/teacher/courses/${courseid}/section/${id}`);
  };
  return (
    <div
      className={`relative mt-6 border bg-slate-100 rounded-md p-4 ${
        initialData && "min-h-200px"
      }`}
    >
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Section
        <Button
          variant={"ghost"}
          onClick={() => setIsCreating((current) => !current)}
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Section
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.length && "text-slate-500 "
          )}
        >
          {!initialData?.length && "Sections has not been set yet."}

          <SectionList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData || []}
            courseid={courseid}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and Drop to reorder the sections
        </p>
      )}
    </div>
  );
};

export default CourseSectionForm;
