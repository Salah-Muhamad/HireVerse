import React from "react";
import { Link } from "react-router-dom";

export default function Instructions() {
  return (
    <>
      <div className="bg-secondary pt-20 pb-20 ps-24 m-auto h-[100vh]">
        <div className="border-b-2 pb-8 me-24">
          <h1 className="text-4xl  text-[#0146B1]  font-bold me-24">
            Interview Instructions
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-semibold">
            Please make sure to follow the guidelines below carefully to ensure
            a smooth and successful interview experience:
          </p>
        </div>
        <div className="mt-6 me-24">
          <ol className="list-decimal ps-5 text-xl text-gray-700 space-y-4">
            <li>
              <span className="font-bold">Choose a quiet environment:</span> Sit
              in a calm, quiet place, away from any background noise or
              distractions.
            </li>
            <li>
              <span className="font-bold">
                Maintain eye contact with the camera:
              </span>{" "}
              During the interview, look directly into the camera to simulate
              natural eye contact.
            </li>
            <li>
              <span className="font-bold">Avoid looking away:</span> Avoid
              looking away from the camera, as it may affect your score.
            </li>
            <li>
              <span className="font-bold">Clear voice tone:</span> Speak clearly
              and confidently. Ensure your voice is audible without background
              interference.
            </li>
            <li>
              <span className="font-bold">Stay close to the camera:</span>{" "}
              Position yourself at a suitable distance so that your face is
              clearly visible.
            </li>
            <li>
              <span className="font-bold">Test your equipment:</span> Check your
              camera and microphone before the interview to confirm they are
              working properly.
            </li>
            <li>
              <span className="font-bold">Dress appropriately:</span> Wear
              formal or semi-formal attire, and ensure you appear well-groomed
              and presentable.
            </li>
            <li>
              <span className="font-bold">Interview duration:</span> The
              interview will last approximately one hour from the starting time.
            </li>
            <li>
              <span className="font-bold">Language:</span> The interview will be
              conducted in English.
            </li>
          </ol>

          <div className="mt-5 text-xl flex justify-between items-center">
            <Link to="/ApplicantJobs">
            <button className="w-48 h-12 rounded-2xl border-2 border-gray-400">Back</button>
            </Link>
            <Link to="/Interview">
            <button className="w-48 h-12 bg-[#0146B1] text-white rounded-2xl ">Go To Interview</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
