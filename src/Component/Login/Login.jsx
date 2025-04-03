import MainLogo from "../../assets/Images/MainLogo.svg";
import Line from "../../assets/Images/Line 30.svg";
import Google from "../../assets/Images/devicon_google.svg";
import Github from "../../assets/Images/mdi_github.svg";
import eye from "../../assets/Images/eye.svg";
import Star from "../../assets/Images/star.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PacmanLoader } from "react-spinners";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const skills = localStorage.getItem("skills")
  const jobTitle = localStorage.getItem("jobTitle")
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  let {setUserData} = useContext(UserContext)
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  async function login(values) {
    setLoading(true);
    try {
      const {data} = await axios.post(
        "https://hireverse.ddns.net/api/login",
        values
      );
      localStorage.setItem("userToken" , data.data.token)
      localStorage.setItem("first_name", data.data.applicant.first_name);
      localStorage.setItem("last_name", data.data.applicant.last_name);
      localStorage.setItem("email", data.data.applicant.email);
      
      // console.log(data)
      // console.log(data.data.applicant.first_name)
      // console.log(data.data);
      // console.log(data.data.token)
      console.log(skills)
      console.log(jobTitle)
      navigate('/')
      setUserData(data.data.token)
    } catch (err) {
      console.error("Error:", err);
      setLoginError(err.response?.data?.message || "Email Or Password is wrong");
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email Is Invalid .")
      .required("Email Is Required ."),
    password: Yup.string().required("Password Is Required ."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="h-[170vh] bg-[url('src/assets/Images/back.jpg')] bg-cover bg-center bg-fixed pt-10 font-sf_pro_text">
        <div className="flex justify-between mx-14">
          <NavLink to={"/"}>
            <div className="flex items-center gap-2 ms-10">
              <img src={MainLogo} alt="" />
              <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">
                HIRE VERSE
              </p>
            </div>
          </NavLink>
        </div>

        <div className="w-[616px]  bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">
          <h2 className="text-center font-bai_jamjuree font-bold text-2xl mt-8">
            Login
          </h2>

          <form onSubmit={formik.handleSubmit}>
            {loginError && (
              <div className=" ms-2 text-red-600 flex gap-1">
                <img src={Star} alt="" />
                <div className="mt-3">{loginError}</div>
              </div>
            )}
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
              <div className="pass flex justify-between mb-3">
                <h2 className="font-semi_bold">Password</h2>
                <Link to={"/ForgotPassword"}>
                  <a className="mr-4 text-[#0146B1] font-sf_pro_text text-base">
                    forgot ?
                  </a>
                </Link>
              </div>
              <div className="relative rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="   focus:outline-none ms-2 w-full"
                />
                <img
                  src={eye}
                  className="absolute right-5"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className=" ms-2 text-red-600 flex gap-1">
                  <img src={Star} alt="" />
                  <div className="mt-3">{formik.errors.password}</div>
                </div>
              )}
            </div>

            <div className="text-center">
              {!loading ? (
                <button
                  type="submit"
                  className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4"
                >
                  Sign In
                </button>
              ) : (
                <button
                  type="button"
                  className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4 flex justify-center items-center"
                >
                  <PacmanLoader color="#ffff" size={15} />{" "}
                </button>
              )}
              <p className="mt-5 text-sm font-sf_pro_text font-light">
                Don't have an account?
                <span className="text-[#0146B1] underline ml-2">
                  <NavLink to={"/Register"}> Sign Up</NavLink>
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
              Sign in with Google
            </div>
          </div>
          <div className="my-5 w-[517px] h-14 border-2 rounded-2xl border-[#99B1B9] ms-7 flex items-center justify-center gap-7">
            <img src={Github} alt="" />
            <div className="text-[#656565] font-medium text-base">
              Sign in with Github
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
