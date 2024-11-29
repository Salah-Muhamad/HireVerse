import MainLogo from "../../assets/Images/MainLogo.svg";
import Password from "../../assets/Images/Password.svg";
import Step1 from "../../assets/Images/Step1.svg";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
export default function SignUpCompany1() {
  return (
    <div className="h-[150vh] bg-[url('src/assets/Images/back.jpg')] bg-cover bg-center bg-fixed pt-10 font-sf_pro_text">
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
            <NavLink to={"/SignUpApplicant"}>
              <p className="text-[#0146B1]">Create an Applicant account</p>
            </NavLink>
          </div>
        </div>

        <div className="w-[616px]  bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">
          <div className="ms-4">
            <img src={Step1} alt="" className="mb-10" />
          <h2 className="font-medium text-2xl">Create your account</h2>
          <p className="text-[#979797] font-normal text-base mt-4">
          start posting job openings.
          </p>
          </div>

          <div className="mt-9 flex justify-center gap-6">
            <div >
              <h2 className="font-semi_bold">Company name</h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                <input type="text" className="   focus:outline-none ms-2 " />
              </div>
            </div>
            <div>
              <h2 className="font-semi_bold">CEO name</h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                <input type="text" className="   focus:outline-none ms-2 " />
              </div>
            </div>
          </div>

          <div className="mt-9 ms-5">
            <h2 className="font-semi_bold">Business Email</h2>
            <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
              <input type="text" className="   focus:outline-none ms-2 " placeholder="ex: contact@companyname.com" />
            </div>
          </div>
          <div className="mt-9 ms-5">
            <h2 className="font-semi_bold">Password</h2>
            <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center justify-between  h-14 w-[517px]">
              <input type="password" className="   focus:outline-none ms-2 " />
              <img src={Password} alt="" className="pe-4" />
            </div>
          </div>
          <div className="text-center">
            <NavLink to={"/SignUpCompany2"}>
            <button
              className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4"
            >
              Continue
            </button>
            </NavLink>
            <p className="mt-5 font-normal text-sm">
              Already have an account?
              <span className="text-[#0146B1] underline">
                <NavLink to={"/login"}> Log In</NavLink>
              </span>
            </p>
          </div>


        </div>
      </div>
  )
}
