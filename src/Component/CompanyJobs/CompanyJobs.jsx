import { Calendar, EllipsisVertical, ListCollapse, MapPin, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AA from "../../assets/Images/AA.svg";

export default function CompanyJobs({ companyJob }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <div className="w-[454px] bg-white rounded-[14px] mt-3 ms-20 p-8 font-sf_pro_text relative">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">
          {companyJob.attributes.companyName}
        </h2>
        <EllipsisVertical
          className="cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 bg-white border rounded-md shadow-lg w-32">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-4">
          <ListCollapse /> Details
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-4 text-red-600">
          <Trash2 /> Delete
          </button>
        </div>
      )}

      <div className="flex mt-6 gap-6">
        <div className="bg-[#E1F1EFD4] text-[#0C7566] text-sm rounded-md w-[87px] h-[40px] flex justify-center items-center">
          {companyJob.attributes.jobType}
        </div>
        <div className="bg-[#EDC89533] text-[#D39339] text-sm rounded-md w-[87px] h-[40px] flex justify-center items-center">
          {companyJob.attributes.worLdLocation}
        </div>
        <div className="flex items-center gap-2">
          <MapPin /> <p>{companyJob.attributes.jobLocation}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Calendar />
        <p>Created {companyJob.attributes.createdAt}</p>
      </div>

      <div className="mt-4">
        <p>
          Available To{" "}
          <span className="text-[#008A3E] font-bold">
            {companyJob.attributes.availableTo}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <img src={AA} alt="" />
        <p className="mt-3 text-[#008A3E] font-bold text-2xl">
          {companyJob.attributes.applicantsCount}
        </p>
      </div>
    </div>
  );
};
