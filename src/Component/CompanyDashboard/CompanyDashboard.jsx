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
import { CircleLoader } from "react-spinners";

export default function CompanyDashboard() {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [applicantData, setApplicantData] = useState([]);
  const [minScore, setMinScore] = useState("");
  const { jobId } = useParams();

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
        const jobDetails = response.data.jobs.find((job) => job.jobId == jobId);
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
    const storedApplicants = localStorage.getItem(`applicants-${jobId}`);
    if (storedApplicants) {
      setApplicantData(JSON.parse(storedApplicants));
    } else {
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
          setApplicantData(data.data);
        } catch (error) {
          console.error("Error fetching applicants details:", error);
        }
      }
      getApplicantsDetails();
    }
  }, [jobId]);

  const handleApplyMinScore = async () => {
    if (!minScore) {
      alert("Please enter a minimum score first!");
      return;
    }

    // Check if all applicants have cvScore
    const allApplicantsFiltered = applicantData.every(
      (applicant) => applicant.attributes.cvScore !== undefined && applicant.attributes.cvScore !== null
    );

    if (!allApplicantsFiltered) {
      alert("Some CVs haven't been filtered yet! Please wait for all CVs to be processed.");
      return;
    }

    // Update the status for each applicant based on the minScore
    const updatedApplicants = applicantData.map((applicant) => {
      const cvScore = applicant.attributes.cvScore;
      let statusText = "Pending";
      if (cvScore !== undefined && cvScore !== null) {
        if (Number(cvScore) >= Number(minScore)) {
          statusText = "Accepted";
        } else {
          statusText = "Rejected";
        }
      }
      return {
        ...applicant,
        statusText,
      };
    });

    // Save the updated applicants to Local Storage
    localStorage.setItem(`applicants-${jobId}`, JSON.stringify(updatedApplicants));

    // Update the state
    setApplicantData(updatedApplicants);

    // Send the minScore to the API
    try {
      const { data } = await axios.patch(
        `https://hireverse.ddns.net/api/company/jobs/${jobId}/min-score`,
        { min_score: Number(minScore) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        }
      );
      console.log("Min score updated successfully:", data);
      alert("Min score updated successfully!");
    } catch (error) {
      console.error("Error updating min score:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to update minimum score!");
    }
  };

  if (loading || !jobData) {
    return (
      <div className="w-full h-screen bg-[#EFF2F7] flex justify-center items-center">
        <CircleLoader />
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <div className="bg-[#EFF2F7] h-screen font-sf_pro_text">
        <h1 className="text-3xl font-semibold pt-40 ps-24">
          {jobData.attributes.jobTitle}
        </h1>
        <div className="flex gap-7 pt-10 ps-24">
          <Link>Applicants</Link>
          <Link>Interview</Link>
          <Link>Final Acceptance</Link>
        </div>

        <div className="flex justify-between me-24">
          <div className="w-96 ms-24 mt-4 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
            <img src={Search2} alt="" />
            <input
              type="text"
              className="p-2 rounded-md focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-96 ms-24 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
              <input
                type="number"
                className="p-2 rounded-md focus:outline-none"
                placeholder="ex :90"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#0C2E82] w-[103px] h-11 rounded-lg text-white font-bai_jamjuree font-medium"
              onClick={handleApplyMinScore}
            >
              Apply
            </button>
          </div>
        </div>

        <table className="min-w-[90%] border border-gray-300 m-auto mt-10">
          <thead className="sticky top-0 ltr:text-left rtl:text-right border-b border-gray-300 bg-[#E9ECF0]">
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
            {applicantData?.map((applicant, idx) => {
              return (
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
                    {applicant.attributes.cvScore !== undefined && applicant.attributes.cvScore !== null ? (
                      <span className="text-green-500">{applicant.attributes.cvScore}</span>
                    ) : (
                      <span className="text-gray-500">{applicant.attributes.status}</span>
                    )}
                  </td>
                  <td className={`px-4 py-3 border border-gray-300 font-bold ${applicant.statusColor}`}>
                    {applicant.statusText}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    <Link to={`/CompanyDashboard/${jobId}/${applicant.applicantId}`}>
                      <img src={Next2} alt="" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
