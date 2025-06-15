import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";
import Search2 from "../../assets/Images/Search2.svg";
import Next2 from "../../assets/Images/Next2.svg";
import Name from "../../assets/Images/Name.svg";
import Email from "../../assets/Images/Email.svg";
import AppDate from "../../assets/Images/AppDate.svg";
import CvStatus from "../../assets/Images/CvStatus.svg";
import Move from "../../assets/Images/Move.svg";
import { CircleLoader } from "react-spinners";
import { useParams } from "react-router-dom";

export default function CompanyDashboard() {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [applicantData, setApplicantData] = useState([]);
  const [minScore, setMinScore] = useState("");
  const [activeTab, setActiveTab] = useState("Applicants");

  const { jobId } = useParams();

  useEffect(() => {
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
    const fetchApplicants = async () => {
      try {
        const { data } = await axios.get(
          `https://hireverse.ddns.net/api/company/jobs/${jobId}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
            },
          }
        );
        const applicantsWithPending = data.data.map((applicant) => ({
          ...applicant,
          statusText: "Pending",
        }));
        setApplicantData(applicantsWithPending);
      } catch (error) {
        console.error("Error fetching applicants details:", error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleApplyMinScore = async () => {
    if (!minScore) {
      alert("Please enter a minimum score first!");
      return;
    }

    const allApplicantsFiltered = applicantData.every(
      (applicant) =>
        applicant.attributes.cvScore !== undefined &&
        applicant.attributes.cvScore !== null
    );

    if (!allApplicantsFiltered) {
      alert(
        "Some CVs haven't been filtered yet! Please wait for all CVs to be processed."
      );
      return;
    }

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

    localStorage.setItem(`applicants-${jobId}`, JSON.stringify(updatedApplicants));
    setApplicantData(updatedApplicants);

    try {
      await axios.patch(
        `https://hireverse.ddns.net/api/company/jobs/${jobId}/min-score`,
        { min_score: Number(minScore) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating min score:", error.response?.data || error.message);
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
    <div className="bg-[#EFF2F7] min-h-screen font-sf_pro_text">
      <h1 className="text-3xl font-semibold pt-40 ps-24">
        {jobData.attributes.jobTitle}
      </h1>

      <div className="flex gap-7 pt-10 ps-24">
        <button
          onClick={() => setActiveTab("Applicants")}
          className={`${
            activeTab === "Applicants" ? "font-bold underline text-blue-800" : "text-gray-700"
          }`}
        >
          Applicants
        </button>

        <button
          onClick={() => setActiveTab("FinalAcceptance")}
          className={`${
            activeTab === "FinalAcceptance" ? "font-bold underline text-blue-800" : "text-gray-700"
          }`}
        >
          Final Acceptance
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "Applicants" && (
          <div>
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

            <table className="w-[90%] border border-gray-300 m-auto mt-10 table-fixed">
  <thead className="sticky top-0 border-b border-gray-300 bg-[#E9ECF0]">
    <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300 *:py-3">
      <th className="w-12">#</th>
      <th className="w-1/5"><img src={Name} alt="Name" /></th>
      <th className="w-1/5"><img src={Email} alt="Email" /></th>
      <th className="w-1/5"><img src={AppDate} alt="Date" /></th>
      <th className="w-1/6"><img src={CvStatus} alt="CV Status" /></th>
      <th className="w-1/6"><img src={Move} alt="Move" /></th>
      {/* <th className="w-10"></th> */}
    </tr>
  </thead>
  <tbody className="divide-y bg-white divide-gray-300 text-center">
    {applicantData.map((applicant, idx) => (
      <tr key={idx} className="*:text-gray-900 *:py-4">
        <td>{idx + 1}</td>
        <td className="truncate">{applicant.attributes.applicantName || "N/A"}</td>
        <td className="truncate">{applicant.attributes.applicantEmail || "N/A"}</td>
        <td className="truncate">{applicant.attributes.appliedAt || "N/A"}</td>
        <td>
          <span
            className={`font-bold ${
              applicant.statusText === "Accepted"
                ? "text-green-700"
                : applicant.statusText === "Rejected"
                ? "text-red-700"
                : "text-black"
            }`}
          >
            {applicant.attributes.cvScore} %
          </span>
        </td>
        <td>
          <span
            className={`inline-flex font-semibold items-center px-3 py-1 rounded-full text-sm gap-1
              ${
                applicant.statusText === "Accepted"
                  ? "bg-green-100 text-green-800"
                  : applicant.statusText === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }
            `}
          >
            {applicant.statusText}
          </span>
        </td>
        {/* <td><img src={Next2} alt="Next" className="inline-block" /></td> */}
      </tr>
    ))}
  </tbody>
</table>

          </div>
        )}



        {activeTab === "FinalAcceptance" && (
          <div className="ps-24 text-lg">Final Acceptance content here...</div>
        )}
      </div>
    </div>
  );
}
