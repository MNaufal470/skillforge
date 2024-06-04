"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface BiographyFormProps {
  initialData: string | null;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "First Name is required",
  }),
});
const BiographyForm = ({ initialData }: BiographyFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isValid && initialData === values.description) {
        return toast.error(
          "You cannot update the same title as the previous one."
        );
      }
      const response = await axios.put("/api/teacher", values);
      setIsEditing(false);
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className=" border-b border-slate-100 rounded-md pb-4 ">
      <div className=" font-medium flex items-center justify-between">
        <div className="w-full flex flex-col gap-y-3  pr-10  text-[#5F6C76] font-light">
          <h1 className="w-24">Biography :</h1>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="w-full">
                        <Textarea
                          disabled={isSubmitting}
                          placeholder="e.g. 'This course is about.....'"
                          {...field}
                          className="w-full min-h-[150px] h-full text-black ring-0 outline-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <p className="font-normal">
              {initialData || "Biography has not been set yet."}
            </p>
          )}
        </div>
        <div className="flex gap-x-2">
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          )}
          <Button variant={"outline"} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BiographyForm;
