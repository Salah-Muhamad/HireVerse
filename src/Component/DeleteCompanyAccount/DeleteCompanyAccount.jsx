import React, { useEffect, useState } from "react";
import Cry from "../../assets/Images/Cry.svg";
import Sorry from "../../assets/Images/Sorry.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { use } from "react";
export default function DeleteCompanyAccount() {
  let navigate = useNavigate();
  const [id, setId] = useState("")
  useEffect(() => {
    const id = localStorage.getItem("id")
    if (id) {
        setId(id)
        
    }
    }, [])
    console.log(id)
  const handleDelete = async () => {
    const idToast = toast.loading("Deleting your account...");
    try {
      const response = await axios.delete(
        `https://hireverse.ddns.net/api/companies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("companyToken")}`,
          },
        }
    );
    console.log(response)

      console.log("Deleted successfully:", response.data);
      navigate("/Register");
      toast.success("Account deleted successfully", { id: idToast });
    } catch (error) {
      console.error("Error deleting applicant:", error);
      toast.error("Error deleting account", { id: idToast });
    }
  };

  return (
    <>
      <div className="bg-secondary p-5 font-sf_pro_text h-screen flex flex-col items-center justify-center gap-4">
        <div className="mx-auto w-[400px]  flex flex-col justify-center ">
          <img src={Cry} alt="" />
        </div>
        <div className="mx-auto w-[400px]  flex flex-col justify-center ">
          <img src={Sorry} alt="" />
        </div>
        <div className="w-1/2 text-[#494949]">
          <p className="">
            If you'd like to change your password, update your profile, or
            adjust your notification preferences, you can{" "}
            <Link to={"/ProfileSettings"}>
              <span className="font-bold text-[#000000]">
                do all of that here.
              </span>
            </Link>
          </p>
          <p className="mt-6">
            Be advised, account deletion is final. There will be no way to
            restore your account.
          </p>
        </div>
        <div className="flex gap-20 mt-4">
          <Link to={"/"}>
            <button className="bg-[#0C2E82] w-28 h-12 rounded-[24px] text-white">
              Nevermind
            </button>
          </Link>
          <button
            className=" w-[167px] h-12 rounded-[24px] border-2 bg-white"
            onClick={handleDelete}
          >
            Delete my account
          </button>
        </div>
      </div>
    </>
  );
}
