import { formatToRupiah } from "@/lib/rupiah";
import React from "react";

const AuthorMoreCourse = () => {
  return (
    <div className="p-5 bg-white rounded-md w-full">
      <h1 className="pl-2 border-l-2 border-bluePrimary">
        Author More Courses
      </h1>

      <div className="space-y-5 mt-10">
        <div className="flex items-center gap-x-3 border-b border-[#dddd] pb-3">
          <img
            src="/reviews/blog_2.png"
            alt=""
            className="w-24 h-24 object-cover rounded-sm"
          />
          <div>
            <h3 className="text-bluePrimary">{formatToRupiah(125000)}</h3>
            <h1 className="font-bold leading-5">
              The Complete Python Bootcamp From Zero to Hero in Python
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-x-3 border-b border-[#dddd] pb-3">
          <img
            src="/reviews/blog_2.png"
            alt=""
            className="w-24 h-24 object-cover rounded-sm"
          />
          <div>
            <h3 className="text-bluePrimary">{formatToRupiah(125000)}</h3>
            <h1 className="font-bold leading-5">
              The Complete Python Bootcamp From Zero to Hero in Python
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-x-3 border-b border-[#dddd] pb-3">
          <img
            src="/reviews/blog_2.png"
            alt=""
            className="w-24 h-24 object-cover rounded-sm"
          />
          <div>
            <h3 className="text-bluePrimary">{formatToRupiah(125000)}</h3>
            <h1 className="font-bold leading-5">
              The Complete Python Bootcamp From Zero to Hero in Python
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorMoreCourse;
