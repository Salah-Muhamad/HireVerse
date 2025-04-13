import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import MainLogo from "../../assets/Images/MainLogo.svg";
import Password from "../../assets/Images/Password.svg";
import Step1 from "../../assets/Images/Step1.svg";
import * as Yup from "yup"; // استيراد Yup للتحقق من صحة البيانات

export default function SignUpCompany1() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // تعريف مخطط Yup للتحقق من صحة البيانات
  const validationSchema = Yup.object({
    name: Yup.string().required("Company name is required"),
    ceo: Yup.string().required("CEO name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Business Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      ceo: "",
      email: "",
      password: "",
    },
    validationSchema, // إضافة التحقق من الصحة
    onSubmit: (values) => {
      localStorage.setItem("formData", JSON.stringify(values)); // حفظ البيانات
      setFormData({ ...formData, ...values });
      navigate("/SignUpCompany2");
    },
  });

  return (
    <div className="h-[150vh] bg-[url('src/assets/Images/back.jpg')] bg-cover bg-center bg-fixed pt-10 font-sf_pro_text">
      {/* Header */}
      <div className="flex justify-between mx-14">
        <NavLink to={"/"}>
          <div className="flex items-center gap-2 ms-10">
            <img src={MainLogo} alt="Logo" />
            <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">
              HIRE VERSE
            </p>
          </div>
        </NavLink>
        <div className="w-80 bg-white h-12 rounded-md flex justify-evenly text-xs items-center font-normal">
          <p>Want to apply for jobs?</p>
          <NavLink to={"/SignUpApplicant"}>
            <p className="text-[#0146B1]">Create an Applicant account</p>
          </NavLink>
        </div>
      </div>

      {/* Form */}
      <div className="w-[616px] bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">
        <div className="ms-4">
          <img src={Step1} alt="Step 1" className="mb-10" />
          <h2 className="font-medium text-2xl">Create your account</h2>
          <p className="text-[#979797] font-normal text-base mt-4">
            start posting job openings.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-9 flex justify-center gap-6">
            <div>
              <h2 className="font-semi_bold">Company name</h2>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="rounded-xl border-2 bg-white p-4 mt-1 border-[#99B1B9] flex items-center h-14 w-[247px] focus:outline-none"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-semi_bold">CEO name</h2>
              <input
                type="text"
                name="ceo"
                onChange={formik.handleChange}
                value={formik.values.ceo}
                className="rounded-xl border-2 bg-white mt-1 p-4 border-[#99B1B9] flex items-center h-14 w-[247px] focus:outline-none"
              />
              {formik.errors.ceo && formik.touched.ceo && (
                <div className="text-red-500 text-sm mt-2 ms-2">
                  {formik.errors.ceo}
                </div>
              )}
            </div>
          </div>

          <div className="mt-9 mx-4">
            <h2 className="font-semi_bold">Business Email</h2>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] w-[517px] h-14 focus:outline-none p-4"
              placeholder="ex: contact@name.com"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-2 ms-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mt-9 mx-4">
            <h2 className="font-semi_bold">Password</h2>
            <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center justify-between h-14 w-[517px]">
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full focus:outline-none ms-2"
              />
              <img src={Password} alt="Password" className="pe-4" />
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-2 ms-2">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
