// PostJobContext.jsx

import React, { createContext, useContext, useState } from "react";

const PostJobContext = createContext();

export const usePostJob = () => {
  return useContext(PostJobContext);
};

export const PostJobProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    experience_level: "",
    work_location: "",
    work_hours: "",
    requirements: "",
    skills: [],
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
