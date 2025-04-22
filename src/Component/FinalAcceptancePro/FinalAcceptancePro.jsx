import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Search2 from "../../assets/Images/Search2.svg";
import Next2 from "../../assets/Images/Next2.svg";
import Name from "../../assets/Images/Name.svg";
import Email from "../../assets/Images/Email.svg";
import AppDate from "../../assets/Images/AppDate.svg";
import CvStatus from "../../assets/Images/CvStatus.svg";
import Move from "../../assets/Images/Move.svg";
import axios from "axios";
import { CircleLoader, PacmanLoader } from "react-spinners";

export default function FinalAcceptancePro() {

  return (
    <>
          <Outlet />

      <div className="bg-[#EFF2F7] h-screen font-sf_pro_text ">
        <h1 className="text-3xl font-semibold pt-40 ps-24">
          
        </h1>
        <div className="flex gap-7 pt-10 ps-24">
          <Link>Applicants</Link>
          <Link>Interview</Link>
          <Link to='/finalacceptance'>Final Acceptance</Link>
        </div>

        <div className="flex justify-between me-24">
          <div className="w-96 ms-24 mt-4 bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
            <img src={Search2} alt="" />
            <input
              type="text"
              className="p-2 rounded-md focus:outline-none "
              placeholder="Search"
            />
          </div>
          <div className="flex gap-4 ">
            <div className="w-96 ms-24  bg-white h-12 border-2 rounded-lg flex items-center ps-4 font-bai_jamjuree font-medium">
              <input
                type="text"
                className="p-2 rounded-md focus:outline-none "
                placeholder="ex :90"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0C2E82] w-[103px] h-11 rounded-lg text-white font-bai_jamjuree font-medium"
            >
              Apply
            </button>
          </div>
        </div>

        <table className="min-w-[78%] border border-gray-300 m-auto mt-10">
          <thead className="sticky top-0  ltr:text-left rtl:text-right border-b border-gray-300 bg-[#E9ECF0]">
            <tr className="*:font-medium *:text-gray-900 *:border *:border-gray-300">
              <th className="w-10">
                <tr>Num</tr>
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Name} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={Email} alt="" />
              </th>
              <th className="px-4 py-3 border border-gray-300">
                <img src={AppDate} alt="" />
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="*:text-gray-900">
                <td className="px-4 py-3 border border-gray-300">1</td>
                <td className="px-4 py-3 border border-gray-300">Ahmed Essam</td>
                <td className="px-4 py-3 border border-gray-300">ahmedessam55@gmail.com</td>
                <td className="px-4 py-3 border border-gray-300">Jan. 14 .2025, 8:10 a.m.</td>
                <td className="px-4 py-3 border border-gray-300"><img src={Next2} alt="" /></td>
                
                
            </tr>
            <tr className="*:text-gray-900">
                <td className="px-4 py-3 border border-gray-300">2</td>
                <td className="px-4 py-3 border border-gray-300">Noura ALi</td>
                <td className="px-4 py-3 border border-gray-300">nouraali4@gmail.com</td>
                <td className="px-4 py-3 border border-gray-300">Jan. 14 .2025, 8:10 a.m.</td>
                <td className="px-4 py-3 border border-gray-300"><img src={Next2} alt="" /></td>
                
                
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
