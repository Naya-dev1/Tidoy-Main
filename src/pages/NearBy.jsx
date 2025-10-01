import React, { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import { MdArrowForwardIos } from "react-icons/md";
import near1 from "../assets/Rectangle 3.png";
import { IoMdHeart } from "react-icons/io";
import verified from "../assets/verified.png";
import star from "../assets/star_purple500.png";
import bed from "../assets/bed.png";
import bath from "../assets/bathtub.png";
import square from "../assets/aspect_ratio.png";
import park from "../assets/local_parking.png";
import { useHomeContext } from "../contexts/HomeContext";
import { useProperties } from "../contexts/PropertiesContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

const NearBy = () => {
  // const filters = [
  //   { label: "All" },
  //   { label: "Recommended" },
  //   { label: "Popular" },
  //   { label: "Best Price" },
  // ];
  const { data, loading, error } = useHomeContext();
  const { user } = useContext(AuthContext);

  const [userLocation, setUserLocation] = useState(null);
  const [nearbyProperties, setNearbyProperties] = useState([]);
  const navigate = useNavigate();

  const {
    properties,
    filters,
    setFilters,
    handleApplyFilters,
    resetFilters,
    isLoading,
  } = useProperties();

  useEffect(() => {
    // 1. Get user's location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(coords);
      },
      (err) => {
        console.error("Location access denied:", err);
      }
    );
  }, []);

  useEffect(() => {
    if (!userLocation || !data.length) return;

    // 1. Get all properties within 5km
    let filtered = data.filter((property) => {
      if (!property.location?.coordinates) return false;
      const [lng, lat] = property.location.coordinates;
      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        lat,
        lng
      );
      return distance <= 8;
    });

    setNearbyProperties(filtered);
  }, [userLocation, data, filters.category]);

  if (loading) return <p>Loading nearby...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleViewNow = (id) => {
    if (user) {
      navigate(`/product-detail/${id}`); // go to details if logged in
    } else {
      navigate("/sign-in"); // go to login if not logged in
    }
  };

  return (
    <div >
     <div className="z-50  backdrop-blur-[10px] bg-[#FBFBFB59]  fixed w-full top-0 sm:px-[100px] px-6 ">
        <NavBar />
      </div>
      <div className="md:px-[100px] px-6 pt-[120px]">
        <div className="flex items-center gap-[9px]">
          <p
            onClick={() => navigate("/")}
            className="md:text-[20px] text-[16px] text-[#858789] font-semibold cursor-pointer"
          >
            Home
          </p>
          <MdArrowForwardIos />
          <p className="text-[#2D2E2E] md:text-[20px] text-[16px] font-semibold">
            Nearby
          </p>
        </div>

        <div className="flex gap-2.5 mb-[26px] mt-[31px]">
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
              className={`py-2 border-[0.5px] rounded-3xl text-[10px] font-normal text-[#2D2E2E] border-[#DCE0E4] text-center cursor-pointer
        ${filters.category === item.value ? "bg-[#EDF1F5]" : ""} 
        ${
          item.label === "All"
            ? "w-[36px]"
            : item.label === "Recommended"
            ? "w-[94px]"
            : item.label === "Popular"
            ? "w-[60px]"
            : "w-[71px]"
        }`}
            >
              {item.label}
            </p>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {nearbyProperties.length > 0 ? (
            nearbyProperties.map((property) => (
              <div
                key={property._id}
                className="flex flex-col md:flex-row bg-[#EDF1F5] p-3 md:p-4 gap-3 rounded-[18px]"
              >
                {/* Image */}
                <img
                  src={
                    Array.isArray(property.images)
                      ? property.images[0]
                      : property.images
                  }
                  alt={property.title}
                  className="w-full md:w-[220px] h-[220px] md:h-[320px] object-cover rounded-[12px]"
                />

                {/* Info */}
                <div className="flex flex-col justify-between flex-1">
                  {/* Top */}
                  <div className="flex items-center justify-between mb-2">
                    <img
                      src={verified}
                      alt=""
                      className="w-[60px] md:w-[79px] h-[20px] md:h-[24px]"
                    />

                    <div className="flex gap-1.5 items-center">
                      <img src={star} alt="" className="w-4 h-4" />
                      <p className="font-bold text-xs md:text-sm text-[#000000]">
                        {property.score || "No rating"} ({property.reviewCount})
                      </p>
                    </div>
                  </div>

                  {/* Title + Location */}
                  <div className="mb-3">
                    <h6 className="font-bold text-base md:text-lg text-[#2D2E2E] leading-snug">
                      {property.title}
                    </h6>
                    <p className="text-sm md:text-base text-[#595A5B]">
                      {property.area}, {property.city}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex gap-1 items-center">
                      <img src={bed} alt="" className="w-4 h-4" />
                      <p className="text-sm text-[#595A5B]">
                        {property.bedrooms} bedrooms
                      </p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <img src={bath} alt="" className="w-4 h-4" />
                      <p className="text-sm text-[#595A5B]">
                        {property.bathrooms} Bathrooms
                      </p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <img src={square} alt="" className="w-4 h-4" />
                      <p className="text-sm text-[#595A5B]">
                        {property.size || "—"} sqm
                      </p>
                    </div>

                    <div className="flex gap-1 items-center">
                      <img src={park} alt="" className="w-4 h-4" />
                      <p className="text-sm text-[#595A5B]">
                        {property.parking ? "Parking: Yes" : "Parking: No"}
                      </p>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-[#2D2E2E] text-base md:text-lg font-bold">
                      NGN {property.pricePerNight}/night
                    </p>
                    <IoMdHeart className="text-lg md:text-xl text-[#ED1F4F]" />
                  </div>

                  <button
                    onClick={() => handleViewNow(property._id)}
                    className="mt-3 bg-[#FF9A01] w-full md:w-auto px-6 py-2.5 font-medium text-sm md:text-base text-[#2D2E2E] rounded-[12px]"
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
      </div>
    </div>
  );
};

export default NearBy;
