import React from "react";
import background from "../../assets/Images/CompanyDetailsbackground.svg";
import microsoftlogo from "../../assets/Images/Microsoftlogo.svg";
import facebook from "../../assets/Images/devicon_facebook.svg";
import linkedin from "../../assets/Images/devicon_linkedin.svg";
import health from "../../assets/Images/healthicons_health.svg";
import uparrow from "../../assets/Images/Frame 1000003674.svg";

import JobsFromCompany from "../JobsFromCompany/JobsFromCompany";
import { Link } from "react-router-dom";
export default function CompanyDetails() {
    let jobs = [
        {
          jobtitle: "Senior Data Science Manager",
          worksin: "Artificial Intelligence, Data Platforms, and Analytics",
          time: "Full-Time",
          location: "On-Site",
          date: "5-Days ago",
          apllicants: "+5000 apllicant",
        },
        {
          jobtitle: "Front-End Developer",
          worksin: "Artificial Intelligence, Data Platforms, and Analytics",
          time: "Full-Time",
          location: "On-Site",
          date: "5-Days ago",
          apllicants: "+5000 apllicant",
        },
        {
              jobtitle: "Front-End Developer",
              worksin: "Artificial Intelligence, Data Platforms, and Analytics",
              time: "Full-Time",
              location: "On-Site",
              date: "5-Days ago",
              apllicants: "+5000 apllicant",
            },
            {
              jobtitle: "Front-End Developer",
              worksin: "Artificial Intelligence, Data Platforms, and Analytics",
              time: "Full-Time",
              location: "On-Site",
              date: "5-Days ago",
              apllicants: "+5000 apllicant",
            }
    ]
  return (
    
    <>
        <div className="bg-[#F6F6F6] min-h-screen">
        <div className="sec1 mb-20 w-full">
          <img src={background} className="w-full"/>
          <div className="Companydetails p-12  pe-20 ms-32 h-60 w-5/6 absolute top-48 bg-[#FFFFFF] rounded-xl">
            <div className="row1 ps-11">
              <div className="compname flex justify-between">
                <div className="name flex">
                  <img src={microsoftlogo} className="me-4" />
                  <div className="details">
                    <p className="font-sf_pro_text">Microsoft</p>
                    <p className="text-[#858585] font-bai_jamjuree">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="icons flex">
                  <img src={facebook} className="me-4" />
                  <img src={linkedin} alt="" />
                </div>
              </div>
            </div>
            <div className="row2 flex justify-between mt-8">
              <div>
                <p className="mb-1 font-sf_pro_text font-medium text-[#5A5A5A]">
                  CEO
                </p>
                <p className="font-semibold font-bai_jamjuree">
                  Lorem, ipsum dolor.
                </p>
              </div>
              <div>
                <p className="mb-1 font-sf_pro_text font-medium text-[#5A5A5A]">
                  Location
                </p>
                <p className="font-semibold font-bai_jamjuree">
                  Lorem, ipsum dolor.
                </p>
              </div>
              <div>
                <p className="mb-1 font-sf_pro_text font-medium text-[#5A5A5A]">
                  Industry
                </p>
                <p className="font-semibold font-bai_jamjuree">
                  Lorem, ipsum dolor.
                </p>
              </div>
              <div>
                <p className="mb-1 font-sf_pro_text font-medium text-[#5A5A5A]">
                  Number of Employees
                </p>
                <p className="font-semibold font-bai_jamjuree">
                  Lorem, ipsum dolor.
                </p>
              </div>
              <div>
                <p className="mb-1 font-sf_pro_text font-medium text-[#5A5A5A]">
                  Website
                </p>
                <p className="font-semibold font-bai_jamjuree">
                  Lorem, ipsum dolor.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sec2 grid grid-cols-3 gap-4 px-32 w-[1410px]">
            <div className="con1 col-span-2">
                <div className="mb-4">
                    <div className="label font-sf_pro_text font-bold mb-3">
                    Microsoft Description
                    </div>
                    <div className="desc w-[760px] font-sf_pro_text font-normal text-[#474747] text-sm">
                    At Microsoft, we are dedicated to empowering every person and organization on the planet to achieve more. Our innovative solutions and products, like Windows, Office, Azure, and Xbox, have helped shape the technology landscape. By integrating advanced technology and a commitment to quality, we strive to create a world where everyone can thrive in a connected digital era.
                    </div>
                </div>
                <div className="mb-4">
                    <div className="label font-sf_pro_text font-bold mb-3">
                    Microsoft Insights
                    </div>
                    <div className="desc w-[760px] font-sf_pro_text font-normal text-[#474747] text-sm">
                    At Microsoft, we are dedicated to empowering every person and organization on the planet to achieve more. Our innovative solutions and products, like Windows, Office, Azure, and Xbox, have helped shape the technology landscape. By integrating advanced technology and a commitment to quality, we strive to create a world where everyone can thrive in a connected digital era.
                    </div>
                </div>
                <div className="mb-4">
                    <div className="label font-sf_pro_text font-bold mb-3">
                    Microsoft Employee Benefits
                    </div>
                    <div className="desc w-[760px] font-sf_pro_text font-normal text-[#474747] text-sm">
                    At Microsoft, we are dedicated to empowering every person and organization on the planet to achieve more. Our innovative solutions and products, like Windows, Office, Azure, and Xbox, have helped shape the technology landscape. By integrating advanced technology and a commitment to quality, we strive to create a world where everyone can thrive in a connected digital era.
                    </div>
                </div>
                <div className="benefits bg-[#ffffff] mt-8 rounded-xl px-14 py-11">
                    <div className="benefitsrow mb-10 flex justify-between">
                    <div className="item flex">
                        <img src={health} className="me-3"/>
                        <p className="w-56 text-[#474747] font-bai_jamjuree font-normal text-sm">Comprehensive insurance and
                        wellness programs.</p>
                    </div>
                    <div className="item flex">
                        <img src={uparrow} className="me-3"/>
                        <p className="w-56 text-[#474747] font-bai_jamjuree font-normal text-sm">Comprehensive insurance and
                        wellness programs.</p>
                    </div>
                    </div>
                    <div className="benefitsrow flex justify-between">
                    <div className="item flex">
                        <img src={health} className="me-3"/>
                        <p className="w-56 text-[#474747] font-bai_jamjuree font-normal text-sm">Comprehensive insurance and
                        wellness programs.</p>
                    </div>
                    <div className="item flex">
                        <img src={uparrow} className="me-3"/>
                        <p className="w-56 text-[#474747] font-bai_jamjuree font-normal text-sm">Comprehensive insurance and
                        wellness programs.</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="con2 w-[495px]">
                <div className="con2header flex justify-between mb-6 ">
                <p className="font-sf_pro_text font-bold">Jobs From <span>Microsoft</span></p>
                <p><Link className="text-blue-700 underline"><p className="font-sf_pro_text">View all</p></Link></p>
                </div>
                {
                    jobs.map((ele)=><JobsFromCompany 
                                logo={microsoftlogo}
                                jobtitle={ele.jobtitle}
                                worksin={ele.worksin}
                                time={ele.time}
                                location={ele.location}
                                date={ele.date}
                                apllicants={ele.apllicants}
                                />)
                }
            </div>
        </div>
        </div>
    </>
  );
}
