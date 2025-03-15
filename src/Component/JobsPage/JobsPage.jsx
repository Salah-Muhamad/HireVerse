import React, { useEffect, useState } from "react";
import search from "../../assets/Images/searchicon.svg";
import dashline from "../../assets/Images/Vector 11.svg";
import Job from "../Job/Job";
import axios from "axios";
import DropDown from "../DropDown/DropDown";
import { useSearchParams } from "react-router-dom";
export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  function updateSearchParam(param, title) {
    searchParam.set(title, param);
    setSearchParam(searchParam);
  }

  async function getJobs(searchParam) {
    try {
      let { data } = await axios.get(
        `https://hireverse.ddns.net/api/jobs${searchParam.size > 0 && "?"}`
      );
      console.log(data.data);
      setJobs(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getJobs(searchParam);
  }, [searchParam]);

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
            <button className="text-[#0146B1] font-medium font-sf_pro_text cursor-pointer">
              Reset Filter
            </button>
          </div>
          <div className="space-y-3 divide-y-2">
            <DropDown
              onSelect={updateSearchParam}
              title={"Location"}
              options={["Remote", "On-side", "Hybird"]}
            />
            <DropDown
              onSelect={updateSearchParam}
              title={"Job Type"}
              options={["Freelance", "Part-time", "Full-time"]}
            />
            <DropDown
              onSelect={updateSearchParam}
              title={"Range Salary"}
              options={["under $100", "$100 to $500", "$500 -$1k"]}
            />
            <DropDown
              onSelect={updateSearchParam}
              title={"Experience level"}
              options={["Junior", "Mid-Level", "Senior"]}
            />
            <DropDown
              onSelect={updateSearchParam}
              title={"Working Hours"}
              options={["Flexible Schedule", "Fixed Schedule"]}
            />
          </div>
        </aside>
        <div className="content col-span-9 h-11 ">
          <div className="search relative mb-10">
            <input
              type="text"
              className="bg-[#FFFFFF] h-16 w-[790px] rounded-lg border-[#C5C5C5] border-2 pl-20 "
              placeholder="Search for jobs by title, skills, or company"
            />
            <img src={search} className="absolute top-5 left-6" />
            <button className="bg-[#1F4171] text-white w-24 h-10 text-center rounded-md absolute top-3 right-40 text-sm font-bai_jamjuree font-semibold ">
              Search
            </button>
          </div>
          {jobs.map((job, index) => (
            <Job key={index} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}
