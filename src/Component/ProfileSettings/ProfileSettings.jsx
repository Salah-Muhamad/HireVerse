import React, { useState } from 'react';
import user from '../../assets/Images/user.svg';
import lock from '../../assets/Images/lock.svg';
import del from '../../assets/Images/delete.svg';
import photo from '../../assets/Images/Ellipse 128.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfileSettings() {
  const [photo, setPhoto] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    bio: '',
    linkedIn: '',
    github: '',
    degree: '',
    fieldOfStudy: '',
    school: '',
    college: ''
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };

  const handleDelete = () => {
    setPhoto(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.patch(
        '/api/applicant/profile',
        profileData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Profile updated successfully:', response.data);
      // Optionally show a success message here
    } catch (error) {
      // Handle errors here
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container bg-[#F9FAFB]">
      <div className="grid grid-cols-11 gap-20 m-4">
        <div className="col-span-2 ml-4 mt-2 font-sf_pro_text font-semibold">
          <p>Settings</p>
          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
          <div className="flex gap-4 mb-6 bg-[#E1E1E1] rounded-md w-11/12 h-11 p-2">
            <img src={user} alt="" />
            <Link to={"/profile"}><p className="mt-1">Profile</p></Link>
          </div>
          <div className="flex gap-4 mb-8 ml-2">
            <img src={lock} alt="" />
            <Link to={"/profile"}><p>Password</p></Link>
          </div>

          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-10"></div>
          <div className="flex gap-4 mb-6">
            <img src={del} alt="" />
            <Link to={"/profile"}><p className="text-[#F02E2E]">Delete account</p></Link>
          </div>
        </div>

        <div className="col-span-9 mt-16 w-11/12">
          <div className="flex justify-between">
            <p className="font-sf_pro_text text-2xl font-bold">Edit Profile</p>
            <div className="btns">
              <button
                className="bg-[#E4E4E4] w-20 h-9 rounded-xl text-sm font-sf_pro_text font-medium mr-4"
                // Add logic for Discard if needed
              >
                Discard
              </button>
              <button
                className="bg-[#0146B1] w-20 h-9 rounded-xl text-white text-sm font-sf_pro_text font-medium"
                onClick={handleSaveClick} // Add onClick handler to save the profile
              >
                Save
              </button>
            </div>
          </div>

          <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
          <div>
            <p className="text-[#616161] font-normal text-sm mb-8">Update Your Profile</p>

            <div className="p-5 border-2 rounded-xl bg-[#FFFFFF]">
              <div className="flex justify-between w-4/5">
                <div className="image flex items-center">
                  {photo ? (
                    <img
                      src={photo}
                      className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      No Avatar
                    </div>
                  )}
                  <div className="ml-6">
                    <p className="font-sf_pro_text text-base font-medium">Salah Muhamed</p>
                    <p className="text-[#7D7D7D] font-normal text-sm">salah56@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-6 border-2 border-[E8E8E8] p-4 rounded-xl mt-8 grid grid-cols-12 gap-20 bg-[#F9FAFB]">
              <div className="col-span-7 p-3 bg-[#F9FAFB]">
                <div className="p-5 border-2 rounded-xl bg-[#FFFFFF] mt-5">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">Personal Information</p>
                  <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                  <div className="name flex justify-between pr-14 mb-2">
                    <div>
                      <label className="font-sf_pro_text text-sm">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="mt-2 border p-2 w-[205px] rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-sf_pro_text text-sm">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="mt-2 border p-2 w-[205px] rounded-xl"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={profileData.jobTitle}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-xl mt-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-xl mt-2"
                  />
                  <textarea
                    name="bio"
                    placeholder="Bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-xl mt-2"
                  />
                </div>
              </div>

              <div className="col-span-5">
                <div className="p-5 border-2 rounded-xl bg-[#FFFFFF]">
                  <p className="font-sf_pro_text text-lg font-semibold mb-2">Your Photo</p>
                  <div className="border-b-2 border-[#E8E8E8] mt-3 mb-4"></div>
                  <div className="image flex">
                    {photo ? (
                      <img
                        src={photo}
                        className="mr-8 w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-8">
                        No Avatar
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="font-sf_pro_text text-base font-medium mb-2">Edit Your Profile</p>
                      <div className="w-1/2 flex gap-5">
                        <button onClick={handleDelete}>
                          <p className="text-[#888888]">Delete</p>
                        </button>
                        <label htmlFor="file-upload" className="cursor-pointer text-[#0146B1]">
                          Update
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-dotted border-2 mt-8 border-[#BAC5DC] rounded-lg p-3 text-center h-[160px] flex justify-center items-center">
                    <div>
                      <label htmlFor="file-upload" className="cursor-pointer text-[#0146B1] mb-3 block">
                        Click to Upload
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <p className="text-[#6F6F6F] font-normal text-xs font-sf_pro_text">PNG, SVG, JPG</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
