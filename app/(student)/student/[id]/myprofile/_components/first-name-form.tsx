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

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
});
const FirstNameForm = () => {
  const [isEditing, setIsEditing] = useState<any>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "James" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = () => {};
  return (
    <div
      className={cn(
        `rounded-md pb-4`,
        isEditing && "border-b-4 border-slate-100 "
      )}
    >
      <div className="font-medium flex items-center justify-between">
        <div className="flex w-full gap-x-3 flex-row  text-[#5F6C76] font-light">
          <div className="lg:w-24">
            <h1>First Name :</h1>
          </div>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex w-full">
                      <FormControl>
                        <Input
                          autoFocus
                          disabled={isSubmitting}
                          placeholder="Input your first name"
                          {...field}
                          className="border-none rounded-none focus-visible:ring-bluePrimary py-0 h-auto text-black font-normal text-base focus-visible:ring-0  "
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <h3 className="font-normal pl-3">James</h3>
          )}
        </div>
        <div className="flex gap-x-2">
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          )}
          <Button variant={"outline"} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstNameForm;
