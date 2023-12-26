import React from "react";
import Stars from "@/components/star";

const ReviewCard = () => {
  return (
    <div className="border-t-2 border-[#dddddd] pt-10 pr-5">
      <div className="flex flex-col md:flex-row items-center gap-x-10 gap-y-3">
        <img
          src="/reviews/teacher__2.png"
          alt=""
          className="w-24 h-24 object-cover"
        />
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-y-3">
            <div>
              <h1 className="font-bold">Adam Smith</h1>
              <Stars value={5} />
            </div>
            <div className="border-2 border-[#ddddd] p-2 rounded-full px-10 hover:border-redPrimary transition duration-300">
              <h1>September 2, 2023</h1>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-center md:text-left">
              This LMS built on React.js brings a refreshing approach to online
              learning. Its responsiveness across devices is commendable,
              providing a seamless experience for both educators and learners.
              The modular architecture allows for easy integration of additional
              features and customizations, making it adaptable to various
              teaching styles. The use of React.js ensures smooth, interactive
              user interfaces, enhancing engagement and ease of navigation. A
              robust choice for those seeking a modern, dynamic LMS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
