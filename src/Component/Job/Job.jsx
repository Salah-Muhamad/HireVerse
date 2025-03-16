import React from "react";
import locationn from "../../assets/Images/emptylocation.svg";
import { Link } from "react-router-dom";
export default function Job({ posted, job }) {
  return (
    <Link to={`/JobDetails/${job.id}`}>
      <div className="bg-[#f4f4f4] p-8 rounded-lg h-56 relative mb-9">
        <div className="jobtitle flex gap-4 justify-between">
          <div className="flex gap-4">
            <img src={job.attributes.companyLogo} alt="" />
            <div className="txt">
              <p className="font-sf_pro_text font-semibold text-xl">
                {job.attributes.title}
              </p>
              <p className="text-[#0146B1] text-sm font-bai_jamjuree">
                {job.attributes.companyName}
              </p>
            </div>
          </div>
          <div className="location flex gap-2">
            <img src={locationn} className="w-6 h-6" />
            <p>{job.attributes.workLocation}</p>
          </div>
        </div>
        <div className="site flex gap-4 mt-7 mb-3">
          <div className="skill flex justify-center items-center bg-[#f7e4ca] rounded-xl h-6  text-sm font-normal w-fit p-4">
            <p className="text-[#D39339]">{job.attributes.workLocation}</p>
          </div>
          <div className="skill flex justify-center items-center bg-[#E1F1EFD4] rounded-xl h-6  text-sm font-normal w-fit p-4">
            <p className="text-[#0C7566]">{job.attributes.type}</p>
          </div>
          <p className="text-[#636363] text-lg font-sf_pro_text mt-1 font-extraboldbold">
            {job.attributes.salary} $
          </p>
        </div>
        <div className="desc text-sm font-bai_jamjuree text-[#6A6A6A]">
          <p>{job.attributes.summary}</p>
        </div>
        <p className="posted absolute right-3 bottom-3 text-[#707070] text-xs">
          {posted}
        </p>
      </div>
    </Link>
  );
}
