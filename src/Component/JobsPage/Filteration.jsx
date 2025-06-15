import React from "react";
import { useState } from "react";
import search from "../../assets/Images/searchicon.svg";
import DropDown from "../DropDown/DropDown";
import { useJobsProvider } from "../../Context/JobsContext";
export default function Filteration() {
  const { filter, setFilter, reset } = useJobsProvider();
  function updateFilter(property, value) {
    const idx = filter[property].indexOf(value);
    if (idx === -1) filter[property].push(value);
    else filter[property].splice(idx, 1);
    setFilter({ ...filter });
  }
  return (
    <>
      <aside className="col-span-3 bg-[#FFFFFF] h-[845px] rounded-lg border-[#C5C5C5] border-2">
        <div className="part1 flex justify-between p-5 border-b-2 mb-3">
          <p className="font-sf_pro_text font-semibold">Filter</p>
          <button
            onClick={reset}
            className="text-[#0146B1] font-medium font-sf_pro_text cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
        <div className="space-y-3 divide-y-2">
          <DropDown
            onOptionSelect={updateFilter}
            title={"Location"}
            property={"location"}
            options={[
              { name: "Remote", value: "remote" },
              { name: "On-site", value: "onsite" },
              { name: "Hybird", value: "hybrid" },
            ]}
          />
          <DropDown
            onOptionSelect={updateFilter}
            title={"Job Type"}
            property={"type"}
            options={[
              { name: "Freelance", value: "freelance" },
              { name: "Part-time", value: "part_time" },
              { name: "Full-time", value: "full_time" },
            ]}
          />
          <DropDown
            onOptionSelect={updateFilter}
            property={"experience_level"}
            title={"Experience level"}
            options={[
              { name: "Junior", value: "junior" },
              { name: "Mid-Level", value: "mid-level" },
              { name: "Senior", value: "senior" },
            ]}
          />
          <DropDown
            onOptionSelect={updateFilter}
            title={"Working Hours"}
            property={"work_hours"}
            options={[
              { name: "Flexible Schedule", value: "flexible_schedule" },
              { name: "Fixed Schedule", value: "fixed_schedule" },
            ]}
          />
        </div>
      </aside>
    </>
  );
}
