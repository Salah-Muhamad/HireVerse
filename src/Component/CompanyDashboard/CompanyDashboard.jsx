import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Search2 from "../../assets/Images/Search2.svg";
import Next2 from "../../assets/Images/Next2.svg";
import Name from "../../assets/Images/Name.svg";
import Email from "../../assets/Images/Email.svg";
import AppDate from "../../assets/Images/AppDate.svg";
import CvStatus from "../../assets/Images/CvStatus.svg";
import Move from "../../assets/Images/Move.svg";
import axios from "axios";
import { CircleLoader, PacmanLoader } from "react-spinners";

export default function CompanyDashboard() {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null);
  const { jobId } = useParams();
  const [applicantData, setApplicantData] = useState([]);
  //   console.log(jobId)

  useEffect(() => {
    if (!jobId) {
      console.error("Job ID is not provided in the URL.");
      return;
    }

    const fetchJobDetails = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://hireverse.ddns.net/api/company/jobs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
            },
          }
        );
        console.log(response.data.jobs);
        const jobDetails = response.data.jobs.find((job) => job.jobId == jobId);
        console.log(jobDetails);
        if (jobDetails) {
          setJobData(jobDetails);
        } else {
          console.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);
  useEffect(() => {
    async function getApplicantsDetails() {
      try {
        const { data } = await axios.get(
          `https://hireverse.ddns.net/api/company/jobs/${jobId}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
            },
          }
        );
        console.log(data.data);
        setApplicantData(data.data);
      } catch (error) {
        console.error("Error fetching applicants details:", error);
      }
    }
    getApplicantsDetails();
  }, [jobId]);
  if (loading || !jobData) {
    return (
      <div className="w-full h-screen bg-[#EFF2F7] flex justify-center items-center">
        <CircleLoader />
      </div>
    );
  }
  // if (!jobData) {
  //   return <div>Job not found</div>;
  // }
  return (
    <>
          <Outlet />

      <div className="bg-[#EFF2F7] h-screen font-sf_pro_text ">
        <h1 className="text-3xl font-semibold pt-40 ps-24">
          {jobData.attributes.jobTitle}
        </h1>
        <div className="flex gap-7 pt-10 ps-24">
          <Link>Applicants</Link>
          <Link>Interview</Link>
          <Link to='/finalacceptance'>Final Acceptance</Link>
        </div>

        <div className="flex justify-between me-24">
          <div className="w-96 ms-24 mt-4 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
            <img src={Search2} alt="" />
            <input
              type="text"
              className="p-2 rounded-md focus:outline-none "
              placeholder="Search"
            />
          </div>
          <div className="flex gap-4 ">
            <div className="w-96 ms-24  bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
              <input
                type="text"
                className="p-2 rounded-md focus:outline-none "
                placeholder="ex :90"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0C2E82] w-[103px] h-11 rounded-lg text-white font-bai_jamjuree font-medium"
            >
              Apply
            </button>
          </div>
        </div>

        <table className="min-w-[90%] border border-gray-300 m-auto mt-10">
          <thead className="sticky top-0  ltr:text-left rtl:text-right border-b border-gray-300 bg-[#E9ECF0]">
            <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300">
              <th className="w-10"></th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Name} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Email} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={AppDate} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={CvStatus} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Move} alt="" />
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white divide-gray-300 text-center">
            {applicantData?.map((applicant, idx) => (
              <tr key={idx} className="*:text-gray-900">
                <td className="text-center font-bold">{idx + 1}</td>
                <td className="px-4 py-3 border border-gray-300">
                  {applicant.attributes.applicantName}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {applicant.attributes.applicantEmail}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {applicant.attributes.appliedAt}
                </td>
                <td className="px-4 py-3 border border-gray-300">
                  {applicant.attributes.status === "Pending" ||
                  applicant.attributes.status === "CV Processing" ? (
                    <>{applicant.attributes.status}</>
                  ) : (
                    <span className="text-green-500">
                      {applicant.attributes.cvScore}
                    </span>
                  )}
                </td>
                <td>Accepted</td>
                <td className="px-4 py-3 border border-gray-300">
                <Link
                  to={`/CompanyDashboard/${jobId}/${applicant.applicantId}`}
                >
                    <img src={Next2} alt="" />
                </Link>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
