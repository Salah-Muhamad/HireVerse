import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FinalAcceptancePro() {
  const [accepted, setAccepted] = useState([]);

  async function getAcceptedApplicants() {
    try {
      const { data } = await axios.get(
        "https://hireverse.ddns.net/api/company/jobs/8/completed-interviews",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        }
      );
      setAccepted(data);
    } catch (error) {
      console.error("Error fetching accepted applicants:", error);
    }
  }

  useEffect(() => {
    getAcceptedApplicants();
  }, []);

  return (
    <div className="bg-[#EFF2F7] h-screen font-sf_pro_text">
      <table className="min-w-[78%] border border-gray-300 m-auto mt-10">
        <thead className="sticky top-0 ltr:text-left rtl:text-right border-b border-gray-300 bg-[#E9ECF0]">
          <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300">
            <th>#</th>
            <th>Name</th>
            <th>Profile Link</th>
            <th>Soft Skills Score</th>
            <th>Technical Skills Score</th>
            <th>Dashboard</th>
            <th>Interview Videos</th>
          </tr>
        </thead>
        <tbody>
          {accepted.map((applicant, index) => (
            <tr key={applicant.applicant_id} className="*:text-gray-900 *:border *:border-gray-300">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 text-center text-center">
                {applicant.first_name} {applicant.last_name}
              </td>
              <td className="px-4 py-3 text-center">
                <a
                  href={`/profile/${applicant.applicant_id}`}
                  className="text-blue-600 underline"
                >
                  View Profile
                </a>
              </td>
              <td className="px-4 py-3 text-center">{applicant.soft_score} %</td>
              <td className="px-4 py-3 text-center">{applicant.technical_score} %</td>
              <td className="px-4 py-3 text-center">
                <a
                  href={`https://moose-polite-hookworm.ngrok-free.app/api/interview/dashboard/?id=${applicant.interview_id}`}
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  Dashboard
                </a>
              </td>
              <td className="px-4 py-3 text-center">
                {applicant.video_urls.map((url, vidIndex) => (
                  <div key={vidIndex}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Video {vidIndex + 1}
                    </a>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
