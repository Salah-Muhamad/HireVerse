import MainLogo from "../../assets/Images/MainLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Register() {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate(); 
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleContinueClick = () => {
    if (activeButton === "applicant") {
      navigate("/SignUpApplicant"); 
    } else if (activeButton === "company") {
      navigate("/SignUpCompany1"); 
    } else {
      alert("Please select a role before continuing.");
    }
  };

  return (
    <>
      <div className="h-[120vh] bg-[url('src/assets/Images/back.jpg')] bg-cover bg-center bg-fixed pt-10">
        <NavLink to={"/"}>
          <div className="flex items-center gap-2 ms-10">
            <img src={MainLogo} alt="" />
            <p className="text-primary font-sf_pro_text font-bold text-[18px] mt-2">
              HIRE VERSE
            </p>
          </div>
        </NavLink>
        <div className="w-[505px] h-[418px] bg-[#F1F1F1DE] m-auto mt-16 rounded-2xl font-sf_pro_text p-8">
          <h2 className="font-bold text-2xl">Select Your Role</h2>
          <p className="text-[#979797] font-normal text-[18px] mt-4">
            Pick your role and continue with account setup.
          </p>
          <div className="mt-10 flex justify-center gap-8">
            {/* زر المتقدم */}
            <button
              onClick={() => handleButtonClick("applicant")}
              className={`w-[204px] h-[107px] rounded-lg border-2 flex flex-col justify-center gap-5 items-center
              ${activeButton === "applicant" ? "border-[#0a49c0] bg-[#e7eef9b6] " : "bg-white text-[#636363] border-[#99B1B9]"}`}
            >
              <h3 className="font-bold text-[18px]">Applicant</h3>
              <p className="text-sm font-normal">Browse jobs and apply</p>
            </button>

            <button
              onClick={() => handleButtonClick("company")}
              className={`w-[204px] h-[107px] rounded-lg border-2 flex flex-col justify-center gap-5 items-center
              ${activeButton === "company" ? "border-[#0a49c0] bg-[#e7eef9b6] " : "bg-white text-[#636363] border-[#99B1B9]"}`}
            >
              <h3 className="font-bold text-[18px]">Company</h3>
              <p className="text-sm font-normal">Post jobs, find talent</p>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleContinueClick} 
              className="w-[441px] h-11 bg-[#143567] text-white text-base font-semibold rounded-lg mt-10"
            >
              Continue
            </button>
            <p className="mt-5 font-normal text-sm">
              Already have an account?
              <span className="text-[#0146B1] underline">
                <NavLink to={"/Login"}> Log In</NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
