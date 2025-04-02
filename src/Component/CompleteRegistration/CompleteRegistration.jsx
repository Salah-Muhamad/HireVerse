import React, { useEffect, useState } from "react";
import Logo from "../../assets/Images/Logo.svg";
import Star from "../../assets/Images/star.svg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function CompleteRegistration() {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const userToken = localStorage.getItem("userToken");
  let navigate = useNavigate();
  async function completeRegister(values) {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        "https://hireverse.ddns.net/api/complete",
        values,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        }
      );
      localStorage.setItem("skills" , data.data.applicant.attributes.skills)
      localStorage.setItem("jobTitle" , data.data.applicant.attributes.jobTitle)
      console.log(data.data.applicant.attributes.jobTitle);
      console.log(data.data.applicant.attributes.skills);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      setApiError(err.response?.data?.message || "Somthing Wrong.!");
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    job_title: Yup.string().required("Job Title Is Required."),
    skills: Yup.array()
      .min(1, "You Must Enter At Least One Skill") // التحقق من أن المصفوفة ليست فارغة
      .required("You Must Enter Skills"),
  });
  let formik = useFormik({
    initialValues: {
      job_title: "",
      skills: [],
    },
    validationSchema,
    onSubmit: completeRegister,
  });
  return (
    <>
      <div className="bg-[#EFF2F7] p-12">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="bg-white w-[1129px] rounded-[60px] m-auto mt-6 p-14 font-sf_pro_text">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h2 className="font-semibold text-[32px]">
                Let’s start by adding your skills!
              </h2>
              <div className="text-[#545454] text-xl mt-4 font-normal">
                <p>
                  Adding your skills helps us recommend the most relevant jobs
                  for you.
                </p>
                <p>You can edit these anytime from your profile settings.</p>
              </div>
              {apiError && (
                <div className=" ms-2 text-red-600 flex gap-1">
                  <img src={Star} alt="" />
                  <div className="mt-3">{apiError}</div>
                </div>
              )}
              <div className="mt-12 ">
                <label htmlFor="" className="font-semibold">
                  Your Skills
                </label>
                <div className="w-3/4 border h-12 rounded-lg mt-4">
                  <input
                    type="text"
                    name="skills"
                    value={formik.values.skills.join(", ")} // تحويل المصفوفة إلى نص مفصول بفواصل
                    onChange={(e) =>
                      formik.setFieldValue(
                        "skills",
                        e.target.value.split(",").map((skill) => skill.trim()) // تقسيم النص إلى مصفوفة
                      )
                    }
                    onBlur={formik.handleBlur}
                    className="w-full h-full p-4"
                    placeholder="Enter skills here (comma separated)"
                  />
                </div>
                {formik.errors.skills && formik.touched.skills && (
                  <div className=" ms-2 text-red-600 flex gap-1">
                    <img src={Star} alt="" />
                    <div className="mt-3">{formik.errors.skills}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-semibold text-[32px]">
                What’s your desired job title?
              </h2>
              <div className="text-[#545454] text-xl mt-4 font-normal">
                <p>
                  This helps us understand your career goals and recommend
                  relevant roles.
                </p>
                <p>You can edit these anytime from your profile settings.</p>
              </div>
              <div className="mt-12 ">
                <label htmlFor="" className="font-semibold">
                  Your job title
                </label>
                <div className="w-3/4 border h-12 rounded-lg mt-4">
                  <input
                    type="text"
                    name="job_title"
                    value={formik.values.job_title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full h-full p-4 "
                    placeholder="Enter Your job title here"
                  />
                </div>
                {formik.errors.job_title && formik.touched.job_title && (
                  <div className=" ms-2 text-red-600 flex gap-1">
                    <img src={Star} alt="" />
                    <div className="mt-3">{formik.errors.job_title}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-[#1F4171] w-32 h-12 rounded-lg text-white text-center font-medium">
                Finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
