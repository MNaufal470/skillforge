"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface ModalProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  preview?: boolean;
}
const Modal = ({
  open,
  setOpen,
  title,
  description,
  children,
  preview = false,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`${preview ? "bg-[#2d2f31] border-none text-white" : ""}`}
      >
        <DialogHeader>
          <DialogTitle className={`${preview ? "text-[#d1d7dc]" : ""}`}>
            {title}
          </DialogTitle>
          <DialogDescription style={{ color: preview ? "white" : "" }}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
