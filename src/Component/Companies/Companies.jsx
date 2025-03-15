import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Search from "../../assets/Images/Search3.svg";
import TopCompanies from "../TopCompanies/TopCompanies";
import axios from "axios";
export default function Companies() {
  const [companies, setCompanies] = useState([]);
  async function getCompanies() {
    try {
      let { data } = await axios.get(`https://hireverse.ddns.net/api/companies`);
      console.log(data.data);
      setCompanies(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCompanies();
  });
  return (
    <>
      <div className="mt-44 ms-[91.5px] w-[791px] h-16 border-2 rounded-lg flex items center px-5 justify-between shadow-md">
        <div className="flex gap-7">
          <img src={Search} alt="" className="w-8" />
          <input
            type="text"
            className="p-2 rounded-md focus:outline-none font-bai_jamjuree font-normal w-96"
            placeholder="Search for companies by name, industry"
          />
        </div>
        <div className="flex items-center">
          <button className="text-white bg-[#1F4171] w-24 h-11 rounded-lg font-semibold font-bai_jamjuree">
            Search
          </button>
        </div>
      </div>
      <div className="w-[1360px] border-2 p-4 ms-[91.5px] my-8">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {Array.from({ length: Math.ceil(companies.length / 12) }).map(
            (_, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-3 gap-4">
                  {companies
                    .slice(i * 12, (i + 1) * 12)
                    .map((company, index) => (
                      <TopCompanies
                        key={index}
                        company={company}
                        locationIcon={Location}
                      />
                    ))}
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </>
  );
}
