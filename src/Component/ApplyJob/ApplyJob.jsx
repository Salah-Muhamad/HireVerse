import React, { useEffect } from "react";
import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function ApplyJob() {
  const cvUrl = localStorage.getItem("cv");
  const [cv, setCV] = useState(cvUrl);
  const [cvFile, setCvFile] = useState(null);
  const [uploadDate, setUploadDate] = useState("1/7/2025");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();
  function onFileUploaderChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      setCV(file.name);
      setCvFile(file);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    const toastId = toast.loading("Uploading CV...");
    let file = "";
    if (!cvFile && cvUrl) {
      const { data } = await axios.get(
        `https://hireverse.ddns.net/api/storage/${cvUrl}`
      );
      // setCvFile(data);
      file = new File([data], `cv${new Date().getTime()}.pdf`, {
        type: "application/pdf",
        lastModified: Date.now(),
      });
    } else {
      if (cvFile) {
        file = cvFile;
      }
    }
    const formData = new FormData();

    formData.append("cv", file);
    console.log(file);
    try {
      await axios.post(
        `https://hireverse.ddns.net/api/applicant/jobs/${id}/applications`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      toast.success("CV Uploaded Successfully", { id: toastId });
      navigate(-1);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
    setLoading(false);
  }
  function back(e) {
    // if(e.target)
    navigate(-1);
    console.log(e);
  }
  return (
    <div className="fixed w-full h-full inset-0 bg-slate-400 bg-opacity-50 z-10 flex items-center justify-center">
      <div className="w-[650px] h-[500px] mx-auto flex flex-col justify-evenly bg-white p-6 rounded-lg shadow-lg mt-12 relative">
        <X onClick={back} className="cursor-pointer absolute right-4 top-4" />
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">
            Upload your CV <span className="text-red-500">*</span>
          </h2>
        </div>
        <p className="text-gray-500 text-sm mb-2">
          Make sure to upload your updated CV
        </p>
        {cv && (
          <div className="mb-4 pr-4 border border-gray-200 h-[50px] flex items-center justify-between  rounded-lg overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="bg-[#0C2E82] h-[50px] flex justify-center items-center w-[60px] text-white px-2 py-1 rounded text-sm">
                PDF
              </span>
              <div className="">
                <p className="font-medium">{cv.split("/").at(-1)}</p>
                <p className="text-xs text-gray-500">
                  Uploaded on {uploadDate}
                </p>
              </div>
            </div>
            <X onClick={() => setCV("")} className="cursor-pointer" />
          </div>
        )}
        <div>
          <label
            htmlFor="UploadCv"
            className=" flex items-center gap-2 bg-[#1F4171] w-56 rounded-[30px] text-white px-4 py-2 cursor-pointer hover:bg-[#1F4171] transition duration-300"
          >
            <input
              onChange={onFileUploaderChange}
              id="UploadCv"
              className="hidden"
              type="file"
            />
            <CloudUpload /> Upload New CV
          </label>
          <p className="text-gray-500 text-xs mt-2">PDF, DOCX | Max: 2 MB</p>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="flex justify-end">
          <button
            className="w-32 mt-4 bg-[#1F4171] text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
