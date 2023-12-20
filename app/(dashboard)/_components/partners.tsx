import Image from "next/image";
import React from "react";

const Partners = () => {
  return (
    <div className="max-w-[90%] lg:max-w-[75%] mx-auto w-full bg-white rounded-md shadow-lg md:absolute md:-bottom-28 lg:-bottom-16 md:left-[50%] md:-translate-x-1/2 z-10">
      <div className="flex flex-wrap items-center justify-center md:justify-between p-10 gap-10">
        {Array.from({ length: 5 }).map((_, idx) => (
          <img
            src={`/brand_${idx + 1}.png`}
            alt="brand-1"
            className="w-[115px] lg:w-[150px] object-cover"
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
