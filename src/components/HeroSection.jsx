import React from "react";
import NavBar from "./NavBar";

import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchComp/SearchBar";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen ">
      <div className="md:mt-[168px] mt-[110px] md:px-[100px] px-[24px] md:pb-[57px]">
        <div className="flex flex-col md:gap-[42px] gap-[88px] mb-[98px] max-w-[400px]  md:max-w-[741px] mx-auto">
          <div className="flex flex-col md:gap-[17px] gap-[25px]  text-center">
            <h1 className="font-bold md:text-[63px] text-[48px] text-[#FFFFFF] leading-[64px] sm:tracking-[-3px] tracking-[-2px]">
              Explore more. Stay better.
            </h1>
            <p className="text-[#FFFFFF] md:text-[24px] text-[20px] font-semibold tracking-tight   leading-[32px] ">
              From quick business trips to extended vacations, find the perfect
              space.
            </p>
          </div>
          <button
            onClick={navigate("/search-result")}
            className="bg-[#FF9A01] px-[68px] py-2.5  mx-auto rounded-[16px]
           font-bold text-[#2D2E2E] text-[24px] md:mb-0"
          >
            Discover
          </button>
        </div>

        {/* =============================== */}
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
