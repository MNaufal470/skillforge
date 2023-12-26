import Stars from "@/components/star";
import React from "react";
import ReviewCard from "./review-card";

const Reviews = () => {
  let reviewsData = [
    {
      star: 5,
      count: 10,
    },
    {
      star: 4,
      count: 2,
    },
    {
      star: 3,
      count: 3,
    },
    {
      star: 2,
      count: 2,
    },
    {
      star: 1,
      count: 1,
    },
  ];

  return (
    <div className="pt-5">
      <div className="flex flex-col gap-y-5 md:flex-row items-center  gap-x-10">
        <div className="flex flex-col gap-y-3 justify-center items-center p-9 px-16 bg-white rounded-md">
          <h1 className="font-extrabold text-7xl">5.0</h1>
          <Stars value={5} />
          <h3 className="text-lg">(17 Reviews)</h3>
        </div>
        <div className="w-full space-y-4 pr-5">
          {reviewsData.map((item, idx) => (
            <div className="flex items-center" key={idx}>
              <div className="flex items-center">
                <h3>{item.star}</h3>
                <Stars value={1} />
              </div>
              <div className="w-full h-3 mx-2 bg-gray-200 rounded">
                <div
                  className={`h-3 bg-redPrimary rounded`}
                  style={{ width: `${Math.floor((item.count / 17) * 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="pl-2 border-l-2 border-redPrimary font-semibold">
          Customer Reviews
        </h1>
        <div className="mt-10 space-y-10">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
