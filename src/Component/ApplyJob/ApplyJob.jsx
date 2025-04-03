import React, { useEffect } from "react";
import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import axios from "axios";
export default function ApplyJob() {
  const cvUrl = localStorage.getItem("cv");
  const [cv, setCV] = useState(cvUrl);
  const [cvFile, setCvFile] = useState(null)
  const [uploadDate, setUploadDate] = useState("1/7/2025");
  function onFileUploaderChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      setCV(file.name);
      setCvFile(file)
    }
  }
  async function handleSubmit() {
    let cvPath = "";
    if(!cvFile && cvUrl) {
      const { data } = await axios.get(
        "https://hireverse.ddns.net/storage/applicants/cvs/vhoKqZVWsHRPuzGrTgET43rC0uHcS6kXwGSH4gnf.pdf",
      );
      console.log(data);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-12">
      <h2 className="text-lg font-semibold">
        Upload your CV <span className="text-red-500">*</span>
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        Make sure to upload your updated CV
      </p>
      {cv && (
        <div className="mb-4 border border-gray-200 flex items-center justify-between p-4 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
              PDF
            </span>
            <div className="">
              <p className="font-medium">{cv.split("/").at(-1)}</p>
              <p className="text-xs text-gray-500">Uploaded on {uploadDate}</p>
            </div>
          </div>
          <X onClick={() => setCV("")} className="cursor-pointer" />
        </div>
      )}
      <label
        htmlFor="UploadCv"
        className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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
      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
