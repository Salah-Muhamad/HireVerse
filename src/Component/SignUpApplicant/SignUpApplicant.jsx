import MainLogo from "../../assets/Images/MainLogo.svg";
import Password from "../../assets/Images/Password.svg";
import Line from "../../assets/Images/Line 30.svg";
import Google from "../../assets/Images/devicon_google.svg";
import Star from "../../assets/Images/star.svg";
import Strong from "../../assets/Images/Strong.svg";
import Vpoor from "../../assets/Images/Vpoor.svg";
import Poor from "../../assets/Images/Poor.svg";
import Moderate from "../../assets/Images/Moderate.svg";
import Github from "../../assets/Images/mdi_github.svg";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";
export default function SignUpApplicant() {
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const checkStrength = (val) => {
    if (val.length < 4) return Vpoor;
    if (val.length < 7) return Poor;
    if (val.length < 10) return Moderate;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
      return Strong;
    }
    return Moderate;
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  async function register(values) {
    const toastId = toast.loading("Creating Account...");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://hireverse.ddns.net/api/register",
        values
      );

      console.log(data.data);
      localStorage.setItem("userToken", data.data.token);
      // localStorage.setItem("first_name", response.data.data.applicant.attributes.firstName);
      // localStorage.setItem("last_name", response.data.data.applicant.attributes.lastName);
      // localStorage.setItem("email", response.data.data.applicant.attributes.email);

      toast.success("Account Created Successfully", {
        id: toastId,
      });
      navigate("/VerifyEmail");
    } catch (err) {
      console.error("Error:", err);
      setRegisterError(err.response?.data?.message || "Something went wrong");
      toast.error("Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name Is Required ."),
    last_name: Yup.string().required("Last Name Is Required ."),
    email: Yup.string()
      .email("Email Is Invalid .")
      .required("Email Is Required ."),
    password: Yup.string().required("Password Is Required ."),
    job_title: Yup.string().required("Job Title Is Required."),
    skills: Yup.array()
      .min(1, "You Must Enter At Least One Skill") // التحقق من أن المصفوفة ليست فارغة
      .required("You Must Enter Skills"),
  });

  let formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      job_title: "",
      skills: [],
    },
    validationSchema,
    onSubmit: register,
  });
  return (
    <>
      <div className=" bg-[url('src/assets/Images/back.jpg')] bg-cover bg-center bg-fixed pt-10 font-sf_pro_text">
        <div className="flex justify-between mx-14">
          <NavLink to={"/"}>
            <div className="flex items-center gap-2 ms-10">
              <img src={MainLogo} alt="" />
              <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">
                HIRE VERSE
              </p>
            </div>
          </NavLink>
          <div className="w-80 bg-white h-12 rounded-md  flex justify-evenly text-xs items-center font-normal">
            <p>Want to post jobs?</p>
            <NavLink to={"/SignUpCompany1"}>
              <p className="text-[#0146B1]">Create a Company account</p>
            </NavLink>
          </div>
        </div>

        <div className="w-[616px]  bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">
          <div className="ms-4">
            <h2 className="font-medium text-2xl">Create your account</h2>
            <p className="text-[#979797] font-normal text-base mt-4">
              start exploring job opportunities
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {registerError && (
              <div className=" ms-2 text-red-600 flex gap-1">
                <img src={Star} alt="" />
                <div className="mt-3">{registerError}</div>
              </div>
            )}
            <div className="mt-9 flex justify-center gap-6">
              <div>
                <h2 className="font-semi_bold">First name</h2>
                <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                  <input
                    type="text"
                    className="focus:outline-none ms-2 w-full"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.first_name && formik.touched.first_name && (
                  <div className=" ms-2 text-red-600 flex gap-1">
                    <img src={Star} alt="" />
                    <div className="mt-3">{formik.errors.first_name}</div>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semi_bold">Last name</h2>
                <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                  <input
                    type="text"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="   focus:outline-none ms-2 w-full"
                  />
                </div>
                {formik.errors.last_name && formik.touched.last_name && (
                  <div className=" ms-2 text-red-600 flex gap-1">
                    <img src={Star} alt="" />
                    <div className="mt-3">{formik.errors.last_name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-9 ms-5">
              <h2 className="font-semi_bold">Email</h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="   focus:outline-none ms-2 w-full"
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className=" ms-2 text-red-600 flex gap-1">
                  <img src={Star} alt="" />
                  <div className="mt-3">{formik.errors.email}</div>
                </div>
              )}
            </div>
            <div className="mt-9 ms-5">
              <h2 className="font-semi_bold">Password</h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center justify-between  h-14 w-[517px]">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="   focus:outline-none ms-2 w-full"
                />
                <img
                  src={Password}
                  alt=""
                  className="pe-4"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className=" ms-2 text-red-600 flex gap-1">
                  <img src={Star} alt="" />
                  <div className="mt-3">{formik.errors.password}</div>
                </div>
              )}
              {formik.values.password && (
                <img
                  src={checkStrength(formik.values.password)}
                  alt="Password Strength"
                  className="mt-4"
                />
              )}
            </div>
            <div className="mt-9 flex justify-center gap-6">
              <div>
                <h2 className="font-semi_bold">Job Title</h2>
                <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                  <input
                    type="text"
                    name="job_title"
                    value={formik.values.job_title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="   focus:outline-none ms-2 w-full"
                  />
                </div>
                {formik.errors.job_title && formik.touched.job_title && (
                  <div className=" ms-2 text-red-600 flex gap-1">
                    <img src={Star} alt="" />
                    <div className="mt-3">{formik.errors.job_title}</div>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semi_bold">Skills</h2>
                <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
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
                    className="   focus:outline-none ms-2 w-full"
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

            <div className="text-center">
              {!loading ? (
                <button
                  type="submit"
                  className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4"
                >
                  Create Account
                </button>
              ) : (
                <button
                  type="button"
                  className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4 flex justify-center items-center"
                >
                  <PacmanLoader color="#ffff" size={15} />{" "}
                </button>
              )}
              <p className="mt-5 font-normal text-sm">
                Already have an account?
                <span className="text-[#0146B1] underline">
                  <NavLink to={"/login"}> Log In</NavLink>
                </span>
              </p>
            </div>
          </form>

          <div className="mt-9 flex items-center justify-start gap-3 ms-7">
            <img src={Line} alt="" />
            <p className="text-[#9A9696] font-normal text-xs">or</p>
            <img src={Line} alt="" />
          </div>

          <div className="my-5 w-[517px] h-14 border-2 rounded-2xl border-[#99B1B9] ms-7 flex items-center justify-center gap-7">
            <img src={Google} alt="" />
            <div className="text-[#656565] font-medium text-base">
              Sign up with Google
            </div>
          </div>
          <div className="my-5 w-[517px] h-14 border-2 rounded-2xl border-[#99B1B9] ms-7 flex items-center justify-center gap-7">
            <img src={Github} alt="" />
            <div className="text-[#656565] font-medium text-base">
              Sign up with Github
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
