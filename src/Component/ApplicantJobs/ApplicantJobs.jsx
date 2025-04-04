import React, { useEffect, useState } from "react";
import Search from "../../assets/Images/Search2.svg";
import Date from "../../assets/Images/Date.svg";
import Status from "../../assets/Images/Status.svg";
import JobTitle from "../../assets/Images/JobTitle.svg";
import Next2 from "../../assets/Images/Next2.svg";
import CompanyName from "../../assets/Images/CompanyName.svg";
import { data, NavLink } from "react-router-dom";
import axios from "axios";
export default function ApplicantJobs() {
  const [applicantJobDetails, setApplicantJobDetails] = useState([]);

  const userToken = localStorage.getItem("userToken");

  async function getApplicantJobDetails() {
    try {
      let { data } = await axios.get(
        "https://hireverse.ddns.net/api/applicant/jobs",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jobDetails = data.data.map((item) => item.attributes);

      setApplicantJobDetails(jobDetails);
      console.log(jobDetails);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getApplicantJobDetails();
  }, []);

  return (
    <div className="py-32  ps-24 bg-[#EFF2F7]">
      <h2 className="font-sf_pro_text font-semibold text-4xl">My Jobs</h2>
      <div className="mt-8 flex gap-10 py-5 border-b-2  w-3/4">
        <NavLink>Jobs</NavLink>
        <NavLink>Upcoming Interviews</NavLink>
      </div>
      <div className="w-1/2 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium mt-6">
        <img src={Search} alt="" />
        <input
          type="text"
          className="p-2 rounded-md focus:outline-none "
          placeholder="Search"
        />
      </div>
      <div className=" max-w-full  mt-4 mr-24">
        <table className="min-w-full border border-gray-300">
          <thead className="sticky top-0 bg-transparent ltr:text-left rtl:text-right border-b border-gray-300">
            <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300">
              <th className="w-10"></th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={JobTitle} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={CompanyName} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Status} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Date} alt="" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white divide-gray-300">
            {applicantJobDetails.map((job, idx) => (
              <tr key={idx} className="*:text-gray-900">
                <td className="text-center font-bold">{idx + 1}</td>
                <td className="px-4 py-3 border border-gray-300">
                  {job.jobTitle}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {job.companyName}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full w-[131px] text-lg font-medium gap-1
      ${
        job.status === "accepted"
          ? "bg-green-100 text-green-800"
          : job.status === "rejected"
          ? "bg-red-100 text-red-800"
          : job.status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : job.status === "interviewed"
          ? "bg-purple-100 text-purple-800"
          : job.status === "cv_eligible"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
      }
    `}
                  >
                    <span className="h-2 w-2 rounded-full bg-current"></span>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {job.applied}
                </td>
                <td className="w-10 text-center">
                  <img className="ms-3" src={Next2} alt="Next" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
