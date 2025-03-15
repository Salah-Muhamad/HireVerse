import React from "react";
import Line from "../../assets/Images/Line 2.svg";
import LineH from "../../assets/Images/Line 4.svg";
import Location2 from "../../assets/Images/Location2.svg";
import ArrowUpRight from "../../assets/Images/arrow-up-right.svg";
import { Link } from "react-router-dom";
export default function Jobs({ job }) {
  return (
    <>
      <Link to={`/JobDetails/${job.id}`}>
        <div className="  w-[450px] h-fit border-2 shadow-xl font-bai_jamjuree p-6 mb-8">
          <div className="flex justify-around">
            <div className="">
              <p className="text-[#8B81D0] text-[12px] font-medium ">
                APPLY BEFORE
              </p>
              <p className="text-[#0C2E82] font-medium">
                {job.attributes.availableTo}
              </p>
            </div>
            <img src={Line} alt="" />
            <div className="">
              <p className="text-[#8B81D0] text-[12px] font-medium ">
                JOB TYPE
              </p>
              <p className="text-[#0C2E82] font-medium">
                {job.attributes.type}
              </p>
            </div>
            <img src={Line} alt="" />
            <div>
              <p className="text-[#8B81D0] text-[12px] font-medium  pr-4">
                SALARY
              </p>
              <p className="text-[#0C2E82] font-medium">
                {job.attributes.salary} $
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-center mt-4 ms-4">
            <div>
              <img src={job.attributes.companyLogo} alt="" />
            </div>
            <div className="text-[#0B2B82] text-xl font-semibold">
              {job.attributes.title}
            </div>
          </div>
          <div className="ms-4 mt-4 text-[#3D589B] h-14">
            {job.attributes.summary}
          </div>
          <img src={LineH} alt="" className="mt-4" />
          <div className="mt-4 ms-4 flex justify-between">
            <div className="flex gap-4">
              <img src={Location2} alt="" />
              <p className="text-[#3D589B]">{job.attributes.workLocation}</p>
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
      </Link>
    </>
  );
}
