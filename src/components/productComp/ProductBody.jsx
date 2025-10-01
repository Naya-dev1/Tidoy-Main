import React, { useEffect, useState } from "react";
import firsthome from "../../assets/resort.png";
import pool from "../../assets/pool-garden.png";
import water from "../../assets/water-tree.png";
import bed from "../../assets/bed.png";
import bath from "../../assets/bathtub.png";
import ratio from "../../assets/aspect_ratio.png";
import parking from "../../assets/local_parking.png";
import avatar from "../../assets/Avatars Base.png";
import verify from "../../assets/verified2.png";
import notification from "../../assets/notification.png";
import surfer from "../../assets/surfing.png";
import ac from "../../assets/ac_unit.png";
import wifi from "../../assets/wifi.png";
import services from "../../assets/room_service.png";
import outdoor from "../../assets/camera_outdoor.png";
import breakFast from "../../assets/restaurant.png";
import tv from "../../assets/tv.png";
import coffee from "../../assets/coffee.png";
import hotwater from "../../assets/hot_tub.png";
import viewall from "../../assets/space_dashboard.png";
import fiveStars from "../../assets/Frame 1171276800.png";
import calender from "../../assets/calendar_month.png";
import location from "../../assets/location_on.png";
import guy from "../../assets/Ellipse 5.png";
import star from "../../assets/star_purple500.png";
import market from "../../assets/market.png";
import food from "../../assets/food.png";
import train from "../../assets/train.png";
import airport from "../../assets/airport.png";
import playground from "../../assets/playground.png";
import email from "../../assets/email.png";
import verified from "../../assets/verified.png";
import rect from "../../assets/Rectangle 3.png";
import { IoMdHeart } from "react-icons/io";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { useHomeContext } from "../../contexts/HomeContext";

const ProductBody = ({ setScreen, property }) => {
  const { id } = useParams(null);
  const { data } = useHomeContext();
  const navigate = useNavigate();
  const [price, setPrice] = useState();

  // Filter nearby properties by city (simple for now)
  const othersNearby = data.filter(
    (p) => p._id !== property._id && p.city === property.city
  );

  useEffect(() => {
    const fetchPropertyPrice = async () => {
      if (id) {
        try {
          const res = await fetch(
            `https://backend-tidoy-payment-4.onrender.com/api/property/${id}`
          );
          const data = await res.json();
          if (data?.property?.pricePerNight) {
            setPrice(data.property.pricePerNight);
          } else {
            console.warn("No pricePerNight in property data:", data);
          }
        } catch (error) {
          console.error("Failed to fetch property price:", error);
        }
      }
    };
    fetchPropertyPrice();
  }, [id]);

  if (!property) return <p>No property details available</p>;

  const amenities = [
    { icon: surfer, label: "Sea view" },
    { icon: ac, label: "AC" },
    { icon: wifi, label: "WIFI" },
    { icon: services, label: "Services" },
    { icon: outdoor, label: "Security" },
    { icon: breakFast, label: "Breakfast" },
    { icon: tv, label: "Netflix" },
    { icon: coffee, label: "Coffee" },
    { icon: hotwater, label: "Hot water" },
  ];

  const reviews = [
    {
      name: "John Doe",
      profession: "Pediatrician",
      review:
        "I honestly didn’t think somewhere this serene could exist so close to Lagos. From the private boat ride to the sunset Jacuzzi, everything was perfect. The staff were warm and respectful, and the food was way better than I expected (try their grilled seafood platter!). Perfect place to disconnect, reconnect, and breathe again.",
      rating: "5 Stars",
      date: "12/12/2024",
      location: "Vancouver, Canada",
    },
    {
      name: "Jane Smith",
      profession: "Designer",
      review:
        "I honestly didn’t think somewhere this serene could exist so close to Lagos. From the private boat ride to the sunset Jacuzzi, everything was perfect. The staff were warm and respectful, and the food was way better than I expected (try their grilled seafood platter!). Perfect place to disconnect, reconnect, and breathe again.",
      rating: "4 Stars",
      date: "02/02/2025",
      location: "London, UK",
    },
    {
      name: "Michael Johnson",
      profession: "Engineer",
      review:
        "I honestly didn’t think somewhere this serene could exist so close to Lagos. From the private boat ride to the sunset Jacuzzi, everything was perfect. The staff were warm and respectful, and the food was way better than I expected (try their grilled seafood platter!). Perfect place to disconnect, reconnect, and breathe again.",
      rating: "5 Stars",
      date: "10/01/2025",
      location: "Abuja, Nigeria",
    },
  ];

  const facilities = [
    { icon: market, name: "Minimarket", distance: "2m" },
    { icon: food, name: "Restaurant", distance: "100m" },
    { icon: train, name: "Train", distance: "200m" },
    { icon: airport, name: "Airport", distance: "1km" },
    { icon: playground, name: "Playground", distance: "100m" },
  ];

  return (
    <div>
       <div className="z-50  backdrop-blur-[10px] bg-[#FBFBFB59]  fixed w-full top-0 sm:px-[100px] px-6 ">
          <NavBar />
        </div>
      <div className="md:px-[100px] px-6 md:pt-[120px] pt-[70px]">
       
        <div className="mt-[36px] bg-[#FBFBFB]">
          <div className=" flex flex-col lg:flex-row gap-[35px] mb-[82px]">
            {/* ========= */}
            <div className="flex flex-col  w-full lg:max-w-[737px] ">
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="w-[737px] md:h-[437px] h-[250px] rounded-[18px] object-cover"
              />
              {/* <div className="flex gap-[13px] ">
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="w-[362px] h-[178px] rounded-[18px]"
              />
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="w-[362px] h-[178px] rounded-[18px]"
              />
            </div> */}
            </div>

            {/* ========================= */}
            <div className="text-start w-full md:w-auto ">
              <div>
                <div className="flex flex-col gap-[6px]">
                  <h1 className="font-bold md:text-[34px] text-[20px] text-[#2D2E2E]">
                    {property.title}
                  </h1>
                  <p className="font-normal md:text-[18px] text-[16px] text-[#858789]">
                    {property.area}, {property.city}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-[10px] md:w-[300px] w-full mt-[10px]">
                  <div className="flex items-center gap-[4px]">
                    <img src={bed} alt="" />
                    <p className="font-normal text-[16px] text-[#2D2E2E]">
                      {property.rooms} bedrooms
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <img src={bath} alt="" />
                    <p className="font-normal text-[16px] text-[#2D2E2E]">
                      {property.bathrooms} Bathrooms
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <img src={ratio} alt="" />
                    <p className="font-normal text-[16px] text-[#2D2E2E]">
                      {property.size}sqm
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <img src={parking} alt="" />
                    <p className="font-normal text-[16px] text-[#2D2E2E]">
                      {property.parking ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between my-[41px]">
                <div className="flex items-center gap-[8px]">
                  <img src={avatar} alt="" />
                  <div>
                    <div className="flex items-center gap-[4px]">
                      <p className="font-bold text-[16px] md:text-[18px] text-[#2D2E2E]">
                        Adaline Alexa
                      </p>
                      <img src={verify} alt="" />
                    </div>
                    <p className="font-normal text-[16px] md:text-[18px] text-[#2D2E2E]">
                      Administrator
                    </p>
                  </div>
                </div>
                {/* <img src={notification} alt="" /> */}
              </div>

              <div className="md:w-[490px] w-full pr-0 md:pr-[30px] flex flex-col gap-[2px]">
                <h2 className="font-bold md:text-[24px] text-[18px] text-[#2D2E2E]">
                  Description
                </h2>
                <p className="font-normal text-[16px] md:text-[18px] text-[#858789]">
                  {property.description}
                </p>
                {/* <p className="font-normal text-[18px] text-[#858789]">
                What makes Ilashe particularly special is its dual water f
              </p>
              <p className="font-normal text-[18px] text-[#858789] underline">
                Read more
              </p> */}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-6">
                <p className="font-medium text-[18px] text-[#2D2E2E]">
                  {price ? `NGN ${price}` : "Loading..."}
                  /night
                </p>
                <button
                  onClick={() => setScreen("payment")}
                  className="bg-[#FF9A01] rounded-[16px] py-[10px] px-[68px] w-full md:w-[313px] font-medium text-[18px] text-[#2D2E2E]"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>

          {/* +++++++++++++++++++++++++++++++++++++++++ */}

          <div className="flex flex-col gap-[32px] mb-[82px]">
            <h2 className="font-bold text-[24px] text-[#2D2E2E] text-start">
              What this place offers
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-[29px]">
              {amenities.map((a, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-white border-2 border-[#EDF1F5] rounded-[17px] p-[35px] md:w-[170px] w-full gap-[18px]"
                >
                  <img src={a.icon} alt={a.label} />
                  <p className="text-sm sm:text-base">{a.label}</p>
                </div>
              ))}
            </div>
          </div>

         {/* ================= Reviews Section ================= */}
<div className="mb-[82px] flex flex-col gap-[32px]">
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-[8px]">
      <p className="font-bold text-[20px] md:text-[28px] text-[#2D2E2E]">
        Reviews
      </p>
      <img src={star} alt="" />
      <p className="font-bold text-[10px] md:text-[12px] text-[#2D2E2E]">
        4.5(375)
      </p>
    </div>
    <p className="text-sm cursor-pointer">See all</p>
  </div>

  {/* Desktop grid, Mobile scroll-snap */}
  <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 snap-x snap-mandatory scrollbar-hide">
    {reviews.map((r, i) => (
      <div
        key={i}
        className="flex flex-col gap-[28px] w-[330px] md:w-[366px] border border-[#EDF1F5] relative shrink-0 snap-center rounded-[12px]"
      >
        <div className="flex flex-col bg-[#CCE1FF] rounded-t-[12px] py-[30px] px-[50px]">
          <p className="font-bold text-[28px] text-[#2D2E2E] text-center">
            {r.name}
          </p>
          <p className="font-medium text-[16px] text-[#2D2E2E] text-center">
            {r.profession}
          </p>
        </div>
        <img
          src={guy}
          alt={`${r.name} avatar`}
          className="absolute left-[14px] top-[85px]"
        />
        <div className="flex flex-col px-[18px] pb-[23px] pt-[51px] bg-white w-[330px] gap-[24px]">
          <p className="font-normal text-[14px] text-[#2D2E2E]">{r.review}</p>
          <div className="flex gap-[7px]">
            <img src={fiveStars} alt="stars" />
            <p>{r.rating}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-[2px] items-center">
              <img src={calender} alt="date" />
              <p>{r.date}</p>
            </div>
            <div className="flex gap-[2px] items-center">
              <img src={location} alt="location" />
              <p>{r.location}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

{/* ================= Others Nearby Section ================= */}
<div className="flex flex-col gap-[32px] mb-[82px]">
  <div className="flex justify-between items-center">
    <p className="font-bold text-[24px] md:text-[34px] text-[#2D2E2E]">
      Others Nearby
    </p>
    <p className="cursor-pointer text-sm">See all</p>
  </div>

  {/* Mobile scroll-snap, Desktop grid */}
  {/* DESKTOP */}
<div className="hidden md:grid md:grid-cols-2 gap-6">
  {othersNearby.length > 0 ? (
    othersNearby.slice(0, 4).map((property) => (
      <div
        key={property.id}
        onClick={() => navigate(`/product-detail/${property._id}`)}
        className="flex md:flex-row flex-col bg-[#EDF1F5] p-2 gap-2 rounded-[18px] cursor-pointer"
      >
        <img
          src={
            Array.isArray(property.images)
              ? property.images[0]
              : property.images
          }
          alt={property.title}
          className="md:w-[311px] h-[320px] object-cover rounded-[12px]"
        />
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center justify-between">
            <img
              src={verified}
              alt=""
              className="md:w-[79px] md:h-[24px] w-[50px] h-[18px]"
            />
            <div className="flex gap-[7px] items-center">
              <img src={star} alt="" />
              <p className="font-bold text-[12px] text-[#000000]">
                {property.score || "No rating"} ({property.reviewCount})
              </p>
            </div>
          </div>

          <div>
            <h6 className="font-bold md:text-[18px] text-[14px] text-[#2D2E2E] leading-[28px]">
              {property.title}
            </h6>
            <p className="text-[14px] text-[#595A5B] font-normal leading-[20px]">
              {property.area}, {property.city}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[9px]">
            <div className="flex gap-1 items-center">
              <img src={bed} alt="" />
              <p className="text-[14px] text-[#595A5B] font-normal">
                {property.rooms || "N/A"} bedrooms
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <img src={bath} alt="" />
              <p className="text-[14px] text-[#595A5B] font-normal">
                {property.bathrooms || "N/A"} bathrooms
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <img src={ratio} alt="" />
              <p className="text-[14px] text-[#595A5B] font-normal">
                {property.size || "N/A"} sqm
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <img src={parking} alt="" />
              <p className="text-[14px] text-[#595A5B] font-normal">
                {property.parking ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#2D2E2E] text-[18px] font-bold">
              NGN {property.pricePerNight}/night
            </p>
            <IoMdHeart className="text-xl text-[#ED1F4F]" />
          </div>

          <button className="bg-[#FF9A01] px-[36px] py-2.5 font-medium text-[18px] text-[#2D2E2E] rounded-[16px]">
            View Now
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center col-span-2">
      No nearby properties found.
    </p>
  )}
</div>

{/* MOBILE */}
<div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
  {othersNearby.length > 0 ? (
    othersNearby.map((property) => (
      <div
        key={property.id}
        className="min-w-[280px] snap-start flex flex-col bg-[#EDF1F5] p-3 gap-3 rounded-[18px]"
      >
        <img
          src={
            Array.isArray(property.images)
              ? property.images[0]
              : property.images
          }
          alt=""
          className="w-full h-[170px] object-cover rounded-[12px]"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <img src={verified} alt="" className="w-[50px] h-[18px]" />
            <div className="flex items-center justify-between">
              <img src={star} alt="" />
              <p className="font-bold text-[12px] text-[#000000]">
                {property.score || "No rating"} ({property.reviewCount})
              </p>
            </div>
          </div>
          <div>
            <h6 className="font-bold text-[14px] text-[#2D2E2E] pe-[20px] ">
              {property.title}
            </h6>
            <p className="text-[12px] text-[#595A5B] font-normal leading-[20px]">
              {property.area}, {property.city}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#2D2E2E] text-[14px] font-bold">
              NGN {property.pricePerNight}/night
            </p>
            <IoMdHeart className="text-xl text-[#ED1F4F]" />
          </div>
          <button className="bg-[#FF9A01] px-[36px] py-2.5 font-medium text-[18px] text-[#2D2E2E] rounded-[16px]">
            View Now
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 w-full text-center">
      No nearby properties found.
    </p>
  )}
</div>

</div>

          {/* +++++++++++++++++++++++++++++++++++++ */}

        <div className="bg-[#FFEBCC] flex flex-col gap-[32px] md:gap-[49px] md:p-[60px] p-6 mb-[45px] rounded-[10px]">
  {/* Heading + Subtext */}
  <div className="flex flex-col gap-[16px] md:gap-[23px] items-center text-center">
    <h2 className="font-bold text-[24px] sm:text-[30px] md:text-[40px] text-[#2D2E2E]">
      Stay in the loop.
    </h2>
    <p className="font-medium text-[14px] sm:text-[18px] md:text-[24px] text-[#595A5B] max-w-[528px] mx-auto">
      Get travel tips, new listings, and exclusive offers straight to your inbox.
    </p>
  </div>

  {/* Input + Button */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-[11px] justify-center w-full max-w-[600px] mx-auto">
    <div className="flex gap-[8px] py-[8px] px-[12px] bg-[#FFFFFF] rounded-[12px] flex-1">
      <img src={email} alt="email" className="w-5 h-5" />
      <input
        type="email"
        placeholder="Enter email"
        className="w-full outline-none text-[14px] sm:text-[16px]"
      />
    </div>
    <button className="bg-[#FF9A01] py-[10px] px-[20px] sm:px-[34px] rounded-[12px] font-bold text-[16px] sm:text-[20px] text-[#2D2E2E] w-full sm:w-[156px]">
      Subscribe
    </button>
  </div>
</div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductBody;
