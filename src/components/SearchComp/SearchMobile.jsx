import React, { useEffect, useState } from "react";
import {
  MdOutlineLocationOn,
  MdOutlineCalendarMonth,
  MdOutlineGroups,
  MdOutlineMapsHomeWork,
  MdKeyboardArrowDown,
} from "react-icons/md";
import close from "../../assets/close.png";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../contexts/DateContext";
import { useProperties } from "../../contexts/PropertiesContext";
import Calendar from "react-calendar";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";

const apartmentList = ["Villa", "House", "Hotel", "Apartment"];

const SearchMobile = ({ onClose }) => {
  const navigate = useNavigate();
  const { setFilters, resetFilters, allUniqueAreas = [] } = useProperties();
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    apartmentType,
    setApartmentType,
    guestCount,
    setGuestCount,
    updateGuestCount,
    getMaxGuests,
  } = useFilter();

  // Local UI state
  const [area, setArea] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerTab, setDatePickerTab] = useState("checkIn");
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showApartmentModal, setShowApartmentModal] = useState(false);

  // Derived values
  const totalGuests =
    (guestCount?.adults || 0) +
    (guestCount?.children || 0) +
    (guestCount?.infants || 0);

  // Suggestions for location input
  useEffect(() => {
    if (!area) setSuggestions([]);
    else {
      const arr = allUniqueAreas.length ? allUniqueAreas : [];
      const filtered = arr.filter((a) =>
        a?.toLowerCase().includes(area.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    }
  }, [area, allUniqueAreas]);

  const handleLocationChange = (e) => {
    setArea(e.target.value);
  };

  const selectSuggestion = (val) => {
    setArea(val);
    setSuggestions([]);
  };

  const openCalendar = (tab) => {
    setDatePickerTab(tab);
    setShowDatePicker(true);
  };

  const handleDateSelect = (date) => {
    if (datePickerTab === "checkIn") {
      setCheckInDate(date);
      setDatePickerTab("checkOut");
    } else {
      if (checkInDate && date <= checkInDate) {
        setCheckOutDate(null);
        return;
      }
      setCheckOutDate(date);
      setShowDatePicker(false);
      setDatePickerTab("checkIn");
    }
  };

  const handleClear = () => {
    resetFilters();
    setCheckInDate(null);
    setCheckOutDate(null);
    setApartmentType("");
    setGuestCount({ adults: 0, children: 0, infants: 0 });
    setArea("");
    setSuggestions([]);
  };

  const handleDone = (type) => {
    if (type === "guests") {
      const maxGuests = getMaxGuests(apartmentType);
      const total = (guestCount.adults || 0) + (guestCount.children || 0);

      if (apartmentType && total > maxGuests) {
        toast.error(`Max ${maxGuests} guests allowed for ${apartmentType}`);
        return; // don’t close
      }
      setShowGuestsModal(false);
    }

    if (type === "apartment") {
      if (!apartmentType) {
        toast.error("Please select an apartment type");
        return;
      }
      setShowApartmentModal(false);
    }

    if (type === "date") {
      if (!checkInDate || !checkOutDate) {
        toast.error("Please select both check-in and check-out dates");
        return;
      }
      setShowDatePicker(false);
    }
  };

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      area: area || prev.area,
      propertyType: apartmentType || prev.propertyType,
    }));
    onClose && onClose();
    navigate("/search-result");
  };

  // Date Picker Modal
  const DatePickerModal = () =>
    showDatePicker &&
    createPortal(
      <div className="fixed inset-0 z-[1000] flex items-end">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowDatePicker(false)}
        />

        {/* Modal content */}
        <div className="relative bg-white rounded-t-2xl p-6 w-full max-w-md mx-auto animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              {datePickerTab === "checkIn"
                ? "Select check-in"
                : "Select check-out"}
            </h3>
            <button
              onClick={() => setShowDatePicker(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
          </div>

          <Calendar
            onClickDay={handleDateSelect}
            value={datePickerTab === "checkIn" ? checkInDate : checkOutDate}
            minDate={new Date()}
          />

          <div className="flex items-center mt-8 gap-6">
            <button
              onClick={handleClear}
              className="w-1/2 border py-3 rounded-xl font-bold text-[#2D2E2E] border-[#DCE0E4]"
            >
              Clear
            </button>
            <button
              onClick={() => handleDone("date")}
              className="w-1/2 py-3 rounded-xl bg-[#FF9A01] text-white font-bold"
            >
              Done
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  // Guests Modal
  const GuestsModal = () =>
    showGuestsModal &&
    createPortal(
      <div className="fixed inset-0 z-[1000] flex items-end">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowGuestsModal(false)}
        />

        {/* Modal content */}
        <div className="relative bg-white rounded-t-2xl p-6 w-full max-w-md mx-auto animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Guests</h3>
            <button
              onClick={() => setShowGuestsModal(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
          </div>

          {/* guest options */}
          {["adults", "children", "infants"].map((type) => (
            <div key={type} className="flex items-center justify-between py-5 ">
              <span className="capitalize">{type}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateGuestCount(type, "decrement")}
                  disabled={guestCount[type] <= 0}
                  className="w-8 h-8 flex items-center justify-center border rounded-full disabled:opacity-40"
                >
                  -
                </button>
                <span>{guestCount[type]}</span>
                <button
                  onClick={() => updateGuestCount(type, "increment")}
                  className="w-8 h-8 flex items-center justify-center border rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center mt-[50px] gap-6">
            <button
              className="w-[159.5px] border py-3 rounded-xl font-bold text-[#2D2E2E] text-[16px] border-[#DCE0E4]"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              onClick={() => handleDone("guests")}
              className="py-3 rounded-xl w-[159.5px] bg-[#FF9A01] text-[16px] text-[#FFFFFF] font-bold"
            >
              Done
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  // Apartment Modal
  const ApartmentModal = () =>
    showApartmentModal &&
    createPortal(
      <div className="fixed inset-0 z-[1000] flex items-end">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowApartmentModal(false)}
        />

        {/* Modal content */}
        <div className="relative bg-white rounded-t-2xl p-6 w-full max-w-md mx-auto animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Apartment Type</h3>
            <button
              onClick={() => setShowApartmentModal(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
          </div>

          <ul className="">
            {apartmentList.map((a) => (
              <li
                key={a}
                onClick={() => {
                  setApartmentType(a);
                  setGuestCount({ adults: 0, children: 0, infants: 0 }); // reset guests
                }}
                className={`py-3 px-2 cursor-pointer hover:bg-gray-100 ${
                  apartmentType === a ? "font-semibold text-[#FF9A01]" : ""
                }`}
              >
                {a}
              </li>
            ))}
          </ul>

          <div className="flex items-center mt-8 gap-6">
            <button
              onClick={handleClear}
              className="w-1/2 border py-3 rounded-xl font-bold text-[#2D2E2E] border-[#DCE0E4]"
            >
              Clear
            </button>
            <button
              onClick={() => handleDone("apartment")}
              className="w-1/2 py-3 rounded-xl bg-[#FF9A01] text-white font-bold"
            >
              Done
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="md:hidden fixed inset-0 bg-[#2D2E2ECC] z-20 flex justify-center">
      <div className="bg-white w-full h-screen rounded-t-[16px] relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <img src={close} alt="close" className="w-4 h-4" />
        </button>

        {/* Search form */}
        <div className="p-6 flex flex-col gap-8 mt-10">
          {/* Location */}
          <div>
            <p className="text-gray-700 text-sm mb-1">Where</p>
            <div className="px-3 py-3 bg-gray-100 rounded-xl flex items-center gap-2">
              <MdOutlineLocationOn className="text-xl text-gray-500" />
              <input
                type="text"
                value={area}
                onChange={handleLocationChange}
                placeholder="Search destinations"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            {suggestions.length > 0 && (
              <ul className="bg-white mt-2 border rounded-md shadow max-h-44 overflow-auto z-30">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => selectSuggestion(s)}
                    className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <MdOutlineLocationOn className="text-gray-500 text-lg" />
                    <span className="text-sm text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dates */}
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-gray-700 text-sm mb-1">Check-in</p>
              <button
                onClick={() => openCalendar("checkIn")}
                className="w-full text-left px-3 py-3 bg-gray-100 rounded-xl flex items-center gap-2"
              >
                <MdOutlineCalendarMonth className="text-gray-500" />
                <span className="text-sm">
                  {checkInDate ? checkInDate.toLocaleDateString() : "Add date"}
                </span>
              </button>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm mb-1">Check-out</p>
              <button
                onClick={() => openCalendar("checkOut")}
                className="w-full text-left px-3 py-3 bg-gray-100 rounded-xl flex items-center gap-2"
              >
                <MdOutlineCalendarMonth className="text-gray-500" />
                <span className="text-sm">
                  {checkOutDate
                    ? checkOutDate.toLocaleDateString()
                    : "Add date"}
                </span>
              </button>
            </div>
          </div>

          {/* Guests */}
          <div>
            <p className="text-gray-700 text-sm mb-1">Who</p>
            <button
              onClick={() => setShowGuestsModal(true)}
              className="w-full text-left px-3 py-3 bg-gray-100 rounded-xl flex items-center gap-2"
            >
              <MdOutlineGroups className="text-xl text-gray-500" />
              <span className="text-sm">
                {totalGuests > 0
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                  : "Add guests"}
              </span>
            </button>
          </div>

          {/* Apartment type */}
          <div>
            <p className="text-gray-700 text-sm mb-1">Apartment Type</p>
            <button
              onClick={() => setShowApartmentModal(true)}
              className="w-full text-left px-3 py-3 bg-gray-100 rounded-xl flex items-center gap-2"
            >
              <MdOutlineMapsHomeWork className="text-xl text-gray-500" />
              <span className="text-sm">{apartmentType || "Select type"}</span>
              <MdKeyboardArrowDown className="text-xl text-gray-500 ml-auto" />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-12">
            <button
              onClick={handleClear}
              className="w-full py-3 border border-[#DCE0E4] rounded-xl text-[#2D2E2E] font-semibold text-base"
            >
              Clear
            </button>
            <button
              onClick={handleSearch}
              className="w-full py-3 bg-[#FF9A01] rounded-xl text-white font-semibold text-base"
            >
              Search
            </button>
          </div>
        </div>

        {/* Render Modals */}
        <DatePickerModal />
        <GuestsModal />
        <ApartmentModal />
      </div>
    </div>
  );
};

export default SearchMobile;
