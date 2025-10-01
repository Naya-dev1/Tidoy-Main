import React, { useState } from "react";
import { IoMdSearch, IoMdMenu, IoMdClose } from "react-icons/io";
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
import logout from "../../assets/logout.png";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Dropdown Menu for Mobile Navbar
  const MenuDropdown = () =>
    isMenuOpen &&
    createPortal(
      <div className="fixed inset-0 z-[1000] bg-black/50 flex flex-col pointer-events-auto">
        <div className="bg-white w-full p-4 rounded-t-[16px] max-h-[80%] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Logo" className="w-[120px] h-auto" />
            </Link>
            <button onClick={toggleMenu} className="p-2">
              <IoMdClose className="w-6 h-6 text-[#2D2E2E]" aria-label="Close menu" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Where are you going?"
                className="w-full border h-9 rounded-full pl-4 pr-10 bg-[#EDF1F5] text-sm text-[#A6A9AC] outline-none"
              />
              <IoMdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6A9AC]" />
            </div>
            <div className="flex flex-col gap-4 text-base">
              <Link to="/discover" onClick={() => setIsMenuOpen(false)}>
                Discover
              </Link>
              <Link to="/stay" onClick={() => setIsMenuOpen(false)}>
                Stay
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-[#DCE0E4]">
              <img src={profile} alt="Profile" className="w-8 h-8" />
              <p className="text-sm">Profile</p>
              <img src={drop} alt="Dropdown" className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-[100px] min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between mt-4 mb-6">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[120px] sm:w-[186.08px] h-auto" />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex gap-6 text-base">
            <Link to="/discover">Discover</Link>
            <Link to="/stay">Stay</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="relative w-[260px]">
            <input
              type="search"
              placeholder="Where are you going?"
              className="w-full h-10 rounded-full pl-4 pr-10 bg-[#EDF1F5] text-sm text-[#A6A9AC] outline-none"
            />
            <IoMdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6A9AC]" />
          </div>
          <div className="flex items-center gap-2">
            <img src={profile} alt="Profile" className="w-10 h-10" />
            <img src={drop} alt="Dropdown" className="w-5 h-5" />
          </div>
        </div>
        {/* Mobile Hamburger */}
        <button className="sm:hidden p-2" onClick={() => { console.log("Hamburger clicked"); toggleMenu(); }}>
          <IoMdMenu className="w-6 h-6 text-[#2D2E2E]" aria-label="Open menu" />
        </button>
      </nav>

      {/* Dropdown */}
      <MenuDropdown />

      {/* Profile Content */}
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#000000] my-6 sm:my-8">
          Profile
        </h2>

        <div className="flex flex-col lg:flex-row lg:gap-11 items-start">
          {/* Left Sidebar */}
          <div className="w-full lg:w-[356px] mb-6 lg:mb-0">
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => { console.log("Sidebar toggle clicked"); toggleSidebar(); }}
              className="sm:hidden flex items-center gap-2 py-4 px-4 rounded-lg bg-[#FFEBCC] border border-[#FFDDAA] w-full mb-2"
            >
              <IoMdMenu className="w-6 h-6 text-[#2D2E2E]" aria-label="Toggle sidebar" />
              <p className="text-sm">{isSidebarOpen ? "Hide Menu" : "Show Menu"}</p>
            </button>
            {/* Sidebar Content */}
            <div
              className={`flex flex-col gap-2 sm:gap-3 transition-all duration-300 ${
                isSidebarOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              } sm:max-h-none sm:opacity-100 sm:overflow-visible`}
            >
              <div className="flex gap-2 items-center py-4 px-4 rounded-lg w-full bg-[#FFEBCC] border border-[#FFDDAA]">
                <img src={profileIcon} alt="Edit Profile" className="w-6 h-6" />
                <p className="text-sm sm:text-base">Edit Profile</p>
              </div>
              <div className="flex gap-2 items-center py-4 px-4 rounded-lg w-full">
                <img
                  src={language}
                  alt="Language"
                  className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-full w-8 h-8"
                />
                <p className="text-sm sm:text-base">Language</p>
              </div>
              <div className="flex gap-2 items-center py-4 px-4 rounded-lg w-full">
                <img
                  src={settings}
                  alt="Settings"
                  className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-full w-8 h-8"
                />
                <p className="text-sm sm:text-base">Settings</p>
              </div>
              <div className="flex gap-2 items-center py-4 px-4 rounded-lg w-full">
                <img
                  src={legal}
                  alt="Legal"
                  className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-full w-8 h-8"
                />
                <p className="text-sm sm:text-base">Legal & Privacy</p>
              </div>
              <div className="flex gap-2 items-center py-4 px-4 rounded-lg w-full">
                <img
                  src={help}
                  alt="Help"
                  className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-full w-8 h-8"
                />
                <p className="text-sm sm:text-base">Help & Support</p>
              </div>
              <div className="flex gap-2 items-center py-4 px-4 rounded-lg w-full">
                <img
                  src={logout}
                  alt="Logout"
                  className="bg-white shadow-[0_0_8px_0_#00000014] p-2 rounded-full w-8 h-8"
                />
                <p className="text-sm sm:text-base">Log Out</p>
              </div>
            </div>
          </div>

          {/* Divider (hidden on mobile) */}
          <div className="hidden lg:block w-px h-[300px] bg-[#2D2E2E] mx-4"></div>

          {/* Right Profile Section */}
          <div className="w-full lg:w-[820px] flex flex-col gap-6 sm:gap-8">
            {/* Profile Card */}
            <div className="bg-[#EDF1F5] rounded-xl relative flex flex-col sm:flex-row gap-6 sm:gap-9 px-6 sm:px-8 py-6 items-center">
              <div className="relative">
                <img
                  src={profile2}
                  alt="Profile"
                  className="w-[100px] sm:w-[159px] h-auto"
                />
                <div className="absolute bottom-2 left-4 sm:bottom-4 sm:left-5 flex items-center bg-white gap-2 p-2 sm:p-3 rounded-lg">
                  <img src={edit} alt="Edit Photo" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-xs sm:text-sm font-bold text-[#2D2E2E]">
                    Edit Photo
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full sm:w-[236px]">
                <div>
                  <p className="text-xl sm:text-2xl text-[#2D2E2E] font-semibold">
                    Jane Doe
                  </p>
                  <p className="text-[#595A5B] font-normal text-base sm:text-lg">
                    Janedoe@gmail.com
                  </p>
                </div>
                <div className="flex justify-between py-3 px-2 rounded-lg bg-white">
                  <div className="flex gap-2 items-center">
                    <img src={verify} alt="Verified" className="w-5 h-5" />
                    <p className="text-xs sm:text-sm text-[#2D2E2E]">
                      Tier Gold
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#FF9A01]">
                    500 Points
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form className="flex flex-col gap-6">
              <div className="space-y-4">
                {[
                  { label: "Email", placeholder: "Janedoe@gmail.com", icon: edit, id: "email" },
                  { label: "Fullname", placeholder: "Jane Doe", icon: edit, id: "fullname" },
                  { label: "Gender", placeholder: "Female", icon: down, id: "gender" },
                  { label: "Phone Number", placeholder: "+23410345678", icon: edit, id: "phone" },
                ].map(({ label, placeholder, icon, id }) => (
                  <div key={id} className="w-full max-w-[582px] flex flex-col gap-2">
                    <label htmlFor={id} className="font-medium text-sm sm:text-base text-[#2D2E2E]">
                      {label}
                    </label>
                    <div className="flex items-center justify-between border border-[#C3C7CA] py-3 px-3 bg-white rounded-lg">
                      <input
                        id={id}
                        type="text"
                        placeholder={placeholder}
                        className="w-full text-sm sm:text-base placeholder:text-[#2D2E2E] placeholder:font-medium outline-none"
                      />
                      <img src={icon} alt={label} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 items-center">
                <button
                  type="button"
                  className="w-full sm:w-auto py-3 sm:py-4 px-6 rounded-xl bg-white border border-[#DCE0E4] text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 sm:py-4 px-6 rounded-xl bg-[#FF9A01] text-sm sm:text-base font-medium text-[#2D2E2E]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;