import React from "react";
import company from "../../assets/Images/company.svg";
import logo from "../../assets/Images/Microsoftlogo.svg";
import location from "../../assets/Images/location.svg";
import salary from "../../assets/Images/salary.svg";
import line2 from "../../assets/Images/Line 27.svg";
import RelatedJob from "../RelatedJob/RelatedJob";

export default function JobDetails() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    rows: 3,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  let related = [
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
  ];

  return (
    <div>
      <div className="container w-10/12 m-auto bg-[#F9F9F9] p-3 mt-10">
        <img src={company} alt="" />
        <p className="text-[#616161] text-sm font-bai_jamjuree font-medium mt-7 mb-7">
          - job details
        </p>
        <div className="grid grid-cols-12">
          <div className="col-span-8 ">
            <div className="flex justify-between">
              <div className="text flex ">
                <div className="logo mt-2">
                  <img src={logo} className="mr-3" />
                </div>
                <div>
                  <p className="font-sf_pro_text font-semibold text-2xl">
                    Full Stack Developer
                  </p>
                  <p className="companyname font-bai_jamjuree text-xs font-normal text-[#0146B1]">
                    Microsoft
                  </p>
                </div>
              </div>
              <button className="bg-[#143567] w-28 h-11 rounded-lg text-[#FFFFFF] mr-16">
                Apply Now
              </button>
            </div>
            <img src={line2} className="mt-8" />
            <div className="w-[840px]">
              <h2 className="font-medium text-lg font-bai_jamjuree mb-2 mt-6">
                Summary:
              </h2>
              <p className="font-normal text-sm font-bai_jamjuree text=[#474747]">
                As a Full Stack Developer, you will be responsible for
                designing, developing, and maintaining scalable software
                solutions across both front-end and back-end components. Working
                closely with a cross-functional team, you’ll play a key role in
                delivering high-quality applications that meet the needs of both
                the business and end users.
              </p>
            </div>
            <h2 className="font-medium text-lg font-bai_jamjuree mb-2 mt-6">
              Responsibilties:
            </h2>
            <div className="responsibilities ml-5">
              <ul className="list-disc font-bai_jamjuree text-sm font-normal text-[#474747]">
                <li className="ml-6 ">
                  <p>
                    Develop robust and scalable web applications using modern
                    frameworks.
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Implement responsive and user-friendly interfaces for a
                    seamless user experience.
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Ensure server and network performance, implementing caching
                    and optimizing configurations as needed.
                  </p>
                </li>
              </ul>
              <p className="mt-1 mb-1 font-bai_jamjuree font-medium">
                -Back-End Development:
              </p>
              <ul className="list-disc font-bai_jamjuree text-sm font-normal text-[#474747]">
                <li className="ml-6 ">
                  <p>
                    Build and maintain RESTful APIs, ensuring secure and
                    efficient data flow between the server and clients.
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Manage database systems, design schemas, and optimize
                    queries for performance.
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Collaborate with UI/UX designers to bring visual designs to
                    life.
                  </p>
                </li>
              </ul>
              <p className="mt-1 mb-1 font-bai_jamjuree font-medium">
                -Collaboration & Project Management:
              </p>
              <ul className="list-disc font-bai_jamjuree text-sm font-normal text-[#474747]">
                <li className="ml-6 ">
                  <p>
                    Work with cross-functional teams including designers,
                    product managers, and QA to define requirements and deliver
                    solutions.
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Manage database systems, design schemas, and optimize
                    queries for performance.
                  </p>
                </li>
              </ul>
              <p className="mt-1 mb-1 font-bai_jamjuree font-medium">
                -Quality Assurance:
              </p>
              <ul className="list-disc font-bai_jamjuree text-sm font-normal text-[#474747]">
                <li className="ml-6 ">
                  <p>Write clean, maintainable, and well-documented code..</p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Conduct thorough testing, including unit, integration, and
                    end-to-end tests, to ensure application stability..
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>Debug and resolve issues in a timely manner.</p>
                </li>
              </ul>
            </div>
            <h2 className="font-medium text-lg font-bai_jamjuree mb-2 mt-6">
              Requirements :
            </h2>
            <div className="requirements ml-5">
              <p className="mt-1 mb-1 font-bai_jamjuree font-medium">
                -Educational Background:
              </p>
              <ul className="list-disc font-bai_jamjuree text-sm font-normal text-[#474747]">
                <li className="ml-6 ">
                  <p>
                    Bachelor’s degree in Computer Science, Software Engineering,
                    or a related field (or equivalent experience).
                  </p>
                </li>
              </ul>
              <p className="mt-1 mb-1 font-bai_jamjuree font-medium">
                -Technical Skills:
              </p>
              <ul className="list-disc font-bai_jamjuree text-sm font-normal text-[#474747]">
                <li className="ml-6 ">
                  <p>
                    Proficiency in front-end languages (e.g., HTML, CSS,
                    JavaScript) and frameworks like React or Angular.
                  </p>
                </li>
                <li className="ml-6 ">
                  <p>
                    Strong experience with back-end languages (e.g., Node.js,
                    Python, Ruby) and frameworks.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <aside className="col-span-3  border-l-[2px] p-5">
            <h3 className="time font-sf_pro_text font-bold text-lg mb-3">
              Full-Time
            </h3>
            <div className="location flex mb-3 text-sm font-semibold text-[#474747]">
              <img src={location} className="mr-2" />
              <p>New York</p>
            </div>
            <div className="salary flex mb-3 text-sm font-semibold text-[#474747]">
              <img src={salary} className="mr-2" />
              <p>$80,000 - $100,000 annually</p>
            </div>
            <img src={line2} alt="" />
            <div className="downside mt-4">
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Eperience Level
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  Mid-Level
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Location
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  On-Site
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Working Hours
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  Flexible schedule
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm">
                  • Education Requirements
                </h2>
                <p className="font-bai_jamjuree text-sm text-[#474747] mt-2 ml-2">
                  Bachelor’s Degree in Computer Science or related field
                </p>
              </div>
              <div className="mb-4">
                <h2 className="font-sf_pro_text font-semibold text-sm mb-2">
                  • Required Skills
                </h2>
                <div className="skills flex gap-2 flex-wrap w-full">
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl h-6  text-sm font-normal w-fit p-4">
                    SQL
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl h-6  text-sm font-normal w-fit p-4">
                    Python
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Java Script
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Problem-solving
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Networks
                  </div>
                  <div className="skill flex justify-center items-center bg-[#EFEFEF] rounded-xl	h-6  text-sm font-normal w-fit p-4">
                    Cloud Computing
                  </div>
                  
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="relatedJobs w-10/12 m-auto">
        <p className="font-bold text-xl font-sf_pro_text mb-2 mt-6">
          Related Jobs
        </p>
        <div className="relatedJobGrid grid grid-cols-2 gap-2 ml-7 mb-7">
          {related.map((j) => (
            <RelatedJob
              logo={logo}
              jobtitle={j.jobtitle}
              worksin={j.worksin}
              time={j.time}
              location={j.location}
              date={j.date}
              apllicants={j.apllicants}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
