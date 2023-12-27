"use client";
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

interface LoginProps {
  setIsLoginTab: (value: boolean) => void;
}
const formSchema = z.object({
  username: z.string().min(1, { message: "Username or email is required!" }),
  password: z.string().min(1, { message: "password is required!" }),
});

const Login = ({ setIsLoginTab }: LoginProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });
  const { isSubmitting, isValid } = form.formState;
  const handleSubmit = () => {
    try {
      setTimeout(() => console.log("wow"), 5000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="bg-white rounded-md p-10 w-[650px] shadow-xl "
      // data-aos="flip-right"
      // data-aos-duration="1000"
      // data-aos-easing="ease-in-out"
    >
      <div className="flex items-center flex-col gap-y-2">
        <h1 className="text-2xl font-extrabold">Login</h1>
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account yet?{" "}
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setIsLoginTab(false)}
          >
            Sign up{" "}
          </span>{" "}
          for free
        </p>
      </div>
      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-7"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="py-6"
                      placeholder="Your username or email"
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
                      type="password"
                      disabled={isSubmitting}
                      className="py-6"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-5">
              <Button
                variant={"success"}
                type="submit"
                className="w-full py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
