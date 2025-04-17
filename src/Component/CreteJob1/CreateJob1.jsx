import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import frame from "../../assets/Images/Frame.svg";
import job1 from "../../assets/Images/job1.svg";
import job from "../../assets/Images/job free.svg";
import line from "../../assets/Images/Line 69.svg";
import { usePostJob } from "../../Context/PostJobContext"; 

const validationSchema = Yup.object({
  jobTitle: Yup.string().required("Required"),
  jobType: Yup.string().required("Required"),
  experienceLevel: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  workingHours: Yup.string().required("Required"),
  education: Yup.string().required("Required"),
  skills: Yup.string().required("Required"),
});

export default function CreateJob1() {
  const navigate = useNavigate();
  const { updateFormData } = usePostJob(); // تأكد من استخدام useJob بدلًا من usePostJob

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
          <Formik
            initialValues={{
              jobTitle: "",
              jobType: "",
              experienceLevel: "",
              location: "",
              workingHours: "",
              education: "",
              skills: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              updateFormData(values);  // حفظ البيانات في الكونتكست
              navigate("/CreateJob2");  // الانتقال للصفحة التالية
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Job Title */}
                <div className="mb-5 flex w-[60%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 mr-72">
                    Job Title <span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="w-[50%]">
                    <Field
                      name="jobTitle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="jobTitle"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                </div>

                <img src={line} alt="" />

                {/* Job Type */}
                <RadioGroup
                  label="Job Type"
                  name="jobType"
                  options={["Internship", "Full-time", "Part-time"]}
                  touched={touched}
                  errors={errors}
                  margin="mr-72"
                />
                <img src={line} alt="" />

                {/* Experience Level */}
                <RadioGroup
                  label="Experience Level"
                  name="experienceLevel"
                  options={["Junior", "Mid-Level", "Senior"]}
                  touched={touched}
                  errors={errors}
                  margin="mr-60"
                />
                <img src={line} alt="" />

                {/* Location */}
                <RadioGroup
                  label="Location"
                  name="location"
                  options={["Remote", "On-site", "Hybrid"]}
                  touched={touched}
                  errors={errors}
                  margin="mr-72"
                />
                <img src={line} alt="" />

                {/* Working Hours */}
                <RadioGroup
                  label="Working Hours"
                  name="workingHours"
                  options={["Flexible Schedule", "Fixed Schedule"]}
                  touched={touched}
                  errors={errors}
                  margin="mr-60"
                />
                <img src={line} alt="" />

                {/* Education */}
                <div className="mb-5 flex w-[65%] mt-8">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 mr-44">
                    Education Requirements <span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="w-[50%]">
                    <Field
                      name="education"
                      placeholder="ex: Bachelor’s Degree in Computer Science"
                      className="bg-gray-50 border h-14 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="education"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                </div>
                <img src={line} alt="" />

                {/* Skills */}
                <div className="mb-20 flex w-[65%] mt-8">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4 mr-60">
                    Required Skills <span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="w-[50%]">
                    <Field
                      name="skills"
                      className="bg-gray-50 border h-14 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

// Reusable RadioGroup component
const RadioGroup = ({ label, name, options, touched, errors, margin }) => (
  <div className={`mb-5 flex w-[70%] mt-8`}>
    <p className={`${margin} text-sm font-medium`}>
      {label} <span className="text-[#F11F1B]">*</span>
    </p>
    <div className="flex items-center mb-4">
      {options.map((option, index) => (
        <div className="radio mr-12" key={index}>
          <label className="flex items-center">
            <Field
              type="radio"
              name={name}
              value={option}
              className="w-4 h-4 text-blue-600 border-gray-300"
            />
            <span className="ms-2 text-sm font-medium text-gray-900">
              {option}
            </span>
          </label>
        </div>
      ))}
    </div>
    {touched[name] && errors[name] && (
      <div className="text-red-600 text-xs mt-1 absolute right-10">{errors[name]}</div>
    )}
  </div>
);

