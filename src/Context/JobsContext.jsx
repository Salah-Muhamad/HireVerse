import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { object } from "yup";

const jobContext = createContext();
const initialFilteration = {
  experience_level: [],
  type: [],
  location: [],
  work_hours: [],
  salary: [],
};

function JobsProvider({ children }) {
  const [filter, setFilter] = useState({...initialFilteration});
  const [jobs, setJobs] = useState([]);
  function reset() {
    setFilter({
        experience_level: [],
        type: [],
        location: [],
        work_hours: [],
        salary: [],
      });
    
  }  async function getJobs(params) {
    try {
      let { data } = await axios.get(
        `https://hireverse.ddns.net/api/jobs${params ? `?${params}` : ""}`
      );
      //   console.log(data.data);
      setJobs(data.jobs);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const params = Object.entries(filter).reduce((acc, [key, value]) => {
      if (acc && value.length > 0) {
        acc += "&";
      }
      if (value.length > 0) {
        acc += key + "=";

        acc += value.join();
      }
      return acc;
    }, "");
    // console.log(params);
    getJobs(params);
  }, [filter]);
  return (
    <jobContext.Provider value={{ filter, setFilter, jobs , reset , setJobs}}>
      {children}
    </jobContext.Provider>
  );
}
function useJobsProvider() {
  const value = useContext(jobContext);
  if (!value) {
    throw new Error("Not allowed to use this hook out of context");
  }
  return value;
}
export { JobsProvider, useJobsProvider };
