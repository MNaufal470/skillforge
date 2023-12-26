import { Button } from "@/components/ui/button";
import { formatToRupiah } from "@/lib/rupiah";
import { Play, RecycleIcon } from "lucide-react";
import React from "react";

const CourseSidebarPreviewMain = () => {
  return (
    <div className="space-y-3">
      <div className="relative cursor-pointer">
        <img
          src="/reviews/blog_1.png"
          alt=""
          className="w-full h-full object-cover rounded-md"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-redPrimary p-5 rounded-full flex justify-center items-center">
          <Play className="text-white w-8 h-8" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent  flex justify-center items-center duration-2000">
          <div className="animate-ping border border-redPrimary p-6  rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent  flex justify-center items-center ">
          <div className="animate-ping border border-redPrimary p-8  rounded-full"></div>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-xl text-bluePrimary font-bold">
          {formatToRupiah(100000)}
        </h3>
        <div className="flex flex-col gap-y-2">
          <Button variant={"success"} className={"font-normal text-base py-6"}>
            Add To Cart
          </Button>
          <Button variant={"danger"} className={"font-normal text-base py-6"}>
            Buy Now
          </Button>
        </div>
        <div className="flex items-center justify-center text-muted-foreground text-sm gap-x-1">
          <RecycleIcon />
          <span className="">45-Days Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebarPreviewMain;
