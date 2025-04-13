import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Step2 from "../../assets/Images/Step2.svg";
import MainLogo from "../../assets/Images/MainLogo.svg";

import * as Yup from 'yup'; // استيراد Yup للتحقق من صحة البيانات
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignUpCompany2() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // افترضنا أنك خزنت البيانات من الصفحة الأولى في localStorage
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setFormData(savedData); // قم بتحديث الحالة بالبيانات المخزنة
    }
  }, []);

  // تعريف مخطط Yup للتحقق من صحة البيانات للصفحة الثانية
  const validationSchema = Yup.object({
    location: Yup.string().required('Location is required'),
    employee_no: Yup.number().required('Number of Employees is required').positive('Must be a positive number'),
    website_url: Yup.string().url('Invalid URL').required('Website Link is required'),
    description: Yup.string().required('Company Description is required'),
    insights: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      location: '',
      employee_no: '',
      website_url: '',
      description: '',
      insights: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const combinedData = { ...formData, ...values }; 
      const toastId = toast.loading("Creating Account..."); // إضافة تحميل
      try {
        await axios.post('https://hireverse.ddns.net/api/company/register', combinedData); // إرسال البيانات
        toast.success("Account Created Successfully", { id: toastId }); // إضافة نجاح
        navigate('/CompanyLogin'); // الانتقال للصفحة التالية
      } catch (error) {
        console.error('Error submitting the form', error);
        toast.error("Error creating account", { id: toastId }); // إضافة خطأ
      }
    }
  });

  return (
    <div className="h-[200vh] bg-[url('src/assets/Images/back.jpg')] bg-cover bg-center bg-fixed pt-10 font-sf_pro_text">
      <div className="flex justify-between mx-14">
        <NavLink to={"/"}>
          <div className="flex items-center gap-2 ms-10">
            <img src={MainLogo} alt="Logo" />
            <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">HIRE VERSE</p>
          </div>
        </NavLink>
        <div className="w-80 bg-white h-12 rounded-md flex justify-evenly text-xs items-center font-normal">
          <p>Want to post jobs?</p>
          <NavLink to={"/SignUpApplicant"}>
            <p className="text-[#0146B1]">Create an Applicant account</p>
          </NavLink>
        </div>
      </div>

      <div className="w-[616px] bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">
        <div className="ms-4">
          <img src={Step2} alt="Step 2" className="mb-10" />
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Form Fields */}
          <div className="mt-9 mx-4 flex justify-center gap-6">
            <div>
              <h2 className="font-semi_bold">Location</h2>
              <input
                type="text"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="rounded-xl px-3 border-2 bg-white mt-1 border-[#99B1B9] h-14 w-[247px]"
              />
              {formik.errors.location && formik.touched.location && (
                <div className="text-red-500 text-sm">{formik.errors.location}</div>
              )}
            </div>
            <div>
              <h2 className="font-semi_bold">Number Of Employees</h2>
              <input
                type="text"
                name="employee_no"
                onChange={formik.handleChange}
                value={formik.values.employee_no}
                className="rounded-xl px-3 border-2 bg-white mt-1 border-[#99B1B9] h-14 w-[247px]"
              />
              {formik.errors.employee_no && formik.touched.employee_no && (
                <div className="text-red-500 text-sm">{formik.errors.employee_no}</div>
              )}
            </div>
          </div>

          <div className="mt-9 mx-4">
            <h2 className="font-semi_bold">Website Link</h2>
            <input
              type="text"
              name="website_url"
              onChange={formik.handleChange}
              value={formik.values.website_url}
              className="rounded-xl px-3 border-2 bg-white mt-1 border-[#99B1B9] w-[517px] h-14"
              placeholder="ex: https://www.companyname.com"
            />
            {formik.errors.website_url && formik.touched.website_url && (
              <div className="text-red-500 text-sm">{formik.errors.website_url}</div>
            )}
          </div>

          <div className="mt-9 mx-4">
            <h2 className="font-semi_bold">Company Description</h2>
            <textarea
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full resize-none border-2 bg-white mt-1 border-[#99B1B9] h-44 p-2"
            />
            {formik.errors.description && formik.touched.description && (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            )}
          </div>

          <div className="mt-9 mx-4">
            <h2 className="font-semi_bold">Company Insights (optional)</h2>
            <textarea
              name="insights"
              onChange={formik.handleChange}
              value={formik.values.insights}
              className="w-full resize-none border-2 bg-white mt-1 border-[#99B1B9] h-28 p-2"
            />
            {formik.errors.insights && formik.touched.insights && (
              <div className="text-red-500 text-sm">{formik.errors.insights}</div>
            )}
          </div>

          <div className="text-center">
            <button type="submit" className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
