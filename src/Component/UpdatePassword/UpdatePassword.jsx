import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import MLogo from "../../assets/Images/MLogo.svg";
import Password from "../../assets/Images/Password.svg";
import Star from "../../assets/Images/star.svg";
import Strong from "../../assets/Images/Strong.svg";
import Vpoor from "../../assets/Images/Vpoor.svg";
import Poor from "../../assets/Images/Poor.svg";
import Moderate from "../../assets/Images/Moderate.svg";
import { PacmanLoader } from "react-spinners";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  let navigate = useNavigate();
  function back() {
    navigate(-1);
  }
  const checkStrength = (val) => {
    if (val.length < 4) return Vpoor;
    if (val.length < 7) return Poor;
    if (val.length < 10) return Moderate;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
      return Strong;
    }
    return Moderate;
  };
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  async function updatePassword(values) {
    setLoading(true);
    const toastId = toast.loading("Updating Password...");
    try {
      const { data } = await axios.patch(
        "https://hireverse.ddns.net/api/applicant/password",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      console.log(data.data);
      toast.success("Password Updated Successfully", {
        id: toastId,
      });
      navigate("/Login");
    } catch (err) {
      console.error("Error:", err);
      setApiError(err.response?.data?.errors.old_password || "Something went wrong");
      toast.error(err.response?.data?.errors.old_password || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  }
  let validationSchema = Yup.object().shape({
    old_password: Yup.string().required("Old Password Is Required."),
    password: Yup.string().required("New Password Is Required."),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password Is Required."),
  });
  let formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: updatePassword,
  });
  return (
    <>
      <div className="bg-secondary p-5 font-sf_pro_text">
        <div className="pt-16 px-12 flex justify-between">
          <Link to={"/"}>
            <img src={MLogo} alt="" />
          </Link>
          <X
            size={40}
            strokeWidth={3}
            onClick={back}
            className="cursor-pointer"
          />
        </div>
        <div className="w-1/2  bg-white mx-auto mt-20 rounded-lg shadow-lg p-8 ">
          <h2 className="font-bold text-2xl border-b-2 py-4">
            Update Password
          </h2>
          <p className="text-[#616161] font-normal mt-3">
            Manage your password.
          </p>
          <form onSubmit={formik.handleSubmit}>

            <div className="mt-9 ">
              <h2 className="font-semi_bold">
                Old Password <span className="text-red-700">*</span>
              </h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center justify-between  h-14 w-[517px]">
                <input
                  type={showPassword.old ? "text" : "password"}
                  className="   focus:outline-none ms-2 w-full"
                  name="old_password"
                  value={formik.values.old_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <img
                  src={Password}
                  alt=""
                  className="pe-4"
                  onClick={() => togglePasswordVisibility("old")}
                />
              </div>
              {formik.errors.old_password && formik.touched.old_password && (
                <div className=" ms-2 text-red-600 flex gap-1">
                  <img src={Star} alt="" />
                  <div className="mt-3">{formik.errors.old_password}</div>
                </div>
              )}
            </div>
            <div className="mt-9 ">
              <h2 className="font-semi_bold">
                New Password <span className="text-red-700">*</span>
              </h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center justify-between  h-14 w-[517px]">
                <input
                  type={showPassword.new ? "text" : "password"}
                  className="   focus:outline-none ms-2 w-full"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <img
                  src={Password}
                  alt=""
                  className="pe-4"
                  onClick={() => togglePasswordVisibility("new")}
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
            <div className="mt-9 ">
              <h2 className="font-semi_bold">
                Confirm New Password <span className="text-red-700">*</span>
              </h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center justify-between  h-14 w-[517px]">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  className="   focus:outline-none ms-2 w-full"
                  name="password_confirmation"
                  value={formik.values.password_confirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <img
                  src={Password}
                  alt=""
                  className="pe-4"
                  onClick={() => togglePasswordVisibility("confirm")}
                />
              </div>
              {formik.errors.password_confirmation &&
                formik.touched.password_confirmation && (
                  <div className=" ms-2 text-red-600 flex gap-1">
                    <img src={Star} alt="" />
                    <div className="mt-3">
                      {formik.errors.password_confirmation}
                    </div>
                  </div>
                )}
                {formik.values.password_confirmation && (
                <img
                  src={checkStrength(formik.values.password_confirmation)}
                  alt="Password Strength"
                  className="mt-4"
                />
              )}
            </div>
            <div className="mt-4 flex justify-end">
            
                <button type="submit" className="bg-[#0146B1] w-[102px]  h-[43px] rounded-xl text-white ">
                  {" "}
                  Change{" "}
                </button>
          
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
