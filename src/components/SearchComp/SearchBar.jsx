import React, { useContext, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { useProperties } from "../../contexts/PropertiesContext";
import { useFilter } from "../../contexts/DateContext";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import toast from "react-hot-toast";
import close from "../../assets/close.png";
const SearchBar = () => {
  const navigate = useNavigate();
  const { setFilters } = useProperties(); // ✅ bring in setFilters
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestCount,
    setGuestCount,
    updateGuestCount,
    apartmentType,
    setApartmentType,
    getMaxGuests,
  } = useFilter();

  const { adults, children, infants } = guestCount;
  const totalGuests = adults + children;
  const maxGuests = getMaxGuests();

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [iconArrow, setIconArrow] = useState(false);
  const [apartmentArrow, setApartmentArrow] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState("checkIn");
  const [suggestions, setSuggestions] = useState([]);

  const [apartmentList, setApartmentList] = useState([
    "Villa",
    "House",
    "Hotel",
    "Apartment",
    "...",
  ]);

  const lagosAreas = [
    "Ikeja",
    "Lekki",
    "Victoria Island",
    "Ikoyi",
    "Surulere",
    "Yaba",
    "Maryland",
    "Ajah",
    "Magodo",
    "Ojodu",
  ];

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.trim().length > 0) {
      const filtered = lagosAreas.filter((area) =>
        area.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectLocation = (area) => {
    setLocation(area);
    setSuggestions([]); // close dropdown
  };

  const handleApartmentSelect = (apartment) => {
    setApartmentType(apartment === "..." ? "" : apartment);

    // Reset guest count on change
    setGuestCount({
      adults: 0,
      children: 0,
      infants: 0,
    });

    setApartmentArrow(false);
  };

  // const increment = (type) => {
  //   updateGuestCount(type, "increment");
  // };

  const increment = (type) => {
    if (type !== "infants" && totalGuests >= maxGuests) {
      toast.error(
        `You can only add up to ${maxGuests} guests for ${
          apartmentType || "this apartment"
        }`
      );
      return;
    }
    if (type === "infants" && guestCount.infants >= 5) {
      toast.error("Maximum 5 infants allowed");
      return;
    }
    updateGuestCount(type, "increment");
  };

  const decrement = (type) => {
    updateGuestCount(type, "decrement");
  };

  const handleDateSelect = (date) => {
    if (activeTab === "checkIn") {
      setCheckInDate(date);
      setCheckOutDate(null); // reset checkout if new checkin
      setActiveTab("checkOut");
    } else if (activeTab === "checkOut") {
      if (checkInDate && date <= checkInDate) {
        toast.error("Check-out must be after check-in");
        return;
      }
      setCheckOutDate(date);
      setShowCalendar(false); // close after selecting both dates
      setActiveTab("checkIn"); // reset for next time
    }
  };

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      area: location,
      propertyType: apartmentType || "any",
      checkInDate,
      checkOutDate,
      guestCount, // ✅ use global guestCount
    }));

    navigate("/search-result");
  };

  // ✅ Clear button handler
  const handleClear = () => {
    if (activeTab === "checkIn") {
      setCheckInDate(null);
    } else {
      setCheckOutDate(null);
    }
    setShowCalendar(false); // close modal
  };

  // ✅ Done button handler
  const handleDone = () => {
    // Make sure checkout is not before checkin
    if (activeTab === "checkOut" && checkInDate && checkOutDate < checkInDate) {
      toast.error("Check-out date cannot be before Check-in date");
      return;
    }

    setShowCalendar(false); // close modal
  };

  return (
    <div>
      <div className="hidden md:flex bg-[#DCE0E4] w-full  items-end justify-between gap-[23px] p-[15px] rounded-[20px] relative">
        <div className="min-w-0  flex gap-[13px]">
          <div className="space-y-[11px] w-[232px]">
            <p className="text-[#2D2E2E] font-medium text-[16px] ">Location</p>
            <div className="px-3 py-2 bg-[#FFFFFF] flex items-center rounded-[12px] gap-1">
              <MdOutlineLocationOn className="text-2xl text-[#747677] " />

              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={handleLocationChange}
                className="w-full font-normal placeholder:text-[#747677] placeholder:text-[16px]  outline-none  "
              />
            </div>

            {/* ✅ Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul
                className="shadow-md py-3  flex flex-col gap-1 items-start text-sm font-light 
      absolute top-[95px] left-4 w-[210px] bg-white rounded-md text-start z-10"
              >
                {suggestions.map((area, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectLocation(area)}
                    className="px-4 py-2 text-[16px]  hover:bg-gray-300 w-full cursor-pointer"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            )}

            
          </div>

          <div className="space-y-[11px] w-[158px] relative">
            <p className="text-[#2D2E2E] font-medium text-[16px] ">Check-in</p>
            <div
              onClick={() => {
                setShowCalendar(true);
                setActiveTab("checkIn");
              }}
              className="py-2 px-3 bg-[#FFFFFF] flex items-center  rounded-[12px] gap-1"
            >
              <MdOutlineCalendarMonth className="text-2xl text-[#747677] " />

              <input
                type="text"
                readOnly
                value={checkInDate ? checkInDate.toLocaleDateString() : ""}
                placeholder="Select date"
                className="w-full font-normal placeholder:text-[#747677] placeholder:text-[16px]  outline-none  "
              />
            </div>
          </div>

          <div className="space-y-[11px] w-[158px] relative">
            <p className="text-[#2D2E2E] font-medium text-[16px] ">Check-out</p>
            <div
              onClick={() => {
                setShowCalendar(true);
                setActiveTab("checkOut");
              }}
              className="p-2 bg-[#FFFFFF] flex items-center  rounded-[12px] gap-1 "
            >
              <MdOutlineCalendarMonth className="text-2xl text-[#747677] " />
              <input
                type="text"
                readOnly
                value={checkOutDate ? checkOutDate.toLocaleDateString() : ""}
                // onChange={(e) => setCheckOut(e.target.value)}
                placeholder="Select date"
                className="w-full font-normal placeholder:text-[#747677] placeholder:text-[16px]  outline-none  "
              />
            </div>
          </div>

          <div className="space-y-[11px] w-[258px] relative cursor-pointer">
            <p className="text-[#2D2E2E] font-medium text-[16px] ">
              Apartment Type
            </p>
            <div
              onClick={() => {
                setApartmentArrow(!apartmentArrow);
              }}
              className="py-2 px-3 bg-[#FFFFFF] flex items-center  rounded-[12px] gap-1"
            >
              <MdOutlineMapsHomeWork className="text-2xl text-[#747677] " />

              <input
                type="text"
                value={apartmentType}
                readOnly
                placeholder="Select apartment"
                className="w-full font-normal  placeholder:text-[#747677] placeholder:text-[16px]  outline-none  "
              />
              <MdKeyboardArrowDown
                className={`transform ${
                  apartmentArrow ? "rotate-0" : "rotate-180"
                } transition-transform duration-500 ease-in-out  text-2xl text-[#747677] `}
              />
            </div>

            {apartmentArrow && (
              <ul
                className="shadow-md py-3  flex flex-col gap-1 items-start text-sm font-light 
      absolute top-20 left-0 w-[238px] bg-white rounded-md text-start z-10"
              >
                {apartmentList.map((apartment, idx) => {
                  return (
                    <li
                      key={idx}
                      onClick={() => handleApartmentSelect(apartment)}
                      className="cursor-pointer sm:text-[16px] text-[12px]  px-5 py-1.5 hover:bg-gray-300 w-full"
                    >
                      {apartment}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="space-y-[11px] w-[198px] relative">
            <p className="text-[#2D2E2E] font-medium text-[16px] ">Person(s)</p>

            <div
              onClick={() => {
                setIconArrow(!iconArrow);
              }}
              className="py-2 px-3 bg-[#FFFFFF] flex items-center  rounded-[12px] gap-1"
            >
              <MdOutlineGroups className="text-2xl text-[#747677] " />

              <input
                type="text"
                value={
                  totalGuests > 0
                    ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                    : ""
                }
                // onChange={(e) => setGuests(e.target.value)}
                readOnly
                placeholder="Select number "
                className="w-full font-normal placeholder:text-[#747677] placeholder:text-[16px]  outline-none  "
              />
              <MdKeyboardArrowDown
                className={`transform ${
                  iconArrow ? "rotate-0" : "rotate-180"
                } transition-transform duration-500 ease-in-out text-2xl text-[#747677]`}
              />
            </div>

            {iconArrow && (
              <div className="absolute top-20 left-0 w-[185px] bg-white shadow-md rounded-md p-3 z-10 space-y-6">
                {["adults", "children", "infants"].map((type) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="capitalize">{type}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrement(type)}
                        disabled={guestCount[type] <= 0}
                        className="px-2 py-[1px] rounded-3xl border disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="text-[16px]">{guestCount[type]}</span>
                      <button
                        onClick={() => increment(type)}
                        // disabled={
                        //   type !== "infants" && totalGuests >= maxGuests
                        // }
                        className="px-2 py-[1px] rounded-3xl border disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Calendar Modal */}
        {showCalendar && (
          <div className="fixed inset-0 z-50 backdrop-blur-sm bg-[#2D2E2ECC] flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 relative">
              <div className="flex items-center justify-between my-4">
                <h2 className="text-lg font-bold text-center">
                  When’s your trip?
                </h2>

                <img
                  src={close}
                  alt=""
                  onClick={() => setShowCalendar(false)}
                  className=" text-gray-500 hover:text-black text-lg"
                />
              </div>

              <h2 className="text-lg font-bold text-[#2D2E2E] mb-4 text-center">
                {activeTab === "checkIn"
                  ? "Select Check-in Date"
                  : "Select Check-out Date"}
              </h2>

              <Calendar
                onChange={handleDateSelect}
                value={activeTab === "checkIn" ? checkInDate : checkOutDate}
                minDate={
                  activeTab === "checkOut" && checkInDate
                    ? checkInDate
                    : new Date()
                }
                className="rounded-xl p-2 text-[16px]"
              />

              <footer className="flex items-center mt-[80px] justify-between">
                <button
                  className="w-[200.5px] border py-3 rounded-xl font-bold text-[#2D2E2E] text-[16px] border-[#DCE0E4]"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  onClick={handleDone}
                  className="py-3 rounded-xl w-[200.5px] bg-[#FF9A01] text-[16px] text-[#FFFFFF] font-bold"
                >
                  Done
                </button>
              </footer>
            </div>
          </div>
        )}

        <button
          onClick={handleSearch}
          className=" w-[132px] bg-[#FF9A01] rounded-[16px] text-[#2D2E2E] text-[18px] font-medium h-[48px] "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
