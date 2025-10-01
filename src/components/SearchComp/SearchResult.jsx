import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import verified from "../../assets/verified.png";
import star from "../../assets/star_purple500.png";
import bed from "../../assets/bed.png";
import bath from "../../assets/bathtub.png";
import square from "../../assets/aspect_ratio.png";
import park from "../../assets/local_parking.png";
import { useProperties } from "../../contexts/PropertiesContext";

const SearchResult = () => {
  const navigate = useNavigate();

  const {
    properties,
    filters,
    setFilters,
    handleApplyFilters,
    resetFilters,
    isLoading,
  } = useProperties();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="px-4 md:px-[100px] mt-20 flex flex-col">
      {/* ================== TOP SECTION ================== */}
      <div>
       <div className="flex sm:flex-row justify-between sm:items-center mt-6 gap-3">
    <div>
      <p className="font-bold text-gray-800">{filters.area || "Lagos, Nigeria"}</p>
      <p className="text-sm text-gray-500">
        {filters.checkInDate && filters.checkOutDate
          ? `${filters.checkInDate.getDate()}–${filters.checkOutDate.getDate()} ${filters.checkOutDate.toLocaleString("en-US", { month: "short" })} • ${
              filters.guestCount.adults + filters.guestCount.children
            } guest${filters.guestCount.adults + filters.guestCount.children > 1 ? "s" : ""}`
          : "Select dates • 1 guest"}
      </p>
    </div>
    <button
      className="px-4 py-2 text-sm font-semibold border rounded-lg hover:bg-gray-100"
      onClick={() => navigate("/")}
    >
      Change
    </button>
  </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide mb-2">
          {[
            { label: "All", value: "" },
            { label: "Recommended", value: "recommended" },
            { label: "Popular", value: "popular" },
            { label: "Best Price", value: "bestPrice" },
          ].map((item) => (
            <p
              key={item.value}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  category: prev.category === item.value ? "" : item.value,
                }))
              }
              className={`px-4 py-2 border text-xs sm:text-sm rounded-3xl text-[#2D2E2E] border-[#DCE0E4] text-center cursor-pointer whitespace-nowrap
                ${filters.category === item.value ? "bg-[#EDF1F5]" : ""}`}
            >
              {item.label}
            </p>
          ))}

          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 border rounded-full text-xs sm:text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
          >
            Filters
          </button>
        </div>
      </div>

      {/* ================== MAIN CONTENT ================== */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE - PROPERTY LIST */}
        <div className=" lg:grid grid-cols-2 flex flex-col  gap-6 flex-1">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property._id}
                className="flex flex-col md:flex-row bg-[#EDF1F5] p-3 gap-3 rounded-2xl w-full"
              >
                {/* PROPERTY IMAGE */}
                <img
                  src={
                    Array.isArray(property.images)
                      ? property.images[0]
                      : property.images
                  }
                  alt={property.title || "Property"}
                  className="w-full md:w-1/2 h-56 md:h-80 object-cover rounded-xl"
                />

                {/* PROPERTY DETAILS */}
                <div className="flex flex-col justify-between flex-1 gap-3">
                  {/* Top Section */}
                  <div className="flex items-center justify-between">
                    <img
                      src={verified}
                      alt="verified"
                      className="w-20 md:w-24 h-auto"
                    />

                    <div className="flex gap-2 items-center">
                      <img src={star} alt="rating" className="w-4 h-4" />
                      <p className="font-bold text-xs md:text-sm text-[#000000]">
                        {property.score || "No rating"} ({property.reviewCount})
                      </p>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h6 className="font-bold text-base md:text-lg text-[#2D2E2E] leading-snug">
                      {property.title}
                    </h6>
                    <p className="text-sm md:text-base text-[#595A5B]">
                      {property.area}, {property.city}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-1 items-center">
                      <img src={bed} alt="bed" className="w-4 h-4" />
                      <p className="text-xs md:text-sm text-[#595A5B]">
                        {property.bedrooms} bedrooms
                      </p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <img src={bath} alt="bath" className="w-4 h-4" />
                      <p className="text-xs md:text-sm text-[#595A5B]">
                        {property.bathrooms} Bathrooms
                      </p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <img src={square} alt="size" className="w-4 h-4" />
                      <p className="text-xs md:text-sm text-[#595A5B]">
                        {property.size || "—"} sqm
                      </p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <img src={park} alt="parking" className="w-4 h-4" />
                      <p className="text-xs md:text-sm text-[#595A5B]">
                        {property.parking ? "Parking: Yes" : "Parking: No"}
                      </p>
                    </div>
                  </div>

                  {/* Price & Favorite */}
                  <div className="flex justify-between items-center">
                    <p className="text-[#2D2E2E] text-sm md:text-lg font-bold">
                      NGN {property.pricePerNight}/night
                    </p>
                    <IoMdHeart className="text-lg md:text-xl text-[#ED1F4F]" />
                  </div>

                  {/* View Now Button */}
                  <button
                    onClick={() => navigate(`/product-detail/${property._id}`)}
                    className="bg-[#FF9A01] px-4 md:px-8 py-2 font-medium text-xs md:text-sm text-[#2D2E2E] rounded-lg w-full md:w-auto"
                  >
                    View Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-base md:text-lg font-medium mt-6">
              No properties found.
            </p>
          )}
        </div>

        {/* RIGHT SIDE - MAP PLACEHOLDER */}
        {/* <div className="hidden lg:block w-1/2 sticky top-20 h-[80vh]">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
            [Map Placeholder]
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SearchResult;
