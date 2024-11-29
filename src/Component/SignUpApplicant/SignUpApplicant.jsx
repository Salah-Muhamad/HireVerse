import MainLogo from "../../assets/Images/MainLogo.svg";
import Password from "../../assets/Images/Password.svg";
import Line from "../../assets/Images/Line 30.svg";
import Google from "../../assets/Images/devicon_google.svg";
import Github from "../../assets/Images/mdi_github.svg";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function SignUpApplicant() {
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

          <div className="mt-9 flex justify-center gap-6">
            <div>
              <h2 className="font-semi_bold">First name</h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                <input type="text" className="   focus:outline-none ms-2 " />
              </div>
            </div>
            <div>
              <h2 className="font-semi_bold">Last name</h2>
              <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[247px]">
                <input type="text" className="   focus:outline-none ms-2 " />
              </div>
            </div>
          </div>

          <div className="mt-9 ms-5">
            <h2 className="font-semi_bold">Email</h2>
            <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
              <input type="text" className="   focus:outline-none ms-2 " />
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
            <button
              className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4"
            >
              Create Account
            </button>
            <p className="mt-5 font-normal text-sm">
              Already have an account?
              <span className="text-[#0146B1] underline">
                <NavLink to={"/login"}> Log In</NavLink>
              </span>
            </p>
          </div>


          <div className="mt-9 flex items-center justify-start gap-3 ms-7">
            <img src={Line} alt="" />
            <p className="text-[#9A9696] font-normal text-xs">or</p>
            <img src={Line} alt="" />
          </div>

          <div className="my-5 w-[517px] h-14 border-2 rounded-2xl border-[#99B1B9] ms-7 flex items-center justify-center gap-7">
                <img src={Google} alt="" />
                <div className="text-[#656565] font-medium text-base">Sign up with Google</div>
          </div>
          <div className="my-5 w-[517px] h-14 border-2 rounded-2xl border-[#99B1B9] ms-7 flex items-center justify-center gap-7">
                <img src={Github} alt="" />
                <div className="text-[#656565] font-medium text-base">Sign up with Github</div>
          </div>
        </div>
      </div>
    </>
  );
}
