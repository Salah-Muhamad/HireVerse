import React, { useEffect } from "react";
import user from "../../assets/Images/user.svg";
import lock from "../../assets/Images/lock.svg";
import del from "../../assets/Images/delete.svg";
import photo from "../../assets/Images/Ellipse 128.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Formik, useFormik } from "formik";

export default function ProfileSettings() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setgithubUrl] = useState("");
  const [college, setcollege] = useState("");
  const [department, setdepartment] = useState("");
  const [skills, setSkills] = useState([]);

  function handleDiscard() {
    const storedFirstName = localStorage.getItem("first_name") || "";
    const storedLastName = localStorage.getItem("last_name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    const storedJobTitle = localStorage.getItem("jobTitle") || "";
    const storedLinkedinUrl = localStorage.getItem("LinkedinUrl") || "";

    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setEmail(storedEmail);
    setJobTitle(storedJobTitle);
    setLinkedinUrl(storedLinkedinUrl);

    // هنا بنستخدم setFieldValue لتحديث القيم داخل Formik
    formik.setFieldValue("first_name", storedFirstName);
    formik.setFieldValue("last_name", storedLastName);
    formik.setFieldValue("email", storedEmail);
    formik.setFieldValue("job_title", storedJobTitle);
    formik.setFieldValue("linkedin_url", storedLinkedinUrl);
  }

  useEffect(() => {
    setFirstName(localStorage.getItem("first_name") || "");
    setLastName(localStorage.getItem("last_name") || "");
    setEmail(localStorage.getItem("email") || "");
    setJobTitle(localStorage.getItem("jobTitle") || "");
    setLinkedinUrl(localStorage.getItem("LinkedinUrl") || "");
    setgithubUrl(localStorage.getItem("githubUrl") || "");
    setdepartment(localStorage.getItem("department") || "");
    setcollege(localStorage.getItem("college") || "");
  
    // هنا هنعمل parse لل skills علشان نرجعها ل array تاني
    const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
    setSkills(storedSkills);
  }, []);
  

  const formik = useFormik({
    initialValues: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      job_title: jobTitle,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      college: college,
      department: department,
      skills: skills,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      const response = await axios.patch(
        "https://hireverse.ddns.net/api/applicant/profile",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
  
      console.log("الرد من السيرفر:", response.data);
  
      localStorage.setItem("first_name", values.first_name);
      localStorage.setItem("last_name", values.last_name);
      localStorage.setItem("email", values.email);
      localStorage.setItem("jobTitle", values.job_title);
      localStorage.setItem("LinkedinUrl", values.linkedin_url);
      localStorage.setItem("githubUrl", values.github_url);
      localStorage.setItem("department", values.department);
      localStorage.setItem("college", values.college);
  
      // هنا بنستخدم stringify لتحويل array الـ skills إلى string
      localStorage.setItem("skills", JSON.stringify(values.skills));
  
      setFirstName(values.first_name);
      setLastName(values.last_name);
      setEmail(values.email);
      setJobTitle(values.job_title);
      setLinkedinUrl(values.linkedin_url);
      setgithubUrl(values.github_url);
      setcollege(values.college);
      setdepartment(values.department);
      setSkills(values.skills);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
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
            <Link to={"/profile"}>
              <p>Password</p>
            </Link>
          </div>

          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-10"></div>
          <div className="flex gap-4 mb-6">
            <img src={del} alt="" />
            <Link to={"/profile"}>
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
          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
          <div>
            <p className="text-[#616161] font-normal text-sm mb-8">
              Update Your Profile
            </p>

            <div className="p-5 border-2 rounded-xl bg-[#FFFFFF]">
              <div className="flex justify-between w-4/5">
                <div className="image flex items-center">
                  <div className="ml-6">
                    <p className="font-sf_pro_text text-base font-medium">
                      {firstName}
                      {firstName}
                    </p>
                    <p className="text-[#7D7D7D] font-normal text-sm">
                      {email}
                      {email}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div   className="ml-6 border-2 border-[E8E8E8] p-4 rounded-xl mt-8 grid grid-cols-12 gap-20 bg-[#F9FAFB]">
              <div className="col-span-7 p-3  bg-[#F9FAFB] ">
                <form onSubmit={formik.handleSubmit}>
                  <div className="personalinfo bg-[#FFFFFF] border-2 rounded-lg p-5">
                    <p className="font-sf_pro_text text-lg font-semibold mb-2">
                      Personl Information
                    </p>
                    <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                    <div className="name flex justify-between pr-14 mb-2">
                      <div>
                        <label htmlFor="" className="font-sf_pro_text text-sm ">
                          First Name
                        </label>
                        <input
                          value={formik.values.first_name}
                          type="text"
                          id="first_name"
                          name="first_name"
                          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[205px] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="font-sf_pro_text text-sm ">
                          Last Name
                        </label>
                        <input
                          value={formik.values.last_name}
                          type="text"
                          id="last_name"
                          name="last_name"
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
                      <label htmlFor="" className="font-sf_pro_text text-sm ">
                        Job Title
                      </label>
                      <input
                        value={formik.values.job_title}
                        type="text"
                        id="job_title"
                        name="job_title"
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[400px] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="" className="font-sf_pro_text text-sm ">
                        Emai Address
                      </label>
                      <input
                        disabled
                        value={formik.values.email}
                        type="text"
                        id="email"
                        name="email"
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-500 text-lg rounded-xl 
                      focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-[205px] p-2 
                      dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-[#0C2E82] 
                      dark:focus:border-[#0C2E82]"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {/* <div className="max-w-sm">
                    <label htmlFor="" className="font-sf_pro_text text-sm">
                      Bio
                    </label>
                    <textarea
                      id="Bio"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                    <p className="text-[#757575] font-normal text-xs mt-3 ">
                      Brief Description about Yourself
                    </p>
                  </div> */}
                  </div>
                </form>

                <div className="links bg-[#FFFFFF] border-2 rounded-lg p-5 mt-14">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">
                    Professional Links
                  </p>
                  <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                  <div className="name flex justify-between pr-14 mb-2"></div>
                  <div className="mb-5">
                    <label htmlFor="" className="font-sf_pro_text text-sm ">
                      LinkedIn Profile
                    </label>
                    <input
                      type="text"
                      id="linkedin_url"
                      name="linkedin_url"
                      value={formik.values.linkedin_url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-2  bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-full p-2 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-[#0C2E82] dark:focus:border-[#0C2E82]"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="" className="font-sf_pro_text text-sm ">
                      Github Profile
                    </label>
                    <input
                      type="text"
                      id="github_url"
                      name="github_url"
                      value={formik.values.github_url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-2  bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-full p-2 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-[#0C2E82] dark:focus:border-[#0C2E82]"
                    />
                  </div>
                </div>

                <div className="Education bg-[#FFFFFF] border-2 rounded-lg p-5 mt-14">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">
                    Education
                  </p>
                  <div className="mb-5">
                    <label htmlFor="" className="font-sf_pro_text text-sm ">
                      College
                    </label>
                    <input
                      type="text"
                      id="college"
                      name="college"
                      value={formik.values.college}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="mt-2  bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-full p-2 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-[#0C2E82] dark:focus:border-[#0C2E82]"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="" className="font-sf_pro_text text-sm ">
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formik.values.department}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-[#0C2E82] focus:border-[#0C2E82] block h-[35px] w-full p-2 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-[#0C2E82] dark:focus:border-[#0C2E82]"
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
                    <img src={photo} className="mr-8" />
                    <div className="mt-2">
                      <p className="font-sf_pro_text text-base font-medium mb-2">
                        Edit Your Profile
                      </p>
                      <div className="w-1/2 flex  gap-5">
                        <button>
                          <p className="text-[#888888]">Delete</p>
                        </button>
                        <button>
                          <p className="text-[#0146B1]">Update</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-dotted border-2 mt-8 border-[#BAC5DC] rounded-lg p-3 text-center h-[160px] flex justify-center items-center">
                    <div>
                      <span>
                        <button>
                          <p className="text-[#0146B1] mb-3">Clik to Upload</p>
                        </button>
                      </span>
                      <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">
                        PNG,SVG,JPG
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" p-5 border-2 rounded-xl mt-10 bg-[#FFFFFF]">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">
                    Upload Your CV
                  </p>
                  <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                  <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">
                    Make sure to include an updated version of your CV.
                  </p>

                  <div className="border-dotted border-2 mt-8 border-[#BAC5DC] rounded-lg p-3 text-center h-[160px] flex justify-center items-center">
                    <div>
                      <span>
                        <button>
                          <p className="text-[#0146B1] mb-3">Clik to Upload</p>
                        </button>
                      </span>
                      <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">
                        Pdf
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Education bg-[#FFFFFF] border-2 rounded-lg p-5 mt-14 w-[490px]">
                <p className="font-sf_pro_text text-lg font-semibold mb-2">
                  Skills
                </p>
                <div className="mb-5 flex flex-wrap gap-4">
                  {
                  
                  skills.map((skill, index) => {
                    return (
                      <div
                        key={index}
                        className="h-[30px] rounded-2xl border-2 text-center min-w-28 px-2"
                      >
                        {skill}
                      </div>
                    );
                  })}
                  {console.log(skills)}
                  
                </div>
              </div>
              {/* <div>
              <div>Skills</div>
              <div className="w-[490px] h-[95px] border-2 rounded-lg"></div>
              </div> */}
            </div>
          </div>
        </div>
        <div className=" bg-red-500">Skills</div>
      </div>
    </div>
  );
}
