import MainLogo from "../../assets/Images/MainLogo.svg";
import Back from "../../assets/Images/ic_round-arrow-back.svg";

import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
export default function ForgotPassword() {
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
        <div className="w-40 bg-white h-12 rounded-md  flex justify-evenly text-xs items-center font-normal">
          <NavLink to={"/Register"}>
            <p className="text-[#0146B1]">Create an account</p>
          </NavLink>
        </div>
      </div>

      <div className="w-[616px]  bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">
        <div className="ms-4">
          <h2 className="font-bold text-2xl">Forgot Password?</h2>
          <p className="text-[#979797] font-normal text-base mt-4">
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
        </div>

        <div className="mt-9 ms-5">
          <h2 className="font-semi_bold">Email</h2>
          <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
            <input type="text" className=" w-full  focus:outline-none ms-2 " />
          </div>
        </div>
        <div className="text-center">
          <NavLink>
            <button className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4">
              Send Reset Link
            </button>
          </NavLink>
          <NavLink to={"/Login"}>
          <div className="mt-4 flex items-center justify-center gap-2">
            <img src={Back} alt="" className="" />
            <p className="text-sm font-medium text-[#676767]">Back to log in</p>
          </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
