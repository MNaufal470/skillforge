"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface RegisterProps {
  setIsLoginTab: (value: boolean) => void;
}

const formSchema = z
  .object({
    firstname: z.string().min(1, { message: "First name is required!" }),
    lastname: z.string().min(1, { message: "Last name is required!" }),
    username: z.string().min(1, { message: "Username is required!" }),
    email: z
      .string()
      .min(1, { message: "Email is required!" })
      .email("Please input a valid email!"),
    password: z.string().min(1, { message: "password is required!" }),
    Cpassword: z.string().min(1, { message: "confirm password is required!" }),
  })
  .refine((data) => data.password === data.Cpassword, {
    path: ["Cpassword"],
    message: "Password and Confirm Password dont match!",
  });

const SignUp = ({ setIsLoginTab }: RegisterProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      Cpassword: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const handleSubmit = () => {};
  return (
    <div
      className="bg-white rounded-md p-10 w-[650px] shadow-xl "
      // data-aos="flip-left"
      // data-aos-duration="1000"
      // data-aos-easing="ease-in-out"
    >
      <div className="flex items-center flex-col gap-y-2">
        <h1 className="text-2xl font-extrabold">Sign Up</h1>
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setIsLoginTab(true)}
          >
            Log In
          </span>
        </p>
      </div>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firsname</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="py-6"
                        placeholder="first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="py-6"
                        placeholder="last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="py-6"
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="py-6"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="py-6"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Cpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className="py-6"
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button variant={"success"} type="submit" className="w-full py-6">
                {isSubmitting ? (
                  <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
