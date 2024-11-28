import React from "react";
import styles from "./Navbar.module.css";
import MainLogo from "../../assets/Images/MainLogo.svg";
import Search from "../../assets/Images/Search2.svg";
import { NavLink } from "react-router-dom";
import Register from "../Register/Register";
export default function Navbar() {
  return (
    <>
      <div className="flex w-full justify-start">
        <nav
          className="w-[83.063rem] h-[4.375rem] bg-white rounded-lg border-[0.5px] 
        absolute z-10 top-6 left-[91.5px] px-8 flex items-center justify-around"
        >
          <NavLink to={"/"}>
            <div className="flex items-center gap-2">
              <img src={MainLogo} alt="" />
              <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">
                HIRE VERSE
              </p>
            </div>
          </NavLink>

          <div className="flex gap-8 font-bai_jamjuree text-base font-semibold items-center mt-1">
            <NavLink
              to={"JobsPage"}
              className={({ isActive }) =>
                isActive
                  ? "text-[#0146B1]" 
                  : ""
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to={"Companies"}
              className={({ isActive }) =>
                isActive
                  ? "text-[#0146B1]" 
                  : ""
              }
            >
              Companies
            </NavLink>
            <NavLink
              to={"about"}
              className={({ isActive }) =>
                isActive
                  ? "text-[#0146B1]" 
                  : ""
              }
            >
              About
            </NavLink>
          </div>

          <div className="w-80 h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
            <img src={Search} alt="" />
            <input
              type="text"
              className="p-2 rounded-md focus:outline-none "
              placeholder="Search"
            />
          </div>

          <div className="font-bai_jamjuree font-semibold flex gap-5">
            <NavLink to={"Login"}>
              <button className="text-primary w-28 h-11 text-center rounded-lg">
                Log In
              </button>
            </NavLink>
            <NavLink to={"Register"}>
              <button className="bg-primary text-white w-28 h-11 text-center rounded-md">
                Get Started
              </button>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}
