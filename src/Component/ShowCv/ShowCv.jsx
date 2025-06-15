// components/CVViewer.tsx

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CVViewer() {
    const [activeTab, setActiveTab] = useState("cv");
const [applicant, setApplicant] = useState("")
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
    const {jobId, AppId} = useParams();

    useEffect(() => {
        async function getApplicantsDetails() {
          try {
            setLoading(true)
            const { data } = await axios.get(
              `https://hireverse.ddns.net/api/company/jobs/${jobId}/applicants`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
                },
              }
            );
            
            console.log(data.data);
            const applicantDetails = data.data.find((applicant) => applicant.applicantId == AppId);
            if (applicantDetails) {
              setApplicant(applicantDetails);
            } else {
              console.error("Applicant not found");
            }
          } catch (error) {
            console.error("Error fetching applicants details:", error);
          }finally{
            setLoading(false)
          } 

        }

        getApplicantsDetails();
      }, [jobId]);
      if (loading || !applicant) {
        return (
          null
        );
      }
      
      function navigateTo() {
        navigate(-1)
      }
console.log(`https://myawshierbucket.s3.me-south-1.amazonaws.com/${applicant.cv}`)
      return (
    <div className="w-full h-screen fixed bg-black/70 inset-0 z-50 flex justify-center items-center" onClick={navigateTo} >
      <div className="  m-auto p-6 bg-white shadow-md rounded-md mt-16 w-[80%] ">
        <div className="flex items-center gap-4 border-b pb-4">
          {/* <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          /> */}
          <div>
            <h2 className="text-xl font-semibold">{applicant.attributes.applicantName}</h2>
            {/* <p className="text-gray-500">Full Stack Developer</p> */}
            <p className="text-sm text-gray-400 mt-1">{applicant.attributes.applicantEmail}</p>
            {/* <p className="text-sm text-gray-500 mt-1 max-w-md">
              Ab reiciendis vero. Accusantium blanditiis odio vel molestiae id
              sit quasi saepe. Necessitatibus optio et omnis perspiciatis sit
              repellendus.
            </p> */}
            <div className="flex gap-3 mt-2 text-blue-600">
              <a href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {/* Tabs */}
          <div className="flex border-b">
            {["cv", "interview", "report"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 capitalize font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "cv" && (
            <>
            <iframe src={`https://myawshierbucket.s3.me-south-1.amazonaws.com/${applicant.attributes.cv}`} className="w-[90%] h-[350px]"></iframe>
            
            </>
          )}

          {activeTab === "interview" && (
            <div className="pt-6 text-sm text-gray-500">Coming soon...</div>
          )}

          {activeTab === "report" && (
            <div className="pt-6 text-sm text-gray-500">Coming soon...</div>
          )}
        </div>
      </div>
    </div>
  );
}



{/* <div className="pt-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">MohamedAhmed_CV.pdf</span>
                  <button className="text-sm flex items-center gap-1 text-blue-600 hover:underline">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
                <div className="bg-white border mt-4 rounded-md p-4">
                  <h3 className="text-lg font-bold">Jane Franklin</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Douglas-Kelly Professor of English
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Address:</strong> University of Pennsylvania,
                      Philadelphia, PA 19104
                    </p>
                    <p>
                      <strong>Phone:</strong> 267-861-5317
                    </p>
                    <p>
                      <strong>Email:</strong> jane_franklin@gmail.com
                    </p>
                    <p className="mt-2">
                      Proactive lecturer with 10+ years experience teaching...
                      (shortened for display).
                    </p>
                  </div>
                </div>
              </div>
            </div> */}