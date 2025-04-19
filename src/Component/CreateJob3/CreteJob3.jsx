import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import frame from "../../assets/Images/Frame.svg";
import job3 from "../../assets/Images/job3.svg";
import job from "../../assets/Images/job free.svg";
import Done from "../../assets/Images/Done.svg";
import line from "../../assets/Images/Line 69.svg";
import { Link, useNavigate } from "react-router-dom";
import { usePostJob } from "../../Context/PostJobContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateJob3() {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // افترضنا أنك خزنت البيانات من الصفحة الأولى في localStorage
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData); // قم بتحديث الحالة بالبيانات المخزنة
    }
  }, []);
  const validationSchema = Yup.object({
    available_to: Yup.date().required("Close date is required"),
    max_applicants: Yup.number()
      .required("Maximum applications is required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
    required_no_of_hires: Yup.number()
      .required("Required applicants is required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
    salary: Yup.number()
      .min(1, "Salary must be a positive number")
      .required("Salary is required"),
    currency: Yup.string().required("Currency is required"),
    job_location: Yup.string().required("Job location is required"),
  });

  const formik = useFormik({
    initialValues: {
      available_to: "",
      max_applicants: "",
      required_no_of_hires: "",
      salary: "",
      currency: "",
      job_location: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const combinedData = { ...formData, ...values };
      const toastId = toast.loading("Creating Job..."); // إضافة تحميل        
      try {
        

        await axios.post(
          "https://hireverse.ddns.net/api/jobs",
          combinedData,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
            },
          }
        ); // إرسال البيانات
        toast.success("Job Created Successfully", { id: toastId }); // إضافة نجاح
        navigate("/"); // الانتقال للصفحة التالية
      } catch (error) {
        console.error("Error submitting the form", error);
        toast.error("Error creating job", { id: toastId }); // إضافة خطأ
        
      }
    },
  });

  const navigate = useNavigate();
  // const { formData } = usePostJob();
  return (
    <div className="">
      <p className="font-sf_pro_text font-semibold text-base mb-3 ml-8 mt-6">
        Create Job
      </p>
      <div className="w-full h-[2px] bg-slate-200 "></div>
      <div className="w-[95%] m-auto grid grid-cols-11 mt-7">
        <div className="column col-span-2 h-4">
          <div className="flex gap-4 mb-7">
            <img src={Done} alt="" />
            <p className="font-sf_pro_text font-medium ">Job Information</p>
          </div>
          <div className="flex gap-4 mb-7">
            <img src={Done} alt="" />
            <p className="font-sf_pro_text font-medium ">Job Details</p>
          </div>
          <div className="flex gap-4 mb-7">
            <img src={job3} alt="" />
            <p className="font-sf_pro_text font-medium ">Final Settings</p>
          </div>
        </div>

        <div className="col-span-9">
          <form onSubmit={formik.handleSubmit}>
            {/* Close Date */}
            <div className="flex">
              <label className="mr-72 text-base mt-6 font-semibold">
                Close Date<span className="text-[#F11F1B]">*</span>
              </label>
              <div className="relative max-w-sm w-[480px]">
                <input
                  type="date"
                  name="available_to"
                  value={formik.values.available_to}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                />
              </div>
              {formik.errors.available_to && formik.touched.available_to && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.available_to}
                </div>
              )}
            </div>

            <img src={line} className="mt-10 mb-10" alt="" />
            <div className="flex">
              <label className="mr-72 text-base mt-6 font-semibold">
                Job Location <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="relative max-w-sm w-[480px]">
                <input
                  type="text"
                  name="job_location"
                  placeholder="Enter the job_location..."
                  value={formik.values.job_location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                />
              </div>
              {formik.errors.job_location && formik.touched.job_location && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.job_location}
                </div>
              )}
            </div>
            <img src={line} className="mt-10 mb-10" alt="" />
            <div className="flex">
              <label className="mr-72 text-base mt-6 font-semibold">
                Salary <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="relative max-w-sm w-[480px]">
                <input
                  type="number"
                  name="salary"
                  placeholder="Enter the salary..."
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                />
              </div>
              {formik.errors.salary && formik.touched.salary && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.salary}
                </div>
              )}
            </div>
            <img src={line} className="mt-10 mb-10" alt="" />
            <div className="flex">
              <label className="mr-72 text-base mt-6 font-semibold">
                Currency <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="relative max-w-sm w-[480px]">
                <input
                  type="text"
                  name="currency"
                  placeholder="Enter the currency..."
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                />
              </div>
              {formik.errors.currency && formik.touched.currency && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.currency}
                </div>
              )}
            </div>

            <img src={line} className="mt-10 mb-10" alt="" />

            {/* Maximum Applications */}
            <div className="mb-5 flex w-[70%]">
              <label
                htmlFor="maxApplications"
                className="block mb-2 text-sm font-medium text-gray-900 mt-4 mr-52"
              >
                Maximum Applications <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[70%]">
                <input
                  type="number"
                  name="max_applicants"
                  value={formik.values.max_applicants}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Set a limit for applications..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              {formik.errors.max_applicants &&
                formik.touched.max_applicants && (
                  <div className="text-red-500 text-sm mt-2 ms-2">
                    {formik.errors.max_applicants}
                  </div>
                )}
            </div>
            <img src={line} className="mt-10 mb-10" alt="" />

            {/* Required Applicants */}
            <div className="mb-5 flex w-[70%]">
              <label
                htmlFor="requiredApplicants"
                className="block mb-2 text-sm font-medium text-gray-900 mt-4 mr-52"
              >
                Required No. Applicants{" "}
                <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[70%]">
                <input
                  type="number"
                  name="required_no_of_hires"
                  value={formik.values.required_no_of_hires}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter the number of applicants..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              {formik.errors.required_no_of_hires &&
                formik.touched.required_no_of_hires && (
                  <div className="text-red-500 text-sm mt-2 ms-2">
                    {formik.errors.required_no_of_hires}
                  </div>
                )}
            </div>

            <div className="w-full h-[2px] bg-slate-200 mb-12 mt-14"></div>

            {/* Buttons */}
            <div className="h-20 w-full flex justify-between">
              <Link to="/CreateJob2">
                <button
                  type="button"
                  className="w-24 h-12 text-[#0C2E82] border-2 rounded-xl border-solid border-[#0C2E82]"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="w-24 h-12 border-2 rounded-xl border-solid bg-[#0C2E82] text-[#FFFFFF]"
              >
                Finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
