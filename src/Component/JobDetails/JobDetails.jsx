import React, { useEffect, useState } from "react";
import company from "../../assets/Images/company.svg";
import logo from "../../assets/Images/Microsoftlogo.svg";
import location from "../../assets/Images/location.svg";
import salary from "../../assets/Images/salary.svg";
import line2 from "../../assets/Images/Line 27.svg";
import RelatedJob from "../RelatedJob/RelatedJob";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    rows: 3,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  let related = [
    {
      jobtitle: "Senior Data Science Manager",
      worksin: "Artificial Intelligence, Data Platforms, and Analytics",
      time: "Full-Time",
      location: "On-Site",
      date: "5-Days ago",
      apllicants: "+5000 apllicant",
    },
    {
      jobtitle: "Front-End Developer",
      worksin: "Artificial Intelligence, Data Platforms, and Analytics",
      time: "Full-Time",
      location: "On-Site",
      date: "5-Days ago",
      apllicants: "+5000 apllicant",
    },
    {
      jobtitle: "Front-End Developer",
      worksin: "Artificial Intelligence, Data Platforms, and Analytics",
      time: "Full-Time",
      location: "On-Site",
      date: "5-Days ago",
      apllicants: "+5000 apllicant",
    },
    {
      jobtitle: "Front-End Developer",
      worksin: "Artificial Intelligence, Data Platforms, and Analytics",
      time: "Full-Time",
      location: "On-Site",
      date: "5-Days ago",
      apllicants: "+5000 apllicant",
    },
    {
      jobtitle: "Front-End Developer",
      worksin: "Artificial Intelligence, Data Platforms, and Analytics",
      time: "Full-Time",
      location: "On-Site",
      date: "5-Days ago",
      apllicants: "+5000 apllicant",
    },
    {
      jobtitle: "Front-End Developer",
      worksin: "Artificial Intelligence, Data Platforms, and Analytics",
      time: "Full-Time",
      location: "On-Site",
      date: "5-Days ago",
      apllicants: "+5000 apllicant",
    },
  ];
  const [jobDetails, setJobDetails] = useState([]);
  let { id } = useParams();
  console.log(id);
  async function getJobDetails(id) {
    try {
      let { data } = await axios.get(`http://157.175.163.205/api/jobs/${id}`);
      console.log(data.data.attributes);
      setJobDetails(data.data.attributes);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getJobDetails(id);
  }, []);
  return (
    <div>
      <div className="container w-10/12 m-auto bg-[#F9F9F9] p-3 mt-10">
        <img src={company} alt="" />
        <p className="text-[#616161] text-sm font-bai_jamjuree font-medium mt-7 mb-7">
          - job details
        </p>
        <div className="grid grid-cols-12">
          <div className="col-span-8 ">
            <div className="flex justify-between">
              <div className="text flex ">
                <div className="logo mt-2">
                  <img src={jobDetails.company_logo} className="mr-3" />
                </div>
                <div>
                  <p className="font-sf_pro_text font-semibold text-2xl">
                    {jobDetails.title}
                  </p>
                  <p className="companyname font-bai_jamjuree text-xs font-normal text-[#0146B1]">
                    Microsoft
                  </p>
                </div>
              </div>
              <button className="bg-[#143567] w-28 h-11 rounded-lg text-[#FFFFFF] mr-16">
                Apply Now
              </button>
            </div>
            <img src={line2} className="mt-8" />
            <div className=" flex flex-col gap-5">
              <div className="w-[840px]">
                <h2 className="font-medium text-lg font-bai_jamjuree mb-2 mt-6 ">
                  Summary:
                </h2>
                <p className="font-normal text-sm font-bai_jamjuree text=[#474747] ml-5">
                  {jobDetails.summary}
                </p>
              </div>
              <div>
                <h2 className="font-medium text-lg font-bai_jamjuree mb-2 mt-6">
                  Responsibilties:
                </h2>
                <div className="responsibilities ml-5">
                  <p className="pb-4">{jobDetails.responsibilities}</p>
                </div>
              </div>
              <div>
                <h2 className="font-medium text-lg font-bai_jamjuree mb-2 mt-6">
                  Requirements :
                </h2>
                <div className="requirements ml-5">
                  <p className="mt-1 mb-1 font-bai_jamjuree font-medium">
                    {jobDetails.requirements}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <aside className="col-span-3  border-l-[2px] p-5">
            <h3 className="time font-sf_pro_text font-bold text-lg mb-3">
              {jobDetails.type}
            </h3>
            <div className="location flex mb-3 text-sm font-semibold text-[#474747]">
              <img src={location} className="mr-2" />
              <p>New York</p>
            </div>
            <div className="salary flex mb-3 text-sm font-semibold text-[#474747]">
              <img src={salary} className="mr-2" />
              <p>{jobDetails.salary} $</p>
            </div>
            <img src={line2} alt="" />
            <div className="downside mt-4">
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Eperience Level
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  Mid-Level
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Location
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  {jobDetails.workLocation}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Working Hours
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  Flexible schedule
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Education Requirements
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  Bachelor’s Degree in Computer Science or related field
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm mb-2">
                  • Required Skills
                </h2>
                <div className="skills flex gap-2 flex-wrap w-full">
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl h-6  text-sm font-normal w-fit p-4">
                    SQL
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl h-6  text-sm font-normal w-fit p-4">
                    Python
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Java Script
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Problem-solving
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Networks
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Cloud Computing
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="relatedJobs w-10/12 m-auto">
        <p className="font-bold text-xl font-sf_pro_text mb-2 mt-6">
          Related Jobs
        </p>
        <div className="relatedJobGrid grid grid-cols-2 gap-2 ml-7 mb-7">
          {related.map((j) => (
            <RelatedJob
              logo={logo}
              jobtitle={j.jobtitle}
              worksin={j.worksin}
              time={j.time}
              location={j.location}
              date={j.date}
              apllicants={j.apllicants}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
