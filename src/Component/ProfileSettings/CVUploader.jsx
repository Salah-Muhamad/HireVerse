import { useState } from "react";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import toast from "react-hot-toast";

function CVUploader() {
    // console.log(localStorage.getItem("cv").split("/").pop())
  const [cv_file, set_cv_file] = useState(null); 
  const [cvName, setCvName] = useState(localStorage.getItem("cv")?.split("/").pop() || null)
  const [upload_date, set_upload_date] = useState(null);

  const handle_file_change = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const valid_types = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!valid_types.includes(file.type)) {
      alert("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be 2MB or less.");
      return;
    }
    setCvName(file.name)
    set_cv_file(file);
    set_upload_date(new Date());

  };
  

  const handle_upload = async () => {
    const toastId = toast.loading("Uploading CV...");
    if (!cv_file) {
      alert("Please select a CV file first!");
      return;
    }

    const form_data = new FormData();
    form_data.append("cv", cv_file);
    form_data.append("_method", "PATCH");

    try {
      const response = await axios.post(
        "https://hireverse.ddns.net/api/applicant/profile", // replace with your actual endpoint
        form_data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      localStorage.setItem(
        "cv",
        response.data.data.applicant.attributes.cvUrl
      ); // Update local storage with new avatar URL
      // alert("Uploaded successfully!");
      toast.success("CV Uploaded Successfully", { id: toastId });
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
      // alert("Failed to upload!");
      toast.error("Failed to upload", { id: toastId });
    }
  };

  return (
    <div className="p-5 border-2 rounded-xl mt-10 bg-[#FFFFFF]">
      <p className="font-sf_pro_text text-lg font-semibold mb-2">
        Upload Your CV
      </p>
      <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
      <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">
        Make sure to include an updated version of your CV.
      </p>

      {/* Preview if file selected */}
      {cvName && (
        <div className="flex items-center justify-between border rounded-lg p-3 mt-6 bg-[#F0F4FF]">
          <div className="flex items-center overflow-hidden gap-2">
            <div className="bg-[#0146B1]  text-white text-xs px-2 py-1 rounded">
              {cvName.split(".").pop().toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{cvName}</p>
              <p className="text-xs text-gray-500">
                Uploaded on {upload_date?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
          disabled={!cv_file}   
            onClick={handle_upload}
            className="text-[#0146B1] text-xl hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Upload"
          >
            <CloudUpload />
          </button>
        </div>

      )}

      {/* Upload area */}
      <div className="border-dotted border-2 mt-8 border-[#BAC5DC] rounded-lg p-3 text-center h-[160px] flex justify-center items-center">
        <label htmlFor="cv-upload" className="cursor-pointer">
          <div>
            <p className="text-[#0146B1] mb-3">Click to Upload</p>
            <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">
              DOC, DOCX, or PDF (max 2MB)
            </p>
          </div>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handle_file_change}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

export default CVUploader;
