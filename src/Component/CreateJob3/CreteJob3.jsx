import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import frame from "../../assets/Images/Frame.svg";
import job3 from "../../assets/Images/job3.svg";
import job from "../../assets/Images/job free.svg";
import Done from "../../assets/Images/Done.svg";
import line from "../../assets/Images/Line 69.svg";
import { Link, useNavigate } from "react-router-dom";
import { usePostJob } from "../../Context/PostJobContext"; 

const validationSchema = Yup.object({
  openDate: Yup.date().required('Open date is required'),
  closeDate: Yup.date()
    .required('Close date is required')
    .min(Yup.ref('openDate'), 'Close date cannot be before open date'),
  maxApplications: Yup.number()
    .required('Maximum applications is required')
    .positive('Must be a positive number')
    .integer('Must be an integer'),
  requiredApplicants: Yup.number()
    .required('Required applicants is required')
    .positive('Must be a positive number')
    .integer('Must be an integer'),
});


const handleSubmit = async () => {
    try {
      const res = await fetch('https://hireverse.ddns.net/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error('Failed to submit');
  
      const result = await res.json();
      console.log('Job submitted:', result);
    } catch (err) {
      console.error(err);
    }
  };

export default function CreateJob3() {
  const navigate = useNavigate();
  const { formData } = usePostJob();
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
          <Formik
            initialValues={{
              openDate: '',
              closeDate: '',
              maxApplications: '',
              requiredApplicants: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              // Here you would usually send the data to your backend or move to a confirmation page
              navigate("/CreateJob3"); // you can change the path if needed
            }}
          >
            {() => (
              <Form>
                {/* Open Date */}
                <div className="flex">
                  <label className="mr-72 text-base mt-6 font-semibold">
                    Open Date<span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="relative max-w-sm w-[480px]">
                    <Field
                      type="date"
                      name="openDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                    />
                    <ErrorMessage
                      name="openDate"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                </div>

                <img src={line} className="mt-10 mb-10" alt="" />

                {/* Close Date */}
                <div className="flex">
                  <label className="mr-72 text-base mt-6 font-semibold">
                    Close Date<span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="relative max-w-sm w-[480px]">
                    <Field
                      type="date"
                      name="closeDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
                    />
                    <ErrorMessage
                      name="closeDate"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
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
                    <Field
                      type="number"
                      name="maxApplications"
                      placeholder="Set a limit for applications..."
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="maxApplications"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                </div>

                <img src={line} className="mt-10 mb-10" alt="" />

                {/* Required Applicants */}
                <div className="mb-5 flex w-[70%]">
                  <label
                    htmlFor="requiredApplicants"
                    className="block mb-2 text-sm font-medium text-gray-900 mt-4 mr-52"
                  >
                    Required No. Applicants <span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="w-[70%]">
                    <Field
                      type="number"
                      name="requiredApplicants"
                      placeholder="Enter the number of applicants..."
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="requiredApplicants"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
