import { Calendar, EllipsisVertical, ListCollapse, MapPin, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AA from "../../assets/Images/AA.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function CompanyJobs({ companyJob , onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleDelete = async () => {
    const idToast = toast.loading("Deleting your Job...");

    if (!companyJob?.jobId) {
      console.error("No job ID found for deletion.");
      setShowConfirmPopup(false);
      toast.error("No Job ID found!", { id: idToast });
      return;
    }

    onDelete(companyJob.jobId);

    try {
      await axios.delete(
        `https://hireverse.ddns.net/api/jobs/${companyJob.jobId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        }
      );

      toast.success("Job deleted successfully", { id: idToast });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting Job", { id: idToast });
    } finally {
      setShowConfirmPopup(false);
    }
  };

  return (
    <div className="w-[454px] bg-white rounded-[14px] mt-3 ms-20 p-8 font-sf_pro_text relative">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">
          {companyJob.attributes.companyName}
        </h2>
        <EllipsisVertical
          className="cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 bg-white border rounded-md shadow-lg w-32 z-10">
          <Link to={`/CompanyDashboard/${companyJob.jobId}`} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-4">
            <ListCollapse /> Details
          </Link>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-4 text-red-600"
            onClick={() => {
              setShowConfirmPopup(true);
              setIsMenuOpen(false);
            }}
          >
            <Trash2 /> Delete
          </button>
        </div>
      )}

      {/* Confirm Delete Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-80">
            <h3 className="text-lg font-semibold">Are you sure?</h3>
            <p>Do you really want to delete this job?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex mt-6 gap-6">
        <div className="bg-[#E1F1EFD4] text-[#0C7566] text-sm rounded-md w-[87px] h-[40px] flex justify-center items-center">
          {companyJob.attributes.jobType}
        </div>
        <div className="bg-[#EDC89533] text-[#D39339] text-sm rounded-md w-[87px] h-[40px] flex justify-center items-center">
          {companyJob.attributes.worLdLocation}
        </div>
        <div className="flex items-center gap-2">
          <MapPin /> <p>{companyJob.attributes.jobLocation}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Calendar />
        <p>Created {companyJob.attributes.createdAt}</p>
      </div>

      <div className="mt-4">
        <p>
          Available To{" "}
          <span className="text-[#008A3E] font-bold">
            {companyJob.attributes.availableTo}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <img src={AA} alt="" />
        <p className="mt-3 text-[#008A3E] font-bold text-2xl">
          {companyJob.attributes.applicantsCount}
        </p>
      </div>
    </div>
  );
}
