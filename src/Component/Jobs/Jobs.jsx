import React from "react";
import Line from "../../assets/Images/Line 2.svg";
import LineH from "../../assets/Images/Line 4.svg";
import Location2 from "../../assets/Images/Location2.svg";
import ArrowUpRight from "../../assets/Images/arrow-up-right.svg";
export default function Jobs({
  date,
  jobType,
  salary,
  icon,
  jobTitle,
  description,
  location,
}) {
  return (
    <>
      <div className="  w-[450px] h-[312px] border-2 shadow-xl font-bai_jamjuree p-6 mb-8">
        <div className="flex justify-around">
          <div className="">
            <p className="text-[#8B81D0] text-[12px] font-medium ">
              APPLY BEFORE
            </p>
            <p className="text-[#0C2E82] font-medium">{date}</p>
          </div>
          <img src={Line} alt="" />
          <div className="">
            <p className="text-[#8B81D0] text-[12px] font-medium ">JOB TYPE</p>
            <p className="text-[#0C2E82] font-medium">{jobType}</p>
          </div>
          <img src={Line} alt="" />
          <div>
            <p className="text-[#8B81D0] text-[12px] font-medium  pr-4">
              SALARY
            </p>
            <p className="text-[#0C2E82] font-medium">{salary}</p>
          </div>
        </div>

        <div className="flex gap-6 items-center mt-4 ms-4">
          <div>
            <img src={icon} alt="" />
          </div>
          <div className="text-[#0B2B82] text-2xl font-semibold">
            {jobTitle}
          </div>
        </div>
        <div className="ms-4 mt-4 text-[#3D589B]">
          {description}
        </div>
        <img src={LineH} alt="" className="mt-4" />
        <div className="mt-4 ms-4 flex justify-between">
          <div className="flex gap-4">
            <img src={Location2} alt="" />
            <p className="text-[#3D589B]">{location}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bai_jamjuree text-[#0B2B82] underline  underline-offset-1">
              Browse All
            </p>
            <div>
              <img src={ArrowUpRight} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
