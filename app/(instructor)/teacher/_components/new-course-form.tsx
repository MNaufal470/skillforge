"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface NewCourseFormProps {
  setOpen: (state: boolean) => void;
}

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title is required and must be greater than 5 character",
  }),
});
const NewCourseForm = ({ setOpen }: NewCourseFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;

  const handleSubmitTitle = async (value: { title: string }) => {
    try {
      if (!isValid && isSubmitting) {
        toast.error("Please input a required field!");
      }
      const response = await axios.post("/api/course/create", value);
      setOpen(false);
      toast.success("Course created successfully!");
      router.push(`/teacher/courses/${response.data.data.courseId}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitTitle)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="text"
                    className="py-6 text-black"
                    placeholder="e.g. 'Advanced web development'"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-light text-xs" />
              </FormItem>
            )}
          />
          <div className="mt-5 flex justify-end gap-x-3">
            <Button variant={"success"}>
              {isSubmitting ? (
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewCourseForm;
