import React from "react";
import { Link } from "react-router-dom";

export default function RecommendedJobs({
  title,
  companyName,
  salary,
  location,
  jobType,
  id
}) {
  return (
    <>
      <Link to={`/JobDetails/${id}`}>
        <div className="bg-white w-[427px] h-[191px] rounded-[10px] mt-6 ps-6 pt-6">
          <h2 className="font-sf_pro_text font-semibold text-xl">{title}</h2>
          <p className="font-bai_jamjuree text-[#0146B1] text-sm ">
            {companyName}
          </p>
          <div className="font-sf_pro_display flex gap-4 text-center mt-4">
            <div className="w-[81px] h-[32px] rounded-[6px] flex items-center justify-center bg-[#EDC89533] text-[#D39339]">
              {location}
            </div>
            <div className="w-[81px] h-[32px] rounded-[6px] flex items-center justify-center bg-[#E1F1EFD4] text-[#0C7566]">
              {jobType}
            </div>
          </div>
          <div className="mt-4 font-sf_pro_text text-[#636363] text-[15px]">
            <p> {salary} $</p>
          </div>
        </div>
      </Link>
    </>
  );
}
