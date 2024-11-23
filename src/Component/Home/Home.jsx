import React from "react";
import OrangePart from "../../assets/Images/Vector.svg";
import Person from "../../assets/Images/person.svg";
import Bullets from "../../assets/Images/Group 1.svg";
import Frame from "../../assets/Images/Frame 24.svg";
import Bag from "../../assets/Images/bag.svg";
import Building from "../../assets/Images/building.svg";
import MiniGroup from "../../assets/Images/MiniGroup.svg";
import Apply from "../../assets/Images/Apply.svg";
import Search from "../../assets/Images/Search.svg";
import UpArrow from "../../assets/Images/UpArrow.svg";
import DownArrow from "../../assets/Images/DownArrow.svg";
import UploadCv from "../../assets/Images/UploadCv.svg";
import AddAccount from "../../assets/Images/AddAccount.svg";
import Line from "../../assets/Images/line.svg";
import Feature1 from "../../assets/Images/Feature1.svg";
import Feature2 from "../../assets/Images/Feature2.svg";
import Correct from "../../assets/Images/correct.svg";

import App from "../../App";
export default function Home() {
  return (
    <>
      {/* Section 1 */}
      <div className="bg-secondary flex justify-center pt-4 m-auto relative gap-44 h-screen">
        <div className=" pt-8">
          <div className="text-primary font-sf_pro_display font-bold text-5xl relative w-[620px]">
            <div className="leading-[62px] z-10 relative">
              The Smarter Way To Get Your Dream Job
            </div>
            <img
              src={OrangePart}
              alt="Decorative Orange Image"
              className="absolute left-16 -bottom-10 z-0"
            />
          </div>
          <p className="mt-10 font-bai_jamjuree font-medium text-xl leading-10 w-[350px]">
            Discover top talent and the latest job opportunities through our
            advanced AI-powered platform.
          </p>
          <div className="mt-10 flex gap-7 font-bai_jamjuree font-semibold">
            <button className="bg-primary text-white w-40 h-14 rounded-lg border-0">
              Get Started
            </button>
            <button className="text-primary w-40 h-14 rounded-lg border-2 border-primary">
              Login
            </button>
          </div>

          <div className="mt-12">
            <div>
              <img src={Bullets} alt="Group" />
            </div>
            <p className="font-bai_jamjuree font-medium text-base w-[200px]">
              Over <span className="text-[#0146B1]">12800+</span> candidates get
              job
            </p>
          </div>
        </div>
        <div>
          <div className="flex">
            <div>
              <img src={Person} alt="Person With Laptop" className="w-full" />
            </div>
            <div className="flex flex-col justify-between">
              <img src={Frame} alt="Small Frame" className="w-[74.11px]" />
              <img
                src={Frame}
                alt="Small Frame"
                className="w-[74.11px] absolute -bottom-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex  justify-center items-center w-2/3 p-6 m-auto bg-white relative -top-12">
        <div className="flex w-80 gap-6">
          <div>
            <img src={Bag} alt="" />
          </div>
          <div>
            <p className="font-sf_pro_display font-medium text-2xl">1,75,324</p>
            <p className="text-[#767F8C] font-normal text-base">Live Job</p>
          </div>
        </div>
        <div className="flex w-80 gap-6">
          <div>
            <img src={Building} alt="" />
          </div>
          <div>
            <p className="font-sf_pro_display font-medium text-2xl">97,354</p>
            <p className="text-[#767F8C] font-normal text-base">Companies</p>
          </div>
        </div>
        <div className="flex w-80 gap-6">
          <div>
            <img src={MiniGroup} alt="" />
          </div>
          <div>
            <p className="font-sf_pro_display font-medium text-2xl">
              38,47,154
            </p>
            <p className="text-[#767F8C] font-normal text-base">Candidates</p>
          </div>
        </div>
        <div className="flex w-80 gap-6">
          <div>
            <img src={Bag} alt="" />
          </div>
          <div>
            <p className="font-sf_pro_display font-medium text-2xl">7,532</p>
            <p className="text-[#767F8C] font-normal text-base">New Jobs</p>
          </div>
        </div>
      </div>
      {/* End of Section 1 */}
      {/* Start Section 2 */}
      <div className="bg-[#F1F2F4] p-8 mb-16">
        <div className="flex items-center justify-center gap-3">
          <span>
            <img src={Line} alt="Dash" />
          </span>
          <p className="font-sf_pro_text font-normal text-2xl">How It Works</p>
        </div>
        <div className="font-sf_pro_display font-bold text-3xl text-center mt-4">
          <p>Start your journey on </p>
          <p className="mt-2">
            <span className="text-[#0C2E82]"> HIRE VERSE</span> with easy steps
          </p>
        </div>

        <div className="flex justify-center gap-8 mt-10">
          <div className="font-sf_pro_text w-80 text-center">
            <div className="relative">
              <img src={AddAccount} alt="" className="mx-auto" />
              <img
                src={UpArrow}
                alt=""
                className="absolute -right-28 bottom-6"
              />
            </div>
            <p className="font-medium text-xl my-4">Create account</p>
            <p className="text-[#767F8C] leading-5 text-base">
              Aliquam facilisis egestas sapien, nec tempor leo tristique at.
            </p>
          </div>
          <div className="font-sf_pro_text w-80 text-center bg-white p-4 rounded-md">
            <div className="relative">
              <img src={UploadCv} alt="" className="mx-auto" />
              <img
                src={DownArrow}
                alt=""
                className="absolute -right-36 -bottom-4"
              />
            </div>
            <p className="font-medium text-xl my-4">Upload CV/Resume</p>
            <p className="text-[#767F8C] leading-5 text-base">
              Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.
            </p>
          </div>
          <div className="font-sf_pro_text w-80 text-center">
            <div className="relative">
              <img src={Search} alt="" className="mx-auto" />
              <img
                src={UpArrow}
                alt=""
                className="absolute -right-36 bottom-10"
              />
            </div>
            <p className="font-medium text-xl my-4">Find suitable job</p>
            <p className="text-[#767F8C] leading-5 text-base">
              Phasellus quis eleifend ex. Morbi nec fringilla nibh.
            </p>
          </div>
          <div className="font-sf_pro_text w-80 text-center">
            <div>
              <img src={Apply} alt="" className="mx-auto" />
            </div>
            <p className="font-medium text-xl my-4">Apply job</p>
            <p className="text-[#767F8C] leading-5 text-base">
              Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales
              purus.
            </p>
          </div>
        </div>
      </div>
      {/* End Of Section 2 */}

      {/* Start Section 3 & 4*/}

      <div className="w-5/6 m-auto bg-secondary h-[670px] flex justify-between items-center ps-10 pe-4 mb-12">
        <div>
          <p className="text-primary font-sf_pro_display font-bold text-5xl mb-16">
            AI-Powered <span className="text-orange">Interview</span>
          </p>

          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
              Technical questions are customized based on the job field,
              including programming or specialized skills.
            </p>
          </div>
          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
              Applicants respond to questions through pre-set short video clips.
            </p>
          </div>
          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
              Each question comes with a specific time limit for responses.
            </p>
          </div>
          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
              The submitted videos are analyzed by AI for evaluatio.
            </p>
          </div>
        </div>

        <div>
          <img src={Feature1} alt="" />
        </div>
      </div>
      {/* --------------------------- */}
      <div className="w-5/6 m-auto bg-secondary h-[670px] flex justify-between items-center ps-10 pe-4 mb-16">
        <div>
          <p className="text-primary font-sf_pro_display font-bold text-5xl mb-16">
            CV <span className="text-orange">filtration</span>
          </p>
          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
              Applicants upload their CV to the platform, where it is analyzed
              by AI algorithms{" "}
            </p>
          </div>
          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
            The AI system ranks applicants based on how well their
            CV aligns with the job posting.
            </p>
          </div>
          <div className="flex gap-6 w-[484px] mb-7 font-light">
            <img src={Correct} alt="" />
            <p className="text-[#002D59] leading-6 font-sf_pro_text text-[18px]">
            Companies receive AI-powered insights to help them
            quickly evaluate and select the best candidates.
            </p>
          </div>
        </div>

        <div>
          <img src={Feature2} alt="" />
        </div>
      </div>
    </>
  );
}
