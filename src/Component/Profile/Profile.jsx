import axios from "axios";
import React from "react";
import photo2 from "../../assets/Images/Prof.jpeg";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  async function fetchUserData() {
    try {
      let { data } = await axios.get(
        `https://hireverse.ddns.net/api/applicants/${id}`
      );
      setUserData(data.data.attributes);
      console.log(data.data.attributes);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }
  useEffect(() => {
    // console.log(id)
    fetchUserData();
  }, [id]);
  return (
    <>
      <div className="bg-secondary pt-44 pb-20 ps-24 m-auto h-[100vh]">
        <h1 className="text-4xl text-[#0146B1] font-bold mb-10 border-b-2 border-gray-300 pb-8 me-24">
          Profile
        </h1>
        <div className="flex items-center mb-4 border-b-2 border-gray-300 pb-8  me-24">
          {userData.avatarUrl ? (
            <img src={`https://myawshierbucket.s3.me-south-1.amazonaws.com/${userData.avatarUrl}`} className="w-[100px] h-[100px] rounded-full" alt="" />
          ) : (
            <img src={photo2} className="w-[100px]" alt="" />
          )}
          <div>
            {
              userData.firstName && userData.lastName ? (
                <h1 className="text-2xl font-bold ps-4">
                  {userData.firstName} {userData.lastName}
                </h1>
              ) : (
                <h1 className="text-2xl font-bold ps-4">No Name Provided</h1>
              )
            }

{
  userData.jobTitle ? (
              <p className="text-gray-600 ps-4">{userData.jobTitle}</p>
            ) : (
              <p className="text-gray-600 ps-4">No Job Title Provided</p>
            )
}
{
              userData.email ? (
                <p className="text-gray-600 ps-4">{userData.email}</p>
              ) : (
                <p className="text-gray-600 ps-4">No Email Provided</p>
              )
}   
         <div className="flex items-center gap-4 ps-4 mt-2">
              <Link to={userData.linkedinUrl} target="_blank">
                <Linkedin color="#162492" />
              </Link>
              <Link to={userData.githubUrl} target="_blank">
              <Github color="#2c2d35" />
              </Link>
            </div>
          </div>
        </div>

        <div className="me-24 border-b-2 border-gray-300 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-4">Skills</h1>
          <div className="flex flex-wrap gap-4">
            {userData.skills &&
              userData.skills.map((skill, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full ">
                  {skill}
                </span>
              ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">College / Department </h1>
          <p className="text-gray-600">
            {userData.college} / {userData.department}
          </p>
        </div>
      </div>
    </>
  );
}
