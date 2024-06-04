"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import NewCourseForm from "./new-course-form";
const ModalNewCourse = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"success"}
          className="outline-none border-none"
          type="button"
        >
          Add New Course <ChevronRight className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new course</DialogTitle>
          <DialogDescription className="pb-4">
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </DialogDescription>
          <NewCourseForm setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalNewCourse;
