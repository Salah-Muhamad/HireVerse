import React, { useEffect, useState } from "react";
import Search from "../../assets/Images/Search3.svg";
import Microsoft from "../../assets/Images/Microsoft.svg";
import TopCompanies from "../TopCompanies/TopCompanies";
import Next from "../../assets/Images/Next.svg";
import Back from "../../assets/Images/Back.svg";
export default function Companies() {
  const cards = Array(500).fill({
    icon: Microsoft,
    companyName: "Microsoft",
    position: "Software Engineering",
    locationIcon: Location,
    location: "USA, UK, India",
  });

  const CARDS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);

  // استخراج الكروت الخاصة بالصفحة الحالية
  const currentCards = cards.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // حساب الصفحات التي ستظهر في السلايدر
  const getPagesToShow = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "..."];
    }
    if (currentPage >= totalPages - 2) {
      return ["...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return ["...", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "..."];
  };

  const [companies, setCompanies] = useState([])
  async function getCompanies() {
    try{
      let {data} = await axios.get(`http://157.175.163.205/api/companies`)
      // console.log(data.data)
      setCompanies(data.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getCompanies()
  })
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
      {/* الكروت */}
      <div className="grid grid-cols-3 gap-4">
        {currentCards.map((card, index) => (
          <TopCompanies
            key={index}
            icon={card.icon}
            companyName={card.companyName}
            position={card.position}
            locationIcon={card.locationIcon}
            location={card.location}
          />
        ))}
      </div>

      {/* السلايدر */}
    </div>
      <div className="flex justify-center my-4">
        <button
          className="mx-2 "
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={Back} alt="" />
        </button>
        {getPagesToShow().map((page, index) => (
          <button
            key={index}
            className={`mx-2 px-4 text-gray-400 py-2 ${
              currentPage === page
                ? "border-b-2 border-black text-black"
                : "bg-white"
            } ${page === "..." ? "cursor-default" : ""}`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          className="mx-2 "
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={Next} alt="" />
        </button>
      </div>
    </>
  );
}
