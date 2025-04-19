import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import frame from "../../assets/Images/Frame.svg";
import job2 from "../../assets/Images/job2.svg";
import job from "../../assets/Images/job free.svg";
import Done from "../../assets/Images/Done.svg";
import line from "../../assets/Images/Line 69.svg";
import { usePostJob } from "../../Context/PostJobContext";

export default function CreateJob2() {
  const [formData, setFormData] = useState({}); // تعريف setFormData

  // التحقق من الصحة
  const validationSchema = Yup.object({
    summary: Yup.string().required("Summary is required"),
    responsibilities: Yup.string()
      .required("Responsibilities are required")
      .min(10, "Must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      summary: "",
      responsibilities: "",
    },
    validationSchema, // إضافة التحقق من الصحة
    onSubmit: (values) => {
      // قراءة البيانات السابقة من localStorage
      const storedData = JSON.parse(localStorage.getItem("formData")) || {};

      // دمج البيانات الجديدة مع البيانات القديمة
      const newFormData = { ...storedData, ...values };

      // حفظ البيانات المدمجة في localStorage
      localStorage.setItem("formData", JSON.stringify(newFormData));

      // تحديث حالة formData المحلية
      setFormData(newFormData);
      console.log(newFormData);

      // الانتقال إلى الصفحة التالية
      navigate("/CreateJob3");
    },
  });

  // const { updateFormData } = usePostJob();
  const navigate = useNavigate();

  return (
    <div className="">
      <p className="font-sf_pro_text font-semibold text-base mb-3 ml-8 mt-6">
        Create Job
      </p>
      <div className="w-full h-[2px] bg-slate-200 "></div>

      <div className="w-[95%] m-auto grid grid-cols-11 mt-7">
        {/* Sidebar */}
        <div className="column col-span-2 h-4">
          <div className="flex gap-4 mb-7">
            <img src={Done} alt="" />
            <p className="font-sf_pro_text font-medium ">Job Information</p>
          </div>
          <div className="flex gap-4 mb-7">
            <img src={job2} alt="" />
            <p className="font-sf_pro_text font-medium ">Job Details</p>
          </div>
          <div className="flex gap-4 mb-7">
            <img src={job} alt="" />
            <p className="font-sf_pro_text font-medium ">Final Settings</p>
          </div>
        </div>

        {/* Formik Form */}
        <div className="col-span-9 h-6">
          <form onSubmit={formik.handleSubmit}>
            {/* Summary */}
            <div className="flex mb-9">
              <label
                htmlFor="summary"
                className="block mr-52 mt-16 mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Summary<span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[60%]">
                <textarea
                  rows="7"
                  cols="70"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="A brief overview of the job and key responsibilities"
                  name="summary"
                  onChange={formik.handleChange}
                  value={formik.values.summary}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.summary && formik.touched.summary && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.summary}
                </div>
              )}
            </div>

            <img src={line} alt="" />

            {/* Responsibilities */}
            <div className="flex mb-9 mt-12">
              <label
                htmlFor="responsibilities"
                className="block mr-44 mt-16 mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Responsibilities<span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[60%]">
                <textarea
                  rows="7"
                  cols="70"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List the main tasks and duties the candidate will handle"
                  name="responsibilities"
                  onChange={formik.handleChange}
                  value={formik.values.responsibilities}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.responsibilities &&
                formik.touched.responsibilities && (
                  <div className="text-red-500 text-sm mt-2 ms-2">
                    {formik.errors.responsibilities}
                  </div>
                )}
            </div>

            <div className="w-full h-[2px] bg-slate-200 mb-16 mt-20"></div>

            {/* Buttons */}
            <div className="h-20 w-full relative bottom-0 right-0 left-0 flex justify-between">
              <Link to="/CreateJob1">
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
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
