import React from "react";
import background from "../../assets/Images/aboutbackground.svg";
import people from "../../assets/Images/people.svg";
import aboutvector1 from "../../assets/Images/aboutvector1.svg";
import realpeople from "../../assets/Images/realpeople.svg";
import line from "../../assets/Images/Line 43.svg";
import bashaelbalad from "../../assets/Images/bashaelbalad.svg";
import "../About/about.css";
import AboutImageCard from "../AboutImageCard/AboutImageCard";
export default function About() {
  return (
    <div>
      <div className="background mb-28 ">
        <div className="content pt-44 pb-10">
          <h2
            className="
          aboutlogo font-bold	text-2xl	font-sf_pro_display leading-10 text-[color:#143567]	mb-1.3 text-center"
          >
            HIRE VERSE
          </h2>
          <p className="w-[616px] text-center h-10 font-normal	font-sf_pro_display text-sm	text-[color:#4B4B4B]">
            Every day is a new opportunity to grow and learn. Embrace the
            challenges and keep moving forward. With persistence, you'll get
            closer to your goals and unlock your true potential.
          </p>
        </div>
      </div>
      <div className="container w-10/12	m-auto	">
        <div className="sec1 flex">
          <div className="imag">
            <img src={people} alt="" />
          </div>
          <div className="sec1content w-[53.25rem] ms-10">
            <h2
              className="text-center
            bg-[url('src/assets/Images/aboutvector1.svg')] bg-no-repeat bg-cover	w-52 h-20
            text-[color:#FFFFFF] flex justify-center items-center font-bold text-xl "
            >
              Our Vision
            </h2>
            <div className="title mt-5 text-lg font-semibold font-sf_pro_text mb-2">
              <span className="mr-2">•</span>Empowering Potential
            </div>
            <p className=" min-h-20	text-[#7B7B7B]">
              Our vision is to create a world where every individual has access
              to the right opportunities to realize their full potential. By
              bridging the gap between talent and opportunity, we foster an
              environment where continuous growth, innovation, and inclusivity
              thrive.
            </p>
            <div className="title mt-1 text-lg font-semibold font-sf_pro_text mb-2">
              <span className="mr-2">•</span>Turning Challenges into Triumphs
            </div>
            <p className=" min-h-20	text-[#7B7B7B]">
              We believe that everyone deserves a chance to succeed. Through
              dedication and collaboration, we transform challenges into
              stepping stones, helping aspirations turn into achievements.
            </p>
            <div className="title mt-1 text-lg font-semibold font-sf_pro_text mb-2">
              <span className="mr-2">•</span>Building a Global Community
            </div>
            <p className=" min-h-20	text-[#7B7B7B]">
              Our goal is to build a diverse and inclusive community where
              creativity flourishes and every contribution is valued. By
              empowering individuals and organizations, we aim to inspire
              positive change and lasting impact.
            </p>
          </div>
        </div>
        <h2
          className="text-center text-[color:#FFFFFF] flex justify-center items-center 
        bg-[url('src/assets/Images/aboutvector2.svg')] bg-no-repeat bg-cover	w-52 h-20 font-sf_pro_display font-bold text-xl"
        >
          Achivements
        </h2>
        <div className="sec2 flex justify-between mb-20">
          <div className="sec2content w-[38rem]">
            <div className="title mt-5 text-lg font-semibold font-sf_pro_text mb-2">
              <span className="mr-2">•</span>Empowering Potential
            </div>
            <p className=" min-h-20	text-[#7B7B7B]">
              Our vision is to create a world where every individual has access
              to the right opportunities to realize their full potential. By
              bridging the gap between talent and opportunity, we foster an
              environment where continuous growth, innovation, and inclusivity
              thrive.
            </p>
            <div className="title mt-1 text-lg font-semibold font-sf_pro_text mb-2">
              <span className="mr-2">•</span>Turning Challenges into Triumphs
            </div>
            <p className=" min-h-20	text-[#7B7B7B]">
              We believe that everyone deserves a chance to succeed. Through
              dedication and collaboration, we transform challenges into
              stepping stones, helping aspirations turn into achievements.
            </p>
          </div>
          <img
            src={realpeople}
            className="shadow-[4px_4px_15px_rgba(0,0,0,0.5)]"
          />
        </div>
        <div className="linee flex justify-center mb-5">
          <img src={line} className="" alt="" />
        </div>
        <div className="sec3">
          <div className="sec3titles text-center">
            <h2 className="font-sf_pro_text font-bold	text-2xl	">
              Meet Our beautiful Team
            </h2>
            <p>
              Our success is driven by passionate individuals who bring
              expertise, creativity, and dedication
            </p>
          </div>
          <div className="sec3cards grid grid-cols-4">
            <AboutImageCard
              image={bashaelbalad}
              name={"Salah"}
              pos={"Front-End Developer"}
            />
            <AboutImageCard
              image={bashaelbalad}
              name={"Salah"}
              pos={"Front-End Developer"}
            />
            <AboutImageCard
              image={bashaelbalad}
              name={"Salah"}
              pos={"Front-End Developer"}
            />
            <AboutImageCard
              image={bashaelbalad}
              name={"Salah"}
              pos={"Front-End Developer"}
            />
            <AboutImageCard
              image={bashaelbalad}
              name={"Salah"}
              pos={"Front-End Developer"}
            />
            <AboutImageCard
              image={bashaelbalad}
              name={"Salah"}
              pos={"Front-End Developer"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
