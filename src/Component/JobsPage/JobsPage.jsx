import React, { useEffect, useState } from "react";
import search from "../../assets/Images/searchicon.svg";
import dashline from "../../assets/Images/Vector 11.svg";
import Job from "../Job/Job";
import axios from "axios";
import DropDown from "../DropDown/DropDown";
import { useSearchParams } from "react-router-dom";
import { JobsProvider } from "../../Context/JobsContext";
import Filteration from "./Filteration";
import AllJobs from "./AllJobs";
export default function JobsPage() {
  // const [jobs, setJobs] = useState([]);

  // async function getJobs() {
  //   try {
  //     let { data } = await axios.get(`https://hireverse.ddns.net/api/jobs`);
  //     console.log(data.data);
  //     setJobs(data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // useEffect(() => {
  //   getJobs();
  // }, []);

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
          {/* <img src={jobs} /> */}
        </div>
      </div>
      <JobsProvider>
        <div className="sec2 grid grid-cols-12 w-10/12 m-auto gap-11">
          <Filteration />
          <AllJobs />
        </div>
      </JobsProvider>

    </>
  );
}

