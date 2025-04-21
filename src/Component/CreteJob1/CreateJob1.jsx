import React, { useState } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import frame from "../../assets/Images/Frame.svg";
import job1 from "../../assets/Images/job1.svg";
import job from "../../assets/Images/job free.svg";
import line from "../../assets/Images/Line 69.svg";
import { usePostJob } from "../../Context/PostJobContext";

export default function CreateJob1() {
  const [formData, setFormData] = useState({}); // تعريف setFormData

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    experience_level: Yup.string().required("Required"),
    work_location: Yup.string().required("Required"),
    work_hours: Yup.string().required("Required"),
    requirements: Yup.string()
      .required("Required")
      .min(10, "Minimum 10 characters"),
    skills: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "At least one skill is required")
      .max(20, "Maximum 20 skills allowed"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      experience_level: "",
      work_location: "",
      work_hours: "",
      requirements: "",
      skills: [],
    },
    validationSchema, // إضافة التحقق من الصحة
    onSubmit: (values) => {
      // حفظ البيانات في localStorage
      localStorage.setItem("formData", JSON.stringify(values));

      // تحديث حالة formData المحلية (إذا كنت تستخدم حالة في الـ component)
      setFormData({ ...formData, ...values });
      console.log(formData);
      // الانتقال إلى الصفحة التالية
      navigate("/CreateJob2");
    },
  });
  const navigate = useNavigate();

  // لا حاجة لتعريف handleNext هنا، استخدم onSubmit في Formik مباشرة
  return (
    <div className="">
      <p className="font-sf_pro_text font-semibold text-base mb-3 ml-8 mt-6">
        Create Job
      </p>
      <div className="w-full h-[2px] bg-slate-200 "></div>
      <div className="w-[95%] m-auto grid grid-cols-11 mt-7">
        {/* Sidebar */}
        <div className="col-span-2">
          <div className="flex gap-4 mb-7">
            <img src={job1} alt="" />
            <p className="font-sf_pro_text font-medium">Job Information</p>
          </div>
          <div className="flex gap-4 mb-7">
            <img src={job} alt="" />
            <p className="font-sf_pro_text font-medium">Job Details</p>
          </div>
          <div className="flex gap-4 mb-7">
            <img src={job} alt="" />
            <p className="font-sf_pro_text font-medium">Final Settings</p>
          </div>
        </div>

        {/* Formik Form */}
        <div className="col-span-9">
          <form onSubmit={formik.handleSubmit}>
            {/* Job Title */}
            <div className="mb-5 flex w-[60%]">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 mr-72">
                Job Title <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[40%]">
                <input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              {formik.errors.title && formik.touched.title && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.title}
                </div>
              )}
            </div>

            <img src={line} alt="" />

            {/* Job Type */}
            <div>
              <div className="flex space-x-6 mt-4 mb-4 ">
              <label className="block font-bold text-gray-700">
                Job Type <span className="text-[#F11F1B]">*</span>
              </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Freelance"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === "Freelance"}
                    className="mr-2"
                  />
                  Freelance
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Full-time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === "Full-time"}
                    className="mr-2"
                  />
                  Full-time
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Part-time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.type === "Part-time"}
                    className="mr-2"
                  />
                  Part-time
                </label>
                {formik.errors.type && formik.touched.type && (
                  <div className="text-red-500 text-sm mt-2 ms-2">
                    {formik.errors.type}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex space-x-6 mt-4 mb-4">
              <label className="block font-bold text-gray-700">
                Experience Level <span className="text-[#F11F1B]">*</span>
              </label>
                <label>
                  <input
                    type="radio"
                    name="experience_level"
                    value="Junior"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.experience_level === "Junior"}
                    className="mr-2"
                  />
                  Junior
                </label>
                <label>
                  <input
                    type="radio"
                    name="experience_level"
                    value="Mid-level"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.experience_level === "Mid-level"}
                    className="mr-2"
                  />
                  Mid-Level
                </label>
                <label>
                  <input
                    type="radio"
                    name="experience_level"
                    value="Senior"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.experience_level === "Senior"}
                    className="mr-2"
                  />
                  Senior
                </label>
                {formik.errors.experience_level &&
                  formik.touched.experience_level && (
                    <div className="text-red-500 text-sm mt-2 ms-2">
                      {formik.errors.experience_level}
                    </div>
                  )}
              </div>
            </div>

            <div>
              <div className="flex space-x-6 mt-4 mb-4 ">
              <label className="block font-bold text-gray-700">
                Location <span className="text-[#F11F1B]">*</span>
              </label>
                <label>
                  <input
                    type="radio"
                    name="work_location"
                    value="Remote"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.work_location === "Remote"}
                    className="mr-2"
                  />
                  Remote
                </label>
                <label>
                  <input
                    type="radio"
                    name="work_location"
                    value="Onsite"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.work_location === "Onsite"}
                    className="mr-2"
                  />
                  On-site
                </label>
                <label>
                  <input
                    type="radio"
                    name="work_location"
                    value="Hybrid"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.work_location === "Hybrid"}
                    className="mr-2"
                  />
                  Hybrid
                </label>
                {formik.errors.work_location &&
                  formik.touched.work_location && (
                    <div className="text-red-500 text-sm mt-2 ms-2">
                      {formik.errors.work_location}
                    </div>
                  )}
              </div>
            </div>

            <div>
              <div className="flex space-x-6 mt-4 mb-4">
              <label className="block  text-gray-700 font-bold">
                Working Hours <span className="text-[#F11F1B]">*</span>
              </label>
                <label>
                  <input
                    type="radio"
                    name="work_hours"
                    value="Flexible schedule"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.work_hours === "Flexible schedule"}
                    className="mr-2"
                  />
                  Flexible Schedule
                </label>
                <label>
                  <input
                    type="radio"
                    name="work_hours"
                    value="Fixed schedule"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.work_hours === "Fixed schedule"}
                    className="mr-2"
                  />
                  Fixed Schedule
                </label>
                {formik.errors.work_hours && formik.touched.work_hours && (
                  <div className="text-red-500 text-sm mt-2 ms-2">
                    {formik.errors.work_hours}
                  </div>
                )}
              </div>
            </div>
            <img src={line} alt="" />

            
            <div className="mb-5 flex  mt-8">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 mr-44">
                 Requirements <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[40%]">
                <input
                  name="requirements"
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="ex: Bachelor’s Degree in Computer Science"
                  className="bg-gray-50 border h-14 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              {formik.errors.requirements && formik.touched.requirements && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.requirements}
                </div>
              )}
            </div>
            <img src={line} alt="" />

            {/* Skills */}
            <div className="mb-20 flex w-[65%] mt-8">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 mr-60">
                Required Skills <span className="text-[#F11F1B]">*</span>
              </label>
              <div className="w-[40%]">
                <input
                  name="skills"
                  value={formik.values.skills}
                  onChange={(e) => {
                    const values = e.target.value
                      .split(",")
                      .map((skill) => skill.trim());
                    formik.setFieldValue("skills", values);
                  }}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="bg-gray-50 border h-14 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              {formik.errors.skills && formik.touched.skills && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.skills}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="w-full h-[2px] bg-slate-200 mb-7"></div>
            <div className="h-20 w-full relative bottom-0 right-0 left-0 flex justify-between">
              <Link to="/">
                <button
                  type="button"
                  className="w-24 h-12 text-[#0C2E82] border-2 rounded-xl border-[#0C2E82]"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="w-24 h-12 bg-[#0C2E82] text-white rounded-xl"
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
