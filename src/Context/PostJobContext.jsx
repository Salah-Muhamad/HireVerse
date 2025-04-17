// PostJobContext.jsx

import React, { createContext, useContext, useState } from "react";

const PostJobContext = createContext();

export const usePostJob = () => {
  return useContext(PostJobContext);
};

export const PostJobProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    experienceLevel: "",
    location: "",
    workingHours: "",
    education: "",
    skills: "",
  });

  const updateFormData = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <PostJobContext.Provider value={{ formData, updateFormData }}>
      {children}
    </PostJobContext.Provider>
  );
};
