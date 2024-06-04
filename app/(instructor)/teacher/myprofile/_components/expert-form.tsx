"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ExpertFormProps {
  initialData?: string | null;
}

const formSchema = z.object({
  expert: z.string().min(1, {
    message: "First Name is required",
  }),
});

const ExpertForm = ({ initialData }: ExpertFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { expert: initialData || "" },
  });

  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.expert === initialData) {
        toast.error("You cannot update the same title as the previous one.", {
          style: { textAlign: "center" },
        });
        return;
      }
      try {
        const response = await axios.put(`/api/teacher`, values);
        setIsEditing(false);
        toast.success(response.data.message);
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    } catch (error) {
      toast.error;
    }
  };
  return (
    <div className="border-b border-slate-100 rounded-md pb-4">
      <div className="font-medium flex  ">
        <div className="w-full flex gap-x-3 flex-row  text-[#5F6C76] font-light">
          <h1 className="w-24">Expert :</h1>
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 items-center gap-x-3"
              >
                <FormField
                  control={form.control}
                  name="expert"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'Development/Networking'"
                          className="text-black"
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2 mr-2">
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <h3 className="font-normal pl-3">
              {initialData || "Expert has not been set yet."}
            </h3>
          )}
        </div>
        <div className="flex gap-x-2 ">
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

export default ExpertForm;
