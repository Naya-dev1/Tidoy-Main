import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import heroImg from "../assets/download (5).jfif";
import lagos from "../assets/nigeria.png";
import abuja from "../assets/algeria.png";
import capetown from "../assets/denmark.png";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../contexts/PropertiesContext";
import { IoMdHeart } from "react-icons/io";
import verified from "../assets/verified.png";
import star from "../assets/star_purple500.png";
import bed from "../assets/bed.png";
import bath from "../assets/bathtub.png";
import square from "../assets/aspect_ratio.png";
import park from "../assets/local_parking.png";

const Discover = () => {
  const navigate = useNavigate();
  const { properties, setFilters, handleApplyFilters } = useProperties();
  const [recommended, setRecommended] = useState([]);

  // Top 3 recommended (by rating)
  useEffect(() => {
    if (properties?.length > 0) {
      const sorted = [...properties].sort((a, b) => b.rating - a.rating);
      setRecommended(sorted.slice(0, 4));
    }
  }, [properties]);

  const destinations = [
    { img: lagos, name: "Lagos" },
    { img: abuja, name: "Abuja" },
    { img: capetown, name: "Cape Town" },
  ];

  const handleDestinationClick = async (city) => {
    setFilters((prev) => ({ ...prev, location: city })); // or "area" depending on your API
    await handleApplyFilters({ location: city }); // call API with new filter
    navigate("/search-result");
  };

  return (
    <div>
      {/* Navbar */}
      <div className="z-50 backdrop-blur-[10px] bg-[#FBFBFB59] fixed w-full top-0 sm:px-[100px] px-6">
        <NavBar />
      </div>

      {/* Hero */}
      <div className="pt-[100px] relative">
        <img
          src={heroImg}
          alt="Discover"
          className="w-full h-[300px] md:h-[600px] object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-white mt-6 md:mt-0 text-[22px] md:text-5xl px-5 md:px-0 font-bold">
            Discover Your Next Adventure
          </h1>
        </div>
      </div>

      {/* Popular Destinations */}
      {/* Popular Destinations */}
<section className="py-12 px-6 sm:px-[100px]">
  <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>

  <div
    className="
      flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide
      sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:overflow-visible
    "
  >
    {destinations.map((city, idx) => (
      <div
        key={idx}
        onClick={() => handleDestinationClick(city.name)}
        className="
          relative rounded-lg overflow-hidden shadow-lg cursor-pointer group
          flex-shrink-0 w-[80%] sm:w-full snap-center
        "
      >
        <img
          src={city.img}
          alt={city.name}
          className="w-full h-[250px] object-cover group-hover:scale-105 transition"
        />
        <div className="absolute bottom-0 bg-black/50 text-white p-4 w-full">
          <h3 className="text-lg font-semibold">{city.name}</h3>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Recommended Stays */}
     {/* Recommended Stays */}
<section className="py-12 px-6 sm:px-[100px] bg-gray-50">
  <h2 className="text-2xl font-bold mb-6">Recommended Stays</h2>
  <p className="mb-4 text-gray-600">Handpicked places you’ll love.</p>

  {/* Wrapper that changes layout by screen size */}
  <div
    className="
      flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide
      md:grid md:grid-cols-2 md:gap-6 md:overflow-visible
    "
  >
    {recommended.map((property) => (
      <div
        key={property._id}
        className="
          flex flex-col md:flex-row bg-[#EDF1F5] p-3 gap-3 rounded-2xl w-[100%] sm:w-[60%] md:w-full 
          flex-shrink-0 snap-center
        "
      >
        {/* PROPERTY IMAGE */}
        <img
          src={
            Array.isArray(property.images)
              ? property.images[0]
              : property.images
          }
          alt={property.title || 'Property'}
          className="w-full md:w-1/2 h-56 md:h-80 object-cover rounded-xl"
        />

        {/* PROPERTY DETAILS */}
        <div className="flex flex-col justify-between flex-1 gap-3">
          {/* Top Section */}
          <div className="flex items-center justify-between">
            <img src={verified} alt="verified" className="w-20 md:w-24 h-auto" />

            <div className="flex gap-2 items-center">
              <img src={star} alt="rating" className="w-4 h-4" />
              <p className="font-bold text-xs md:text-sm text-[#000000]">
                {property.score || 'No rating'} ({property.reviewCount})
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
                {property.size || '—'} sqm
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <img src={park} alt="parking" className="w-4 h-4" />
              <p className="text-xs md:text-sm text-[#595A5B]">
                {property.parking ? 'Parking: Yes' : 'Parking: No'}
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
    ))}
  </div>

  {/* View All Button */}
  <div className="text-center mt-8">
    <button
      onClick={() => navigate('/search-result')}
      className="bg-[#FF9A01] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e68a00] transition"
    >
      View All Stays
    </button>
  </div>
</section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Discover;
