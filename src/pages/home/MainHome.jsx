import React from "react";
import { Link, useNavigate } from "react-router-dom";
import near1 from "../../assets/Rectangle 3.png";
import { IoMdHeart } from "react-icons/io";
import verified from "../../assets/verified.png";
import star from "../../assets/star_purple500.png";
import bed from "../../assets/bed.png";
import bath from "../../assets/bathtub.png";
import square from "../../assets/aspect_ratio.png";
import park from "../../assets/local_parking.png";
import nigeria from "../../assets/nigeria.png";
import algeria from "../../assets/algeria.png";
import chile from "../../assets/chile.png";
import denmark from "../../assets/denmark.png";
import georgia from "../../assets/georgia.png";
import flag1 from "../../assets/Nigeria flag.png";
import flag2 from "../../assets/algeria flag.png";
import flag3 from "../../assets/chile flag.png";
import flag4 from "../../assets/georgia flag.png";
import flag5 from "../../assets/denmark flag.png";
import mavin from "../../assets/mavin.png";
import tsa from "../../assets/tsa.png";
import pic from "../../assets/Ellipse 5.png";
import lagos from "../../assets/InShot_20250904_101311281.png";
import interswitch from "../../assets/interswitch.png";
import federation from "../../assets/federation 1.png";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import stay1 from "../../assets/stay1.png";
import stay2 from "../../assets/stay2.png";
import stay3 from "../../assets/stay3.png";
import stay4 from "../../assets/stay4.png";
import stay5 from "../../assets/stay5.png";
import stay6 from "../../assets/stay6.png";
import { IoMdMail } from "react-icons/io";
import Footer from "../../components/Footer";
import { useProperties } from "../../contexts/PropertiesContext";

// import logo from "../../assets/logo.png";

const MainHome = () => {
  const navigate = useNavigate();

  const {
    properties,
    filters,
    setFilters,
    handleApplyFilters,
    resetFilters,
    isLoading,
  } = useProperties();

  return (
    <div>
      {/* ===================NEARBY========================= */}
      <div className="md:px-[100px] px-6 md:py-[82px] py-[40px]">
        <div className="flex justify-between items-center mb-[25px]">
          <h4 className="font-bold md:text-[32px] text-[20px] text-[#000000]">
            Nearby
          </h4>
          <Link
            to="/nearby"
            className="md:text-[18px] text-[15px] text-[#000000] font-normal"
          >
            See All
          </Link>
        </div>

        {/* ✅ Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {properties.slice(0, 4).map((property) => (
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
                    <img src={square} alt="" />
                    <p className="text-[14px] text-[#595A5B] font-normal">
                      {property.size || "N/A"} sqm
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img src={park} alt="" />
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
          ))}
        </div>
        {/*  MOBILE*/}

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
          {properties.map((property) => {
            return (
              <div
                key={property.id}
                onClick={() => navigate(`/product-detail/${property._id}`)}
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

                    <div className="flex  items-center justify-between">
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
            );
          })}
        </div>
      </div>

      {/* =============FEATURED DESTINATION================== */}

      <div className="px-6 md:px-[100px]">
        <div className="flex justify-between items-center mb-[25px]">
          <h4 className="font-bold text-[20px] md:text-[32px] text-[#000000]">
            Featured Destinations
          </h4>
          <Link className="text-[15px] md:text-[18px] text-[#000000] font-normal">
            See All
          </Link>
        </div>

        <div className="hidden md:flex gap-6 mb-[82px]">
          <div className="relative">
            <img src={nigeria} alt="" className="rounded-[12px]" />
            <div className="absolute left-[29px] bottom-[29px] flex items-start gap-[15px]">
              <div className="flex flex-col gap-[6px] ">
                <h4 className="text-[50px] text-[#FFFFFF] font-extrabold">
                  Nigeria
                </h4>
                <p className="text-[20px] text-[#C3C7CA] font-medium">
                  180 Destinations
                </p>
              </div>
              <img src={flag1} alt="" className="p-[9px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Chile */}
            <div className="relative">
              <img src={chile} alt="" className="rounded-[12px]" />
              <div className="absolute left-[21px] bottom-[21px] flex items-start gap-2">
                <div className="flex flex-col gap-[6px]">
                  <h4 className="text-[32px] text-white font-extrabold">
                    Chile
                  </h4>
                  <p className="text-[16px] md:text-[20px] text-[#C3C7CA] font-medium">
                    180 Destinations
                  </p>
                </div>
                <img src={flag3} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>

            {/* Algeria */}
            <div className="relative">
              <img src={algeria} alt="" className="rounded-[12px]" />
              <div className="absolute left-[21px] bottom-[21px] flex items-start gap-2">
                <div className="flex flex-col gap-[6px]">
                  <h4 className="text-[32px] text-white font-extrabold">
                    Algeria
                  </h4>
                  <p className="text-[16px] md:text-[20px] text-[#C3C7CA] font-medium">
                    180 Destinations
                  </p>
                </div>
                <img src={flag2} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>

            {/* Denmark */}
            <div className="relative">
              <img src={denmark} alt="" className="rounded-[12px]" />
              <div className="absolute left-[19px] bottom-[19px] flex items-start gap-2">
                <div className="flex flex-col gap-[6px]">
                  <h4 className="text-[32px] text-white font-extrabold">
                    Denmark
                  </h4>
                  <p className="text-[16px] md:text-[20px] text-[#C3C7CA] font-medium">
                    180 Destinations
                  </p>
                </div>
                <img src={flag4} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>

            {/* Georgia */}
            <div className="relative">
              <img src={georgia} alt="" className="rounded-[12px]" />
              <div className="absolute left-[21px] bottom-[19px] flex items-start gap-2">
                <div className="flex flex-col gap-[6px]">
                  <h4 className="text-[32px] text-white font-extrabold">
                    Georgia
                  </h4>
                  <p className="text-[16px] md:text-[20px] text-[#C3C7CA] font-medium">
                    180 Destinations
                  </p>
                </div>
                <img src={flag5} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout (horizontal scroll cards) */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden pb-6">
          {[
            { img: nigeria, name: "Nigeria", flag: flag1 },
            { img: chile, name: "Chile", flag: flag3 },
            { img: algeria, name: "Algeria", flag: flag2 },
            { img: denmark, name: "Denmark", flag: flag4 },
            { img: georgia, name: "Georgia", flag: flag5 },
          ].map((item, idx) => (
            <div key={idx} className="relative min-w-[220px] snap-start">
              <img
                src={item.img}
                alt={item.name}
                className="rounded-[12px] h-[280px] w-[220px] object-cover"
              />
              <div className="absolute left-4 bottom-4 flex items-start gap-2">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[18px] text-white font-extrabold">
                    {item.name}
                  </h4>
                  <p className="text-[12px] text-[#C3C7CA]">180 Destinations</p>
                </div>
                <img src={item.flag} alt="" className="w-[20px] h-[20px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===========OUR PARTNERS==================== */}

      <div className="partners md:px-[100px] px-6 bg-[#EDF1F5] py-[56px]">
        <div className=" flex flex-col gap-[35px]">
          <h4 className="text-[#2D2E2E] md:text-[32px] text-[20px] font-bold mx-auto">
            Our Partners
          </h4>
          <div className="hidden md:flex justify-between items-center scrollbar-hide">
            <img src={mavin} alt="" className="w-[102.64px] h-[102.64px]" />
            <img src={tsa} alt="" className="w-[195px] h-[59.44px]" />
            <img src={lagos} alt="" className="w-[130.64px] h-[130.64px]" />
            <img
              src={interswitch}
              alt=""
              className="w-[190.41px] h-[64.74px]"
            />
            <img
              src={federation}
              alt=""
              className="w-[102.64px] h-[102.64px]"
            />
          </div>

          <div
            className="
      flex md:hidden items-center overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide
    "
          >
            <img
              src={mavin}
              alt="Mavin"
              className="w-[90px] h-[70px] snap-start flex-shrink-0"
            />
            <img
              src={tsa}
              alt="TSA"
              className="w-[160px] h-[45px] snap-start flex-shrink-0"
            />
            <img
              src={lagos}
              alt="Lagos"
              className="w-[110px] h-[100px] snap-start flex-shrink-0"
            />
            <img
              src={interswitch}
              alt="Interswitch"
              className="w-[170px] h-auto snap-start flex-shrink-0"
            />
            <img
              src={federation}
              alt="Federation"
              className="w-[70px] h-[70px] snap-start flex-shrink-0"
            />
          </div>
        </div>

        <hr className="my-[56px] w-[304px] text-[#858789] mx-auto" />
        <div>
          <h4 className="text-[#2D2E2E] md:text-[32px] text-[20px] font-bold text-center my-[35px]">
            What Our Customers Say
          </h4>
          {/* ratings */}
          <div>
            <div className="bg-[#FBFBFB] md:w-[366px] flex flex-col gap-[51px] relative rounded-[12px]">
              <img
                src={pic}
                alt=""
                className="w-[89px] h-[89px] absolute left-[14px] top-[55px]"
              />
              <div className="bg-[#CCE1FF] py-[23px] rounded-t-[12px]">
                <h5 className="text-center text-[20px] font-bold text-[#2D2E2E]">
                  John Doe
                </h5>
                <p className="text-center text-[16px] font-medium text-[#2D2E2E]">
                  Pediatrician
                </p>
              </div>
              <div className="px-[18px] pb-[23px] space-y-[24px]">
                <p className="font-normal text-[14px] text-[#2D2E2E]">
                  I honestly didn’t think somewhere this serene could exist so
                  close to Lagos. From the private boat ride to the sunset
                  Jacuzzi, everything was perfect. The staff were warm and
                  respectful, and the food was way better than I expected (try
                  their grilled seafood platter!). Perfect place to disconnect,
                  reconnect, and breathe again.
                </p>

                <div className="flex items-center gap-[7px]">
                  <div className="flex items-center gap-[1px]">
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                  </div>

                  <p>5 Stars</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[2px]">
                    <MdOutlineCalendarMonth className="text-[18px] text-[#747677] " />
                    <p className="text-[14px] text-[#2D2E2E] font-normal">
                      12/12/2024
                    </p>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <MdOutlineLocationOn className="text-[18px] text-[#747677] " />
                    <p className="text-[14px] text-[#2D2E2E] font-normal">
                      Vancouver, Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ==================== */}
          </div>
        </div>
      </div>

      {/* =================STAY=================== */}

      <div className="md:px-[100px] px-6 py-[82px] flex flex-col md:flex-row gap-6 md:gap-3 items-center">
        <div className="grid grid-cols-2 gap-[19px] items-center ">
          <div className="flex flex-col gap-[25px]">
            <img src={stay1} alt="" className="rounded-[16px]" />
            <img src={stay2} alt="" className="rounded-[16px]" />
          </div>
          <img src={stay3} alt="" className="rounded-[16px]" />
        </div>

        <div className="flex flex-col gap-[24px] items-center text-center flex-1 px-4">
          <h4 className="stay text-[28px] md:text-[40px] text-[#2D2E2E] font-semibold leading-tight">
            Your Stay, Your Way.
          </h4>
          <p className="font-medium text-[16px] md:text-[18px] text-[#595A5B]">
            From city lofts to beachside villas — find spaces that match your
            vibe and your budget.
          </p>
          <Link to="/search-result">
            <button className="bg-[#FF9A01] px-[48px] md:px-[68px] py-3 text-[18px] md:text-[24px] text-[#2D2E2E] font-bold rounded-[16px] hover:bg-[#e68c00] transition">
              Discover
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-[19px] items-center">
          <img src={stay4} alt="" className="rounded-[16px]" />
          <div className="flex flex-col gap-[25px]">
            <img src={stay5} alt="" className="rounded-[16px]" />
            <img src={stay6} alt="" className="rounded-[16px]" />
          </div>
        </div>
      </div>

      {/* ==================Subscribe================= */}

      <div className="bg-[#FFEBCC] rounded-[18px] md:mx-[100px] mx-6 py-[69px] mb-[82px] space-y-[49px]">
        <div className="flex flex-col items-center gap-[23px] px-4">
          <h4 className="text-[28px] md:text-[40px] font-bold text-[#2D2E2E] text-center">
            Stay in the loop.
          </h4>
          <p className="text-[18px] md:text-[24px] text-[#595A5B] font-bold max-w-[528px] text-center">
            Get travel tips, new listings, and exclusive offers straight to your
            inbox.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-[11px] items-center px-4">
          <div className="w-full md:w-[412.5px] bg-[#FFFFFF] p-[16.5px] flex gap-1 items-center rounded-[16px]">
            <IoMdMail className="text-[27px] text-[#A6A9AC]" />
            <input
              type="text"
              placeholder="Enter email"
              className="flex-1 outline-none text-[16px]"
            />
          </div>
          <button className="w-full md:w-auto px-[28px] py-[19px] bg-[#FF9A01] font-bold text-[#2D2E2E] text-[20px] rounded-[16px]">
            Subscribe
          </button>
        </div>
      </div>

      {/* ==================FOOTER====================== */}
      <Footer />

      {/* =================== */}
    </div>
  );
};

export default MainHome;
