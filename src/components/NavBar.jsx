import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import profile from "../assets/profilepic.png";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import SearchMobile from "../components/SearchComp/SearchMobile";
import { AuthContext } from "../contexts/AuthContext";
import { useProperties } from "../contexts/PropertiesContext";

const NavBar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const { allUniqueAreas, setArea } = useProperties();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.trim().length > 0) {
      const filtered = allUniqueAreas.filter((area) =>
        area.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (area) => {
    setLocation(area);
    setSuggestions([]);
    setArea(area);
    navigate("/search-result");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && location.trim() !== "") {
      setArea(location);
      navigate("/search-result");
    }
  };

  return (
    <div className="w-full ">
      {/* Desktop */}
      <div className=" hidden md:flex  items-center justify-between py-[18px]  ">
        <div className="flex items-center gap-[41px] max-w-[497px]">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="flex items-center gap-[35px]">
            <Link
              to="/search-results"
              className="text-[18px] text-[#2D2E2E] font-medium tracking-tighter "
            >
              Discover
            </Link>
            <Link className="text-[18px] text-[#2D2E2E] font-medium tracking-tighter">
              Stay
            </Link>
            <Link className="text-[18px] text-[#2D2E2E] font-medium tracking-tighter">
              About
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#EDF1F5] w-[322px] rounded-[24px]">
            <input
              type="text"
              onChange={handleLocationChange}
              onKeyDown={handleKeyDown}
              value={location}
              placeholder="Where are you going?"
              className="flex-1 bg-transparent font-medium placeholder:text-[#A6A9AC] placeholder:text-[14px] outline-none"
            />
            <IoMdSearch
              className="text-[#A6A9AC] cursor-pointer"
              onClick={() => {
                if (location.trim() !== "") {
                  setArea(location);
                  navigate("/search-results");
                }
              }}
            />
          </div>

          {suggestions.length > 0 && (
            <ul
              className="shadow-md py-3 flex flex-col gap-1 items-start text-sm font-light 
               absolute top-[53px] left-4 w-[300px] bg-white rounded-md text-start z-10"
            >
              {suggestions.map((area, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelectLocation(area)}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-300 w-full cursor-pointer"
                >
                  <MdOutlineLocationOn className="text-gray-500 text-lg" />
                  <span className="text-[16px]">{area}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-[#FF9A01] rounded-full animate-spin"></div>
          ) : !user ? (
            <>
              <Link to="/sign-up">
                <button className="text-[#2D2E2E] text-[18px] font-medium bg-[#FF9A01] px-9 py-2.5 rounded-[16px]">
                  Sign Up
                </button>
              </Link>
              <Link to="/sign-in">
                <button className="text-[#2D2E2E] text-[18px] font-medium px-[29px] bg-white py-2.5 rounded-[16px]">
                  Sign In
                </button>
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photo || profile}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2  bg-white border rounded-lg shadow-md w-40">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="w-full">
        <div className="flex md:hidden justify-between items-center w-full py-5 ">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-[100px]" />
          </Link>

          <div
            onClick={() => setShowMobileSearch(true)}
            className="flex items-center p-2 mr-2 bg-[#EDF1F5] w-[150px] justify-between rounded-[24px]"
          >
            <span className="text-[10px] text-[#A6A9AC]">
              Where are you going?
            </span>
            <IoMdSearch className="text-[#A6A9AC] text-sm" />
          </div>

          {loading ? (
            <div className="w-6 h-6 border-2 border-gray-300 border-t-[#FF9A01] rounded-full animate-spin"></div>
          ) : user ? (
            <div className="relative group">
              <img
                src={user.photo || profile}
                alt="profile"
                className="w-9 h-9 rounded-full border cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-40">
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <IoCloseOutline size={28} />
              ) : (
                <IoMenuOutline size={28} />
              )}
            </button>
          )}
        </div>

        {menuOpen && !user && !loading && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-6 py-5 font-medium">
              <Link
                to="/search-results"
                className="hover:text-[#1A4D8F]"
                onClick={() => setMenuOpen(false)}
              >
                Discover
              </Link>
              <Link
                to="/stay"
                className="hover:text-[#1A4D8F]"
                onClick={() => setMenuOpen(false)}
              >
                Stay
              </Link>
              <Link
                to="/about"
                className="hover:text-[#1A4D8F]"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <Link to="/sign-up" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-[#2D2E2E] text-[16px] font-medium bg-[#FF9A01] px-6 py-2 rounded-[12px]">
                  Sign Up
                </button>
              </Link>
              <Link to="/sign-in" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-[#2D2E2E] text-[16px] font-medium bg-white px-6 py-2 rounded-[12px] border">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {showMobileSearch && (
        <SearchMobile onClose={() => setShowMobileSearch(false)} />
      )}
    </div>
  );
};

export default NavBar;
