import React from "react";

interface DetailCardProps {
  title: string;
  subtitle: string;
}

const DetailCard = ({ title, subtitle }: DetailCardProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <p className="text-muted-foreground">{title} :</p>
      <p className="font-semibold text-[#133344]">{subtitle}</p>
    </div>
  );
};

export default DetailCard;
