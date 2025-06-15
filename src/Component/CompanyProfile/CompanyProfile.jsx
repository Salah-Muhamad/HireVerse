import React, { useEffect } from "react";
import user from "../../assets/Images/user.svg";
import lock from "../../assets/Images/lock.svg";
import del from "../../assets/Images/delete.svg";
import photo2 from "../../assets/Images/Prof.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState("");
  const [ceo, setCeo] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [employeesNo, setEmployeesNo] = useState("");
  const [webSiteUrl, setWebSiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [insights, setInsights] = useState("");

  const [photo, setPhoto] = useState();
  const [method, setMethod] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhoto(URL.createObjectURL(file)); // عرض مؤقت للصورة
    }
  };

  const saveProfilePhoto = async () => {
    const toastId = toast.loading("Uploading photo...");
    if (!selectedFile) {
      console.log("Please select an image first!");
      return;
    }

    const form_data = new FormData();
    form_data.append("logo", selectedFile);
    form_data.append("_method", "PATCH");

    try {
      const response = await axios.post(
        "https://hireverse.ddns.net/api/companies",
        form_data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Uploaded successfully!", { id: toastId });

      const newAvatarUrl = response.data.data.attributes.logoUrl;

      // تحديث localStorage بالمفتاح الصحيح
      localStorage.setItem("company_logo", newAvatarUrl);

      // تحديث الصورة مباشرة
      setPhoto(`https://myawshierbucket.s3.me-south-1.amazonaws.com/${newAvatarUrl}`);

      console.log("Server response:", newAvatarUrl);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload!", { id: toastId });
    }

    console.log(selectedFile);
  };

  function handleDiscard() {
    const storedCompanyName = localStorage.getItem("company_name") || "";
    // const storedEmail = localStorage.getItem("company_email") || "";
    const storedCeo = localStorage.getItem("company_ceo") || "";
    const storedIndustry = localStorage.getItem("company_industry") || "";
    const storedLocation = localStorage.getItem("company_location") || "";
    const storedEmployeesNo = localStorage.getItem("company_employee_no") || "";
    const storedWebSiteUrl = localStorage.getItem("company_website_url") || "";
    const storedDescription = localStorage.getItem("company_description") || "";
    const storedInsights = localStorage.getItem("company_insights") || "";

    setCompanyName(storedCompanyName);
    // setEmail(storedEmail);
    setCeo(storedCeo);
    setIndustry(storedIndustry);
    setLocation(storedLocation);
    setEmployeesNo(storedEmployeesNo);
    setWebSiteUrl(storedWebSiteUrl);
    setDescription(storedDescription);
    setInsights(storedInsights);

    formik.setFieldValue("company_name", storedCompanyName);
    // formik.setFieldValue("company_email", storedEmail);
    formik.setFieldValue("company_ceo", storedCeo);
    formik.setFieldValue("company_industry", storedIndustry);
    formik.setFieldValue("company_location", storedLocation);
    formik.setFieldValue("company_employee_no", storedEmployeesNo);
    formik.setFieldValue("company_website_url", storedWebSiteUrl);
    formik.setFieldValue("company_description", storedDescription);
    formik.setFieldValue("company_insights", storedInsights);
  }

  useEffect(() => {
    setCompanyName(localStorage.getItem("company_name") || "");
    // setEmail(localStorage.getItem("company_email") || "");
    setCeo(localStorage.getItem("company_ceo") || "");
    setIndustry(localStorage.getItem("company_industry") || "");
    setLocation(localStorage.getItem("company_location") || "");
    setEmployeesNo(localStorage.getItem("company_employee_no") || "");
    setWebSiteUrl(localStorage.getItem("company_website_url") || "");
    setDescription(localStorage.getItem("company_description") || "");
    setInsights(localStorage.getItem("company_insights") || "");

    const email = localStorage.getItem("company_email") || "";
    if (email) {
      setEmail(email);

      const avatarUrl = localStorage.getItem("company_logo");
      if (avatarUrl && avatarUrl !== "null") {
        setPhoto(`https://myawshierbucket.s3.me-south-1.amazonaws.com/${avatarUrl}`);
      } else {
        setPhoto(photo2); // photo2 لازم تكون معرفة فوق
      }
    }

  }, []);

  const formik = useFormik({
    initialValues: {
      name: companyName,
      // email: email,
      ceo: ceo,
      industry: industry,
      location: location,
      employee_no: employeesNo,
      website_url: webSiteUrl,
      description: description,
      insights: insights,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    const toastId = toast.loading("Saving changes...");
    try {
      const response = await axios.patch(
        "https://hireverse.ddns.net/api/companies",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        }
      );
      toast.success("Changes saved successfully!", { id: toastId });
      console.log(values);
      console.log("الرد من السيرفر:", response.data);

      localStorage.setItem("company_name", values.name);
      // localStorage.setItem("company_email", values.email);
      localStorage.setItem("company_ceo", values.ceo);
      localStorage.setItem("company_industry", values.industry);
      localStorage.setItem("company_location", values.location);
      localStorage.setItem("company_employee_no", values.employee_no);
      localStorage.setItem("company_website_url", values.website_url);
      localStorage.setItem("company_description", values.description);
      localStorage.setItem("company_insights", values.insights);

      setCompanyName(values.company_name);
      // setEmail(values.email);
      setCeo(values.ceo);
      setIndustry(values.industry);
      setLocation(values.location);
      setEmployeesNo(values.employee_no);
      setWebSiteUrl(values.website_url);
      setDescription(values.description);
      setInsights(values.insights);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Failed to save changes!", { id: toastId });
    }
  }

  return (
    <div className="container bg-[#F9FAFB]">
      <div className="grid grid-cols-11 gap-20 m-4">
        <div className="col-span-2 ml-4 mt-2 font-sf_pro_text font-semibold">
          <p>Settings</p>
          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
          <div className="flex gap-4 mb-6 bg-[#E1E1E1] rounded-md w-11/12 h-11 p-2">
            <img src={user} alt="" />
            <Link to={"/profile"}>
              <p className="mt-1">Profile</p>
            </Link>
          </div>
          <div className="flex gap-4 mb-8 ml-2">
            <img src={lock} alt="" />
            <Link to={"/ChangeCompanyPassword"}>
              <p>Password</p>
            </Link>
          </div>

          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-10"></div>
          <div className="flex gap-4 mb-6">
            <img src={del} alt="" />
            <Link to={"/DeleteCompanyAccount"}>
              <p className="text-[#F02E2E]">Delete account</p>
            </Link>
          </div>
        </div>
        <div className="col-span-9 mt-16 w-11/12">
          <div className="flex justify-between">
            <p className="font-sf_pro_text text-2xl font-bold">Edit Profile</p>
            <div className="btns ">
              <button
                onClick={handleDiscard}
                className="bg-[#E4E4E4] w-20 h-9 rounded-xl text-sm font-sf_pro_text font-medium mr-4"
              >
                Discard
              </button>
              <button
                onClick={formik.handleSubmit}
                type="submit"
                className="bg-[#0146B1] w-20 h-9 rounded-xl text-white text-sm font-sf_pro_text font-medium"
              >
                Save
              </button>
            </div>
          </div>
          <div className="border-b-2 border-[#0b0a0a] mt-3 mb-4"></div>
          <div>
            <p className="text-[#616161] font-normal text-sm mb-8">
              Update Your Profile
            </p>

            <div className="p-5 border-2 rounded-xl bg-[#FFFFFF]">
              <div className="flex justify-between w-4/5">
                <div className="image flex items-center">
                  <div className="ml-6">
                    <div className="flex  items-center">
                      <img
                        src={photo}
                        alt=""
                        className="rounded-full w-[70px] h-[70px] mx-4"
                      />
                      <div>
                        <p className="font-sf_pro_text text-base font-medium">
                          {companyName}
                        </p>
                        <p className="text-[#7D7D7D] font-normal text-sm">
                          {/*email*/}
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-6 border-2 border-[E8E8E8] p-4 rounded-xl mt-8 grid grid-cols-12 gap-20 bg-[#F9FAFB]">
              <div className="col-span-7 p-3  bg-[#F9FAFB] ">
                <form onSubmit={formik.handleSubmit}>
                  <div className="personalinfo bg-[#FFFFFF] border-2 rounded-lg p-5">
                    <p className="font-sf_pro_text text-lg font-semibold mb-2">
                      Company Information
                    </p>
                    <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                    <div className="name flex justify-between pr-14 mb-2">
                      <div>
                        <label
                          htmlFor=""
                          className="font-sf_pro_text text-sm font-bold"
                        >
                          company name
                        </label>
                        <input
                          value={formik.values.name}
                          type="text"
                          id="name"
                          name="name"
                          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[205px] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor=""
                          className="font-sf_pro_text text-sm font-bold"
                        >
                          CEO Name
                        </label>
                        <input
                          value={formik.values.ceo}
                          type="text"
                          id="ceo"
                          name="ceo"
                          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[205px] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor=""
                        className="font-sf_pro_text text-sm font-bold"
                      >
                        Industry
                      </label>
                      <input
                        value={formik.values.industry}
                        type="text"
                        id="industry"
                        name="industry"
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[90%] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor=""
                        className="font-sf_pro_text text-sm font-bold"
                      >
                        Location
                      </label>
                      <input
                        value={formik.values.location}
                        type="text"
                        id="location"
                        name="location"
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[90%] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor=""
                        className="font-sf_pro_text text-sm font-bold"
                      >
                        Number Of Employees
                      </label>
                      <input
                        value={formik.values.employee_no}
                        type="text"
                        id="employee_no"
                        name="employee_no"
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[90%] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor=""
                        className="font-sf_pro_text text-sm font-bold"
                      >
                        Website Link
                      </label>
                      <input
                        value={formik.values.website_url}
                        type="text"
                        id="website_url"
                        name="website_url"
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[90%] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </form>

                <div className="Education bg-[#FFFFFF] border-2 rounded-lg p-5 mt-14 w-[1000px]">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">
                    Company details
                  </p>
                  <div className="mb-5">
                    <label
                      htmlFor=""
                      className="font-sf_pro_text text-sm font-bold"
                    >
                      Description
                    </label>
                    <p className="text-[#878787] font-thin text-sm">
                      Provide a brief overview of your company, including its
                      industry, mission, and core services.
                    </p>
                    <textarea
                      type="text"
                      cols="80"
                      rows="10"
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor=""
                      className="font-sf_pro_text text-sm font-bold"
                    >
                      Insights
                    </label>{" "}
                    <p className="text-[#878787] font-thin text-sm">
                      Share what makes your company unique, such as its culture,
                      values, or team environment.
                    </p>
                    <textarea
                      cols="80"
                      rows="10"
                      type="text"
                      id="insights"
                      name="insights"
                      value={formik.values.insights}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <div className=" p-5 border-2 rounded-xl bg-[#FFFFFF]">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">
                    Your Photo
                  </p>
                  <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                  <div className="image flex">
                    <div>
                      <img
                        src={photo}
                        alt=""
                        className="rounded-full w-[80px] h-[80px] mx-4"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="font-sf_pro_text text-base font-medium mb-2">
                        Edit Your Profile
                      </p>
                      <div className="w-1/2 flex  gap-5">
                        <button>
                          <p className="text-[#888888]">Delete</p>
                        </button>
                        <button onClick={saveProfilePhoto}>
                          <p className="text-[#0146B1]">Update</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-dotted border-2 mt-8 border-[#BAC5DC] rounded-lg p-3 text-center h-[160px] flex justify-center items-center">
                    <div>
                      <span>
                        <input
                          type="file"
                          className="hidden"
                          id="profilePhoto"
                          onChange={handleUploadPhoto}
                          accept="image/*"
                        />
                        <label
                          htmlFor="profilePhoto"
                          className="cursor-pointer"
                        >
                          <p className="text-[#0146B1] mb-3">Clik to Upload</p>
                        </label>
                      </span>
                      <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">
                        PNG,SVG,JPG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
