import React, { useEffect, useState } from "react";
import Search2 from "../../assets/Images/Search2.svg";
import Next2 from "../../assets/Images/Next2.svg";
import Name from "../../assets/Images/Name.svg";
import Email from "../../assets/Images/Email.svg";
import AppDate from "../../assets/Images/AppDate.svg";
import CvStatus from "../../assets/Images/CvStatus.svg";
import Move from "../../assets/Images/Move.svg";
import { Check, X } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("Applicants");
  const [minScore, setMinScore] = useState("");
  const [applicantData, setApplicantData] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    const storedApplicants = localStorage.getItem(`applicants-${jobId}`);
    if (storedApplicants) {
      setApplicantData(JSON.parse(storedApplicants));
    }
  }, [jobId]);

  const handleApplyMinScore = () => {
    if (!minScore) return alert("Please enter a score");
    const updated = applicantData.map((a) => {
      const score = Number(a.attributes.cvScore);
      const accepted = score >= Number(minScore);
      return {
        ...a,
        statusText: accepted ? "Accepted" : "Rejected",
      };
    });
    setApplicantData(updated);
    localStorage.setItem(`applicants-${jobId}`, JSON.stringify(updated));
  };

  const renderTabs = () => (
    <div className="flex gap-7 pt-10 ps-24 text-lg font-medium">
      <button
        onClick={() => setActiveTab("Applicants")}
        className={`pb-2 ${
          activeTab === "Applicants"
            ? "text-blue-700 border-b-4 border-blue-700"
            : "text-gray-600"
        }`}
      >
        Applicants
      </button>
      <button
        onClick={() => setActiveTab("Interview")}
        className={`pb-2 ${
          activeTab === "Interview"
            ? "text-blue-700 border-b-4 border-blue-700"
            : "text-gray-600"
        }`}
      >
        Interview
      </button>
      <button
        onClick={() => setActiveTab("Final Acceptance")}
        className={`pb-2 ${
          activeTab === "Final Acceptance"
            ? "text-blue-700 border-b-4 border-blue-700"
            : "text-gray-600"
        }`}
      >
        Final Acceptance
      </button>
    </div>
  );

  const renderApplicantsTable = () => (
    <>
      <div className="flex justify-between me-24 mt-6">
        <div className="w-96 ms-24 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
          <img src={Search2} alt="search" />
          <input
            type="text"
            className="p-2 rounded-md focus:outline-none"
            placeholder="Search"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-96 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
            <input
              type="number"
              className="p-2 rounded-md focus:outline-none"
              placeholder="ex: 90"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />
          </div>
          <button
            onClick={handleApplyMinScore}
            className="bg-[#0C2E82] w-[103px] h-11 rounded-lg text-white font-bai_jamjuree font-medium"
          >
            Apply
          </button>
        </div>
      </div>

      <table className="min-w-[90%] border border-gray-300 m-auto mt-10">
        <thead className="sticky top-0 ltr:text-left rtl:text-right border-b border-gray-300 bg-[#E9ECF0]">
          <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300 text-center">
            <th className="w-10"></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={Name} alt="Name" /></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={Email} alt="Email" /></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={AppDate} alt="AppDate" /></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={CvStatus} alt="CvStatus" /></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={Move} alt="Move" /></th>
            <th className="w-10 text-center font-sf_pro_text px-4 py-3 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y bg-white divide-gray-300 text-center">
          {applicantData.map((applicant, idx) => (
            <tr key={idx} className="*:text-gray-900">
              <td className="font-bold">{idx + 1}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">{applicant.attributes.applicantName}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">{applicant.attributes.applicantEmail}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">{applicant.attributes.appliedAt}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">
                {["Pending", "CV processing"].includes(applicant.attributes.status) ? (
                  <span
                    className={`inline-flex font-semibold items-center px-3 py-1 rounded-full text-lg gap-1 ${
                      applicant.attributes.status === "CV processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current"></span>
                    {applicant.attributes.status}
                  </span>
                ) : (
                  <span
                    className={`font-bold ${
                      applicant.statusText === "Accepted"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {applicant.attributes.cvScore} %
                  </span>
                )}
              </td>
              <td>
                <span
                  className={`inline-flex font-semibold items-center px-4 py-1 rounded-full text-lg gap-1 ${
                    applicant.statusText === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {applicant.statusText === "Accepted" ? <Check size={16} /> : <X size={16} />}
                  {applicant.statusText}
                </span>
              </td>
              <td>
                <Link to={`/CompanyDashboard/${jobId}/${applicant.applicantId}`}>
                  <img src={Next2} alt="Next" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="bg-[#EFF2F7] min-h-screen font-sf_pro_text">
      <h1 className="text-3xl font-semibold pt-40 ps-24">Job Title</h1>
      {renderTabs()}
      <div className="pt-6">
        {activeTab === "Applicants" && renderApplicantsTable()}
        {activeTab === "Interview" && (
          <div className="ps-24 text-gray-700 mt-10 text-xl">Interview content goes here.</div>
        )}
        {activeTab === "Final Acceptance" && (
          <table className="min-w-[90%] border border-gray-300 m-auto mt-10">
        <thead className="sticky top-0 ltr:text-left rtl:text-right border-b border-gray-300 bg-[#E9ECF0]">
          <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300 text-center">
            <th className="w-10"></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={Name} alt="Name" /></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={Email} alt="Email" /></th>
            <th className="text-center font-sf_pro_text px-4 py-3 border border-gray-300"><img src={AppDate} alt="AppDate" /></th>
            
            <th className="w-10 text-center font-sf_pro_text px-4 py-3 border border-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y bg-white divide-gray-300 text-center">
          {applicantData.map((applicant, idx) => (
            <tr key={idx} className="*:text-gray-900">
              <td className="font-bold">{idx + 1}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">{applicant.attributes.applicantName}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">{applicant.attributes.applicantEmail}</td>
              <td className="text-center font-sf_pro_text px-4 py-3 border border-gray-300">{applicant.attributes.appliedAt}</td>
              <td>
                <Link to={`/CompanyDashboard/${jobId}/${applicant.applicantId}`}>
                  <img src={Next2} alt="Next" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        )}
      </div>
    </div>
  );
}
