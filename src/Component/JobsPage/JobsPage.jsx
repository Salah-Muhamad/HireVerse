
import React, { useState } from "react";
import jobs from "../../assets/Images/jobs.svg";
import search from'../../assets/Images/searchicon.svg'
import dashline from "../../assets/Images/Vector 11.svg";
import Job from "../Job/Job";
import logo from '../../assets/Images/Microsoftlogo.svg'

export default function JobsPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <>
      <div className="sec1 bg-[#F7F8FC] w-100 h-96 flex justify-around relative mb-4">
        <div className="text mt-44 mr-32">
          <p className="font-sf_pro_display font-bold text-3xl mb-5">
            Find Your Perfect Opportunity
          </p>
          <p className="w-[420px] h-58px font-sf_pro_text font-normal text-base text-[#7B7B7B]">
            Explore exciting opportunities that align with your skills and
            career goals. Your next big move starts here!
          </p>
        </div>
        <img
          src={dashline}
          className="w-[404px] h-[103px] absolute top-[145px] left-[500px]"
        />
        <div className="img mt-32">
          <img src={jobs} />
        </div>
      </div>
      <div className="sec2 grid grid-cols-12 w-10/12 m-auto gap-11">
        <aside className="col-span-3 bg-[#FFFFFF] h-[845px] rounded-lg border-[#C5C5C5] border-2">
          <div className="part1 flex justify-between p-5 border-b-2 mb-3">
            <p className="font-sf_pro_text font-semibold">Filter</p>
            <a className="text-[#0146B1] font-medium font-sf_pro_text">
              Reset Filter
            </a>
          </div>

          {/* Location Dropdown */}
          <div className="part4 ml-4 mt-2 mb-3 border-b-2">
            <div
              className="flex items-center gap-2 cursor-pointer justify-between"
              onClick={() => toggleDropdown("location")}
            >
              <span className="font-sf_pro_text font-semibold mb-2">
                Location
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-transform duration-300 transform mr-9 ${
                  openDropdown === "location" ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.04 1.08l-4 3.71a.75.75 0 01-1.04 0l-4-3.71a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openDropdown === "location" && (
              <form className="mt-3">
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Remote</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">On-Site</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Hybrid</p>
                </div>
              </form>
            )}
          </div>

          {/* Job Type Dropdown */}
          <div className="part4 ml-4 mt-2 mb-3 border-b-2">
            <div
              className="flex items-center gap-2 cursor-pointer justify-between"
              onClick={() => toggleDropdown("jobType")}
            >
              <span className="font-sf_pro_text font-semibold mb-2">
                Job Type
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-transform duration-300 transform mr-9 ${
                  openDropdown === "jobType" ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.04 1.08l-4 3.71a.75.75 0 01-1.04 0l-4-3.71a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openDropdown === "jobType" && (
              <form className="mt-3">
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Internship</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Full-Time</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Part-Time</p>
                </div>
              </form>
            )}
          </div>

          
          <div className="part4 ml-4 mt-2 mb-3 border-b-2">
            <div
              className="flex items-center gap-2 cursor-pointer justify-between"
              onClick={() => toggleDropdown("priceRange")}
            >
              <span className="font-sf_pro_text font-semibold mb-2">
                Price Range
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-transform duration-300 transform mr-9 ${
                  openDropdown === "priceRange" ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.04 1.08l-4 3.71a.75.75 0 01-1.04 0l-4-3.71a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openDropdown === "priceRange" && (
              <form className="mt-3">
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Under $100</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">$100 - $500</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">$500 - $1k</p>
                </div>
              </form>
            )}
          </div>
            {/*Experience Level*/}
            <div className="part4 ml-4 mt-2 mb-3 border-b-2">
            <div
              className="flex items-center gap-2 cursor-pointer justify-between"
              onClick={() => toggleDropdown("experienceLevel")}
            >
  <span className="font-sf_pro_text font-semibold mb-2">
    Experience Level
  </span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-7 w-7 transition-transform duration-300 transform mr-9 ${
      openDropdown === "experienceLevel" ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.04 1.08l-4 3.71a.75.75 0 01-1.04 0l-4-3.71a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
</div>
{openDropdown === "experienceLevel" && (
  <form className="mt-3">
    <div className="flex gap-3 mb-3">
      <input
        type="checkbox"
        className="accent-[#0C2E82] w-4 h-4 mt-1"
      />
      <p className="font-sf_pro_text text-sm">Entry-Level</p>
    </div>
    <div className="flex gap-3 mb-3">
      <input
        type="checkbox"
        className="accent-[#0C2E82] w-4 h-4 mt-1"
      />
      <p className="font-sf_pro_text text-sm">Mid-Level</p>
    </div>
    <div className="flex gap-3 mb-3">
      <input
        type="checkbox"
        className="accent-[#0C2E82] w-4 h-4 mt-1"
      />
      <p className="font-sf_pro_text text-sm">Senior-Level</p>
    </div>
  </form>
)}
          </div>
          {/*Working Hours*/}
          <div className="part4 ml-4 mt-2 mb-3 border-b-2">
            <div
              className="flex items-center gap-2 cursor-pointer justify-between"
              onClick={() => toggleDropdown("workinghours")}
            >
              <span className="font-sf_pro_text font-semibold mb-2">
              Working Hours
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-7 w-7 transition-transform duration-300 transform mr-9 ${
                  openDropdown === "workinghours" ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.67l3.71-3.44a.75.75 0 111.04 1.08l-4 3.71a.75.75 0 01-1.04 0l-4-3.71a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {openDropdown === "workinghours" && (
              <form className="mt-3">
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Fixed schedule</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    className="accent-[#0C2E82] w-4 h-4 mt-1"
                  />
                  <p className="font-sf_pro_text text-sm">Flexible Schedule</p>
                </div>
              </form>
            )}
          </div>
        </aside>
        <div className="content col-span-9 h-11 ">
          <div className="search relative mb-10">
          <input type="text" className="bg-[#FFFFFF] h-16 w-[790px] rounded-lg border-[#C5C5C5] border-2 pl-20 "
          placeholder="Search for jobs by title, skills, or company"
          />
          <img src={search} className="absolute top-5 left-6" />
          <button className="bg-[#1F4171] text-white w-24 h-10 text-center rounded-md absolute top-3 right-40 text-sm font-bai_jamjuree font-semibold ">Search</button>
          </div>
          {/*Jobs */}
          <Job 
          logo={logo}
          jobtitle={'Full-Stack Developer'}
          company={'Microsoft'}
          location={'NewYork'}
          site={'On-Site'}
          time={'Full-Time'}
          salary={'$80.000 - $100.000 annually'}
          desc={'you will be responsible for designing, developing, and maintaining scalable software ,Working closely with a cross-functional team, you’ll play a key role in delivering high-quality'}
          posted={'Posted 3 Days ago'}
          />
        </div>
      </div>
    </>
  );
}










