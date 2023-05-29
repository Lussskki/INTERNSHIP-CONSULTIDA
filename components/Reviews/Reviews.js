import React from "react";
import detectFont from "../../helpers/fonts";
import { useRouter } from "next/router";

const Reviews = ({ reviews }) => {
  const { query } = useRouter();
  const locale = query.lang;

  return (
    <div className="bg-white pt-10">
      <div className="flex custom-container flex-col">
        <div className="border-b border-[#C4C4C4] flex justify-between">
          <h1
            className={`
          ${detectFont(locale, false, true)}
         text-gray font-bold text-[25px] leading-[20px] mb-[13px]`}
          >
            Reviews
          </h1>
          <button
            className={`
            ${detectFont(locale, true, false)}
            bg-transparent font-bold text-sm text-center
           text-graySecondary hover:text-[#8789BF]`}
          >
            write a review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
