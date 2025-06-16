import React, { useEffect, useState } from "react";
import searchh from "../../assets/Images/searchicon.svg";

import Job from "../Job/Job";
import { useJobsProvider } from "../../Context/JobsContext";
export default function AllJobs() {
  const { jobs, setJobs } = useJobsProvider();
  //   console.log(jobs);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState();
  useEffect(() => {
    if (!jobs) return;
    console.log(search);
    console.log(filteredJobs);
    console.log(jobs);
    if (search) {
      setFilteredJobs(
        jobs.filter((job) =>
          job.attributes.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredJobs([...jobs]);
    }
  }, [search, jobs]);
  console.log(filteredJobs);
  if (!jobs) {
    return null;
  }
  return (
    <div className="content col-span-9 h-11 ">
      <div className="search relative mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="bg-[#FFFFFF] h-16 w-[790px] rounded-lg border-[#C5C5C5] border-2 pl-20 "
          placeholder="Search for jobs by title, skills, or company"
        />
        <img src={searchh} className="absolute top-5 left-6" />
        <button className="bg-[#1F4171] text-white w-24 h-10 text-center rounded-md absolute top-3 right-40 text-sm font-bai_jamjuree font-semibold ">
          Search
        </button>
      </div>
      {filteredJobs?.slice(0, 7).map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </div>
  );
}
