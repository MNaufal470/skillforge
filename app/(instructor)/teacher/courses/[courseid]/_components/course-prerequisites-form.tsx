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
import { Prerequisites } from "@prisma/client";
import axios from "axios";
import { Check, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface CoursePrerequisitesFormProps {
  initialData?: Prerequisites[];
  courseid: string;
}

const CoursePrerequisitesForm = ({
  initialData,
  courseid,
}: CoursePrerequisitesFormProps) => {
  const formSchema = z.object({
    name: z.string().min(5, {
      message: "Name is required and must be greater than 5 character",
    }),
  });
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/course/${courseid}/prerequisite`,
        { name: values.name }
      );
      setIsCreating(false);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  const onDelete = async (id: number) => {
    try {
      setDeletingId(id);
      const response = await axios.patch(
        `/api/course/${courseid}/prerequisite`,
        {
          prerequisiteId: id,
        }
      );
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Prerequisite
        <Button
          variant={"ghost"}
          onClick={() => setIsCreating((current) => !current)}
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Prerequisite
            </>
          )}
        </Button>
      </div>
      <div className="space-y-3">
        {!isCreating &&
          initialData!.length > 0 &&
          initialData?.map((pre, idx) => (
            <div
              key={pre.id}
              className="flex items-center p-3 w-full  border  rounded-md"
            >
              <p className="text-xs line-clamp-1 ">
                {idx + 1}. {pre.name}
              </p>
              {deletingId === pre.id && (
                <div className="ml-auto">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {deletingId !== pre.id && (
                <button
                  onClick={() => onDelete(pre.id)}
                  className="ml-auto hover:opacity-75 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
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

export default CoursePrerequisitesForm;
