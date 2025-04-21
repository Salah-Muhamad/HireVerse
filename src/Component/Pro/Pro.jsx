import React, { useState } from 'react';
import truee from "../../assets/Images/true.svg";

export default function Pro() {
  const [billing, setBilling] = useState("annual");

  const pricing = {
    monthly: {
      basic: "0 EGP",
      pro: "1,000 EGP",
      label: "/month",
    },
    annual: {
      basic: "0 EGP",
      pro: "10,000 EGP",
      label: "/year",
    },
  };

  return (
    <div>
      <div className="txt mt-32 w-full flex justify-center items-center mb-6">
        <div>
          <p className='font-sf_pro_text text-3xl font-bold text-center'>
            Upgrade your plan for more features
          </p>

          
          <div className='relative flex bg-[#F2F2F4] w-[350px] justify-between ml-24 mt-6 h-12 rounded-lg font-sf_pro_text font-medium text-lg overflow-hidden'>
            <div
              className={`absolute top-1 left-1 w-[160px] h-10 bg-white rounded-lg transition-all duration-300 ${
                billing === "monthly" ? "translate-x-0" : "translate-x-[170px]"
              }`}
            ></div>
            <button
              onClick={() => setBilling("monthly")}
              className={`w-1/2 z-10 transition-colors ${
                billing === "monthly" ? "text-black" : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`w-1/2 z-10 transition-colors ${
                billing === "annual" ? "text-black" : "text-gray-500"
              }`}
            >
              Annual
            </button>
          </div>
        </div>
      </div>

      <div className="two flex items-center justify-center">
        <div className='flex gap-20'>
          
          <div className='w-[405px] h-[480px] rounded-xl bg-[#F8FAFC] p-9 font-sf_pro_text font-bold text-2xl'>
            <p className='mb-6'>Basic Plan</p>
            <p>{pricing[billing].basic}
              <span className='text-[#909090] font-sf_pro_text font-semibold text-lg'> {pricing[billing].label}</span>
            </p>
            <div className='flex gap-2 mt-10 font-medium text-xl'>
              <img src={truee} alt="" />
              <p>Job Posting</p>
            </div>
            <div className='flex gap-2 mt-8 font-medium text-xl'>
              <img src={truee} alt="" />
              <p>Manual CV Review</p>
            </div>
            <div className='flex gap-2 mt-8 font-medium text-xl mb-16'>
              <img src={truee} alt="" />
              <p>Direct Hiring Decisions</p>
            </div>
            <button className='text-center bg-[#0C2E82] w-[310px] h-12 text-[#FFFFFF] font-medium text-base rounded-lg'>
              Choose Plan
            </button>
          </div>

          
          <div className='w-[430px] h-[480px] rounded-xl bg-[#F8FAFC] p-9 font-sf_pro_text font-bold text-2xl relative'>
            <p className='mb-6'>Pro Plan</p>
            <p>{pricing[billing].pro}
              <span className='text-[#909090] font-sf_pro_text font-semibold text-lg'> {pricing[billing].label}</span>
            </p>
            <div className='flex gap-2 mt-10 font-medium text-xl'>
              <img src={truee} alt="" />
              <p>AI-Powered CV Filtering</p>
            </div>
            <div className='flex gap-2 mt-8 font-medium text-xl'>
              <img src={truee} alt="" />
              <p>AI Video Interviews</p>
            </div>
            <div className='flex gap-2 mt-8 font-medium text-xl mb-16'>
              <img src={truee} alt="" />
              <p>Comprehensive Candidate Reports</p>
            </div>
            <button className='text-center bg-[#EBEBF0] w-[310px] h-12 text-[#7C7C7C] font-medium text-base rounded-lg'>
              Current Plan
            </button>
            <span className='absolute top-5 right-6 bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full'>
              active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


