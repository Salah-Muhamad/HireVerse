import MainLogo from "../../assets/Images/MainLogo.svg";
import Line from "../../assets/Images/Line 68.svg";
import Mail from "../../assets/Images/mail.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function VerifyEmail() {
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

        <div className="w-[865px]  bg-[#F4F4F4] m-auto p-8 mt-40 rounded-2xl  flex flex-col justify-center items-center">
          <div className="w-fit">
            <img src={Mail} alt="" className="w-fit" />
          </div>
          <div className="w-fit mt-5">
            <img src={Line} alt="" className="w-fit" />
          </div>
          <div className="w-[65%] p-8 text-[#636363] font-sf_pro_text text-center">
            You're almost there! We sent an email to complete your registeration
            process
          </div>
          <div className="w-[65%] p-8 text-[#636363] font-sf_pro_text text-center">
            <p className="mb-4">
              {" "}
              Just click on the link in that email to complete your signup and
              click <NavLink to={"/Login"} className={"text-[#0146B1] underline ml-2"}>Here</NavLink> to login.
            </p>{" "}
            <p>
              If you don't see it, you may need to{" "}
              <span className="text-[#404040] font-semibold">
                check your spam
              </span>{" "}
              folder.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
