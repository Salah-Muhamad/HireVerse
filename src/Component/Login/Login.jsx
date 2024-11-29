import MainLogo from "../../assets/Images/MainLogo.svg";
import Line from "../../assets/Images/Line 30.svg";
import Google from "../../assets/Images/devicon_google.svg";
import Github from "../../assets/Images/mdi_github.svg";
import eye from '../../assets/Images/eye.svg'
import { NavLink, useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
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
          
        </div>

        <div className="w-[616px]  bg-[#F1F1F1F2] m-auto mt-6 rounded-2xl p-8">

          <h2 className="text-center font-bai_jamjuree font-bold text-2xl mt-8">Login</h2>


          <div className="mt-9 ms-5">
            <h2 className="font-semi_bold">Email</h2>
            <div className="rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
              <input type="text" className=" w-full  focus:outline-none ms-2 " />
            </div>
          </div>
          <div className="mt-9 ms-5">
            <div className="pass flex justify-between mb-3">
            <h2 className="font-semi_bold">Password</h2>
            <Link><a className="mr-4 text-[#0146B1] font-sf_pro_text text-base">forgot ?</a></Link>
            </div>
            <div className="relative rounded-xl border-2 bg-white mt-1 border-[#99B1B9] flex items-center  h-14 w-[517px]">
              <input type="password" className=" w-full focus:outline-none ms-2 " />
              <img src={eye} className="absolute right-5" />
            </div>
          </div>
          
          <div className="text-center">
            <button
              className="w-[517px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10 ms-4"
            >
              Sign in
            </button>
            <p className="mt-5 text-sm font-sf_pro_text font-light">
              Don't have an account?
              <span className="text-[#0146B1] underline ml-2">
                <NavLink to={"/Register"}> Sign Up</NavLink>
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
                <div className="text-[#656565] font-medium text-base">Sign in with Google</div>
          </div>
          <div className="my-5 w-[517px] h-14 border-2 rounded-2xl border-[#99B1B9] ms-7 flex items-center justify-center gap-7">
                <img src={Github} alt="" />
                <div className="text-[#656565] font-medium text-base">Sign in with Github</div>
          </div>
        </div>
      </div>
    </>
  );
}
