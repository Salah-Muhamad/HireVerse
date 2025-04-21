import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import MainLogo from "../../assets/Images/MainLogo.svg";
import photo2 from "../../assets/Images/Prof.jpeg";

import Settings from "../../assets/Images/Settings.svg";
import GoPro from "../../assets/Images/GoPro.svg";
import Plan from "../../assets/Images/Plan.svg";
import MyJobs from "../../assets/Images/MyJobs.svg";
import LogOut from "../../assets/Images/LogOut.svg";
import Notification from "../../assets/Images/Notification.svg";
import ArrowDown from "../../assets/Images/ArrowDown.svg";
import Search from "../../assets/Images/Search2.svg";
import { NavLink, useNavigate , Link } from "react-router-dom";
import Register from "../Register/Register";
import { UserContext } from "../../Context/UserContext";
import { CompanyContext } from "../../Context/CompanyContext";
export default function Navbar() {
  let { userData, setUserData } = useContext(UserContext);
  let { companyData, setCompanyData } = useContext(CompanyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const avatarUrl = localStorage.getItem("avatarUrl");
  
  
  
  const Avatar =
  avatarUrl && avatarUrl !== "null"
  ? `https://hireverse.ddns.net/api/storage/${avatarUrl}`
  : photo2;
  
  const companyLogo = localStorage.getItem("company_logo");
  const CompanyLogo =
    companyLogo && companyLogo !== "null"
      ? `https://hireverse.ddns.net/api/storage/${companyLogo}`
      : photo2;
  useEffect(() => {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const email = localStorage.getItem("email");
    const companyName = localStorage.getItem("company_name");
    const companyEmail = localStorage.getItem("company_email");
    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }
    if (email) {
      setEmail(email);
    }
    if (companyName) {
      setCompanyName(companyName);
    }
    if (companyEmail) {
      setCompanyEmail(companyEmail);
    }
  }, []);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/");
  }
  function companyLogOut() {
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  }
  return (
    <>
      {
        <div className="flex w-full justify-start">
          <nav
            className="w-[83.063rem] h-[4.375rem] bg-white rounded-lg border-[0.5px] 
        absolute z-10 top-6 left-[91.5px] px-8 flex items-center justify-between"
          >
            <NavLink to={"/"}>
              <div className="flex items-center gap-2">
                <img src={MainLogo} alt="" />
                <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">
                  HIRE VERSE
                </p>
              </div>
            </NavLink>

            {!companyData && (
              <>
                <div className="flex gap-8 font-bai_jamjuree text-base font-semibold items-center mt-1 h-[4.375rem]">
                  <NavLink
                    to={"JobsPage"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0146B1] flex items-center h-[4.375rem] border-b-2 border-[#0146B1]"
                        : ""
                    }
                  >
                    Jobs
                  </NavLink>

                  <NavLink
                    to={"Companies"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0146B1] flex items-center h-[4.375rem] border-b-2 border-[#0146B1]"
                        : ""
                    }
                  >
                    Companies
                  </NavLink>
                  <NavLink
                    to={"about"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0146B1] flex items-center h-[4.375rem] border-b-2 border-[#0146B1]"
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
              </>
            )}

            {!userData && !companyData && (
              <div className="font-bai_jamjuree font-semibold flex gap-5">
                <NavLink to={"PreLogin"}>
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
            )}

            {companyData  && (

              <div>
                <div className="flex gap-8">
                  <Link className="flex items-center ">
                  <img src={Notification} alt="Notification" /> 
                  </Link>
                  <Link to={"/pro"}  className="flex items-center ">
                    {" "}
                    <img src={GoPro} alt="GoPro" />
                  </Link>{" "}
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="bg-transparent px-4 py-2 rounded-md"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={CompanyLogo}
                          className="w-12 h-12 rounded-full"
                          alt="Avatar"
                        />
                        <span className="font-semibold">{companyName}</span>
                        <img
                          src={ArrowDown}
                          alt="Arrow"
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="absolute mt-2  bg-white border px-1 rounded-lg shadow-xl">
                        <ul className="py-2">
                          <li className="px-4 py-2  cursor-pointer border-b-2">
                            <div className="flex gap-2">
                              <img
                                src={CompanyLogo}
                                className="w-12 h-12 rounded-full"
                                alt=""
                              />
                              <div>
                                <p className="font-semibold text-sm">
                                  {companyName}
                                </p>
                                <p className="text-gray-400 text-[11px]">
                                  {companyEmail}
                                </p>
                              </div>
                            </div>
                          </li>
                          <NavLink to={"/"}>
                            <li className="px-4 py-4 hover:text-gray-400 cursor-pointer">
                              <img src={Plan} alt="" />
                            </li>
                          </NavLink>
                          <NavLink to={"/CompanyProfile"}>
                            <li className="px-4 py-2 hover:text-gray-400 cursor-pointer  border-b-2">
                              <img src={Settings} alt="" />
                            </li>
                          </NavLink>
                          <li
                            className="px-4 py-2 hover:text-gray-400 cursor-pointer"
                            onClick={() => companyLogOut()}
                          >
                            <img src={LogOut} alt="" />
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {userData && (
              <div className="flex gap-8">
                <img src={Notification} alt="Notification" />
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-transparent px-4 py-2 rounded-md"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src={Avatar}
                        className="w-12 h-12 rounded-full"
                        alt="Avatar"
                      />
                      <span className="font-semibold">{userName}</span>
                      <img
                        src={ArrowDown}
                        alt="Arrow"
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="absolute mt-2  bg-white border px-1 rounded-lg shadow-xl">
                      <ul className="py-2">
                        <li className="px-4 py-2  cursor-pointer border-b-2">
                          <div className="flex gap-2">
                            <img
                              src={Avatar}
                              className="w-12 h-12 rounded-full"
                              alt=""
                            />
                            <div>
                              <p className="font-semibold text-sm">
                                {userName}
                              </p>
                              <p className="text-gray-400 text-[11px]">
                                {email}
                              </p>
                            </div>
                          </div>
                        </li>
                        <NavLink to={"/ApplicantJobs"}>
                          <li className="px-4 py-4 hover:text-gray-400 cursor-pointer">
                            <img src={MyJobs} alt="" />
                          </li>
                        </NavLink>
                        <NavLink to={"/ProfileSettings"}>
                          <li className="px-4 py-2 hover:text-gray-400 cursor-pointer  border-b-2">
                            <img src={Settings} alt="" />
                          </li>
                        </NavLink>
                        <li
                          className="px-4 py-2 hover:text-gray-400 cursor-pointer"
                          onClick={() => logOut()}
                        >
                          <img src={LogOut} alt="" />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      }
    </>
  );
}
