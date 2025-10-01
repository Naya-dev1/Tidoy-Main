import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NavBar from "../NavBar";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import profile from "../../assets/profilepic.png";
import drop from "../../assets/drop.png";
import logo from "../../assets/logo.png";
import profileIcon from "../../assets/profile-icon.png";
import legal from "../../assets/legal.png";
import settings from "../../assets/settings.png";
import help from "../../assets/help.png";
import language from "../../assets/language.png";
import profile2 from "../../assets/profile2.png";
import verify from "../../assets/verified2.png";
import edit from "../../assets/edit.png";
import down from "../../assets/arrow_down.png";
import logoutIcon from "../../assets/logout.png";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

const Profile = () => {
  const { user, logout, loading, updateProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    number: "",
    photo: "",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState(""); // Track selected option
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // 👇 collapse state for mobile
  const [showEditForm, setShowEditForm] = useState(false);

  const handleClick = (option) => {
    setActive(option);
  };

  // preload user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        number: user.number || "",
        photo: user.photo || "",
      });
    }
  }, [user]);

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">You are not logged in.</p>
        <Link to="/sign-in" className="text-blue-500 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo: imageUrl }));
      toast.success("Profile photo updated ✅");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const res = await updateProfile(formData);

    if (res.success) {
      toast.success("Profile updated successfully ✅");
    } else {
      toast.error(res.message || "Failed to update profile ❌");
    }

    setSaving(false);
  };

  return (
    <div>
      <div className="z-50  backdrop-blur-[10px] bg-[#FBFBFB59]  fixed w-full top-0 sm:px-[100px] px-6 ">
        <NavBar />
      </div>
      <div className="md:px-[100px] px-6 w-full pt-[120px]">
        {/* <MenuDropdown /> */}

        <h2 className="md:text-[32px] text-[20px] font-bold text-[#000000] md:my-[33px] my-6">
          Profile
        </h2>

        <div className="flex flex-col md:flex-row gap-[44px] items-start w-full">
          {/* Sidebar */}
          <div className="md:flex md:gap-[44px] md:items-center">
            <div className="md:w-[356px] w-full mb-6 md:mb-0 flex-shrink-0">
              <div className="flex flex-col items-start md:mb-[106px] mb-[50px] gap-[10px]">
                <div
                  className="flex gap-2 items-center bg-[#FFEBCC] border border-[#FFDDAA] md:py-6 py-4 md:px-[20px] px-4 w-full rounded-[8px] cursor-pointer md:cursor-default"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  <img src={profileIcon} alt="" />
                  <p className="text-[16px] md:text-[18px]">Edit Profile</p>
                </div>

                <div className="flex gap-2 items-center  md:py-6 py-4 md:px-[20px] px-4 w-full rounded-[8px]">
                  <img
                    src={language}
                    alt=""
                    className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-[17px]"
                  />
                  <p>Language</p>
                </div>

                <div className="flex gap-2 items-center  md:py-6 py-4 md:px-[20px] px-4 w-full rounded-[8px]">
                  <img
                    src={settings}
                    alt=""
                    className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-[17px]"
                  />
                  <p>Settings</p>
                </div>

                <div className="flex gap-2 items-center  md:py-6 py-4 md:px-[20px] px-4 w-full rounded-[8px]">
                  <img
                    src={legal}
                    alt=""
                    className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-[17px]"
                  />
                  <p>Legal & Privacy</p>
                </div>

                <div className="flex gap-2 items-center  md:py-6 py-4 md:px-[20px] px-4 w-full rounded-[8px]">
                  <img
                    src={help}
                    alt=""
                    className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-[17px]"
                  />
                  <p>Help & Support</p>
                </div>
              </div>

              <div
                className="flex gap-2 items-center  md:py-6 py-4 md:px-[20px] px-4 w-full rounded-[8px] cursor-pointer"
                onClick={logout}
              >
                <img
                  src={logoutIcon}
                  alt=""
                  className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-[17px]"
                />
                <p>Log Out</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-[300px] bg-[#2D2E2E] mx-4"></div>
          </div>
          {/* Profile Info */}
          <div className="flex flex-col md:gap-[32px] mb-[117px] md:w-[820px] w-full gap-6">
            {(showEditForm || window.innerWidth >= 768) && (
              <>
                {/* Profile header */}
                <div className="bg-[#EDF1F5] rounded-[19px] relative flex flex-col md:flex-row md:gap-[36px] gap-6 md:px-[34px] px-6 items-center w-full">
                  <img
                    src={formData.photo || profile2}
                    alt=""
                    className="w-[159px] h-[250px] py-[52px] rounded-full object-cover"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <div
                    className="absolute md:bottom-[33px] top-40 md:left-[54px] flex items-center bg-white gap-2 md:p-3 p-2 rounded-[8px] cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <img src={edit} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                    <p className="text-[12px] font-bold text-[#2D2E2E]">
                      Edit Photo
                    </p>
                  </div>

                  <div className="flex flex-col gap-[17px] w-full md:w-[236px]">
                    <div>
                      <p className="md:text-[24px] text-[20px] font-semibold text-[#2D2E2E]">
                        {formData.name || "Tidoy User"}
                      </p>
                      <p className="text-[#595A5B] font-normal md:text-[20px]">
                        {formData.email}
                      </p>
                    </div>

                    <div className="flex justify-between py-3 px-2 rounded-[8px] bg-white">
                      <div className="flex gap-2 items-center">
                        <img src={verify} alt="" />
                        <p className="text-[12px] text-[#2D2E2E]">Tier Gold</p>
                      </div>
                      <p className="text-[12px] font-bold text-[#FF9A01]">
                        500 Points
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                <form className="flex flex-col gap-6" onSubmit={handleSave}>
                  {/* Email */}
                  <div className="md:w-[582px] w-full flex flex-col gap-[8px]">
                    <label className="font-medium text-[14px] text-[#2D2E2E]">
                      Email
                    </label>
                    <div className="flex justify-between border border-[#C3C7CA] py-3 px-2 bg-white rounded-[12px]">
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                        className="w-full text-[16px] text-[#2D2E2E] font-medium outline-none bg-transparent"
                      />
                      <img src={edit} alt="" />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="md:w-[582px] w-full flex flex-col gap-[8px]">
                    <label className="font-medium text-[14px] text-[#2D2E2E]">
                      Fullname
                    </label>
                    <div className="flex justify-between border border-[#C3C7CA] py-3 px-2 bg-white rounded-[12px]">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tidoy User"
                        className="w-full text-[16px] text-[#2D2E2E] font-medium outline-none bg-transparent"
                      />
                      <img src={edit} alt="" />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="md:w-[582px] w-full flex flex-col gap-[8px]">
                    <label className="font-medium text-[14px] text-[#2D2E2E]">
                      Gender
                    </label>
                    <div className="flex justify-between border border-[#C3C7CA] py-3 px-2 bg-white rounded-[12px]">
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full text-[16px] text-[#2D2E2E] font-medium outline-none bg-transparent appearance-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <img src={down} alt="" className="pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="md:w-[582px] w-full flex flex-col gap-[8px]">
                    <label className="font-medium text-[14px] text-[#2D2E2E]">
                      Phone Number
                    </label>
                    <div className="flex justify-between border border-[#C3C7CA] py-3 px-2 bg-white rounded-[12px]">
                      <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="+23410345678"
                        className="w-full text-[16px] text-[#2D2E2E] font-medium outline-none bg-transparent"
                      />
                      <img src={edit} alt="" />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row gap-2.5 items-center">
                    <button
                      type="button"
                      className="w-full md:w-auto py-4 px-[39px] rounded-[16px] bg-white border border-[#DCE0E4] text-sm sm:text-base"
                      onClick={() =>
                        setFormData({
                          name: user.name || "",
                          email: user.email || "",
                          gender: user.gender || "",
                          number: user.number || "",
                        })
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full md:w-auto py-[14px] px-[36px] rounded-[16px] bg-[#FF9A01] text-[18px] font-medium text-[#2D2E2E]"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
