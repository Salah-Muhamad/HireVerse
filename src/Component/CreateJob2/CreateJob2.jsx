import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import frame from "../../assets/Images/Frame.svg";
import job2 from "../../assets/Images/job2.svg";
import job from "../../assets/Images/job free.svg";
import Done from "../../assets/Images/Done.svg";
import line from "../../assets/Images/Line 69.svg";
import { usePostJob } from "../../Context/PostJobContext"; 
const validationSchema = Yup.object({
  summary: Yup.string().required("Summary is required"),
  responsibilities: Yup.string().required("Responsibilities are required"),
});



const handleNext = (values) => {
  updateFormData(values);
  navigate('/CreateJob3');
};


export default function CreateJob2() {
    const { updateFormData } = usePostJob();
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
          <Formik
            initialValues={{
              summary: "",
              responsibilities: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              navigate("/CreateJob3");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Summary */}
                <div className="flex mb-9">
                  <label
                    htmlFor="summary"
                    className="block mr-52 mt-16 mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Summary<span className="text-[#F11F1B]">*</span>
                  </label>
                  <div className="w-[60%]">
                    <Field
                      as="textarea"
                      id="summary"
                      name="summary"
                      rows="7"
                      cols="70"
                      placeholder="A brief overview of the job and key responsibilities"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="summary"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
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
                    <Field
                      as="textarea"
                      id="responsibilities"
                      name="responsibilities"
                      rows="7"
                      cols="70"
                      placeholder="List the main tasks and duties the candidate will handle"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="responsibilities"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
