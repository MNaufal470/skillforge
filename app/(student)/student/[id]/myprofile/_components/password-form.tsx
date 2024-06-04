"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Pencil } from "lucide-react";
import React, { useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current Password is required",
    }),
    newPassword: z.string().min(1, {
      message: "New Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    path: ["confirmPassword"],
    message: "new Password and Confirm Password dont match!",
  });
const PasswordForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = () => {
    return 1;
  };
  return (
    <div
      className={cn(
        `rounded-md pb-4`,
        isEditing && "border-b-4 border-slate-100 "
      )}
    >
      <div className="font-medium flex items-center justify-between">
        <div className="flex w-full gap-x-3 flex-row  text-[#5F6C76] font-light">
          <div className="w-24">
            <h1>Password :</h1>
          </div>
          {isEditing ? (
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure to change your password ?
                  </DialogTitle>
                  <DialogDescription>
                    Enter a new password below to change your password.
                    <div className="mt-5">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-3"
                        >
                          <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isSubmitting}
                                    type="password"
                                    className="py-6 text-black"
                                    placeholder="Enter your current password"
                                    {...field}
                                    autoFocus
                                  />
                                </FormControl>
                                <FormMessage className="font-light text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isSubmitting}
                                    type="password"
                                    className="py-6 text-black"
                                    placeholder="Enter your new password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="font-light text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isSubmitting}
                                    type="password"
                                    className="py-6 text-black"
                                    placeholder="Enter your confirm password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="font-light text-xs" />
                              </FormItem>
                            )}
                          />
                          <div className="mt-5 flex justify-end gap-x-3">
                            <Button
                              disabled={isSubmitting}
                              variant={"success"}
                              onClick={() => onSubmit()}
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <h3 className="font-normal pl-3">********</h3>
          )}
        </div>
        <div className="flex gap-x-2">
          <Button variant={"outline"} onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
