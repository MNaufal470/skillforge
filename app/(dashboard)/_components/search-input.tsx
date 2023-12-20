"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-full relative">
      <Search className="h-4 w-4 absolute top-4 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className=" w-[95%] py-6 md:w-[450px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a course"
      />
    </div>
  );
};

export default SearchInput;
