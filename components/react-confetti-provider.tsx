"use client";

import { useConfettiStore } from "@/zustand/use-confetti-store";
import React from "react";
import ReactConfetti from "react-confetti";

const ConffetiProvider = () => {
  const confetti = useConfettiStore();
  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      className="pointer-events-none z-[100] h-full"
      numberOfPieces={1000}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};

export default ConffetiProvider;
