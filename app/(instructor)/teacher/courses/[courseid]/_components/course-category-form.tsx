"use client";
import Editor from "@/components/editor-quill";
import Preview from "@/components/preview-quill";
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
import ComboboxCategoryInput from "./combobox-category-input";

interface CourseCategoryFormProps {
  initialData?: string;
  courseid: string;
  options_ctg: {
    label: string;
    value: number;
  }[];
}

const CourseCategoryForm = ({
  initialData,
  courseid,
  options_ctg,
}: CourseCategoryFormProps) => {
  const formSchema = z.object({
    categoryId: z.string().min(5, {
      message: "Category is required",
    }),
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: initialData || "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let id = options_ctg.find((ctg) => ctg.label === values.categoryId)?.value;
    if (values.categoryId === initialData) {
      toast.error("You cannot update the same category as the previous one.", {
        style: { textAlign: "center" },
      });
      return;
    }
    try {
      const response = await axios.patch(`/api/course/${courseid}`, {
        categoryId: id,
      });
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
        Course Category
        <Button
          variant={"ghost"}
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData || "Category has not been set yet."}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboboxCategoryInput
                      disabled={isSubmitting}
                      options={options_ctg}
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

export default CourseCategoryForm;
