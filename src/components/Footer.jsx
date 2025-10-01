import React from "react";
import { IoMdMail } from "react-icons/io";
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { LuTwitter } from "react-icons/lu";
import { LuYoutube } from "react-icons/lu";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2D2E2E] py-[71px] px-6 md:px-[100px]">
  <div className="flex flex-col md:flex-row justify-between gap-[40px]">
    {/* Logo + Tagline */}
    <div className="md:w-[420px] flex flex-col gap-3 items-start">
      <img
        src={logo}
        alt="logo"
        className="py-[13px] w-[196px] px-[15px] bg-[#FBFBFB] rounded-[11px]"
      />
      <p className="font-normal text-[16px] md:text-[18px] text-[#FFFFFF] pe-[20px]">
        Making stays smarter, simpler, and more connected.
      </p>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col gap-[20px]">
      <h6 className="font-bold text-[20px] md:text-[24px] text-[#FFFFFF]">
        Quick Links
      </h6>
      <div className="flex flex-col gap-[12px]">
        <Link className="font-bold text-[16px] text-[#FFFFFF]">Home</Link>
        <Link className="font-bold text-[16px] text-[#FFFFFF]">About</Link>
        <Link className="font-bold text-[16px] text-[#FFFFFF]">Contact</Link>
        <Link className="font-bold text-[16px] text-[#FFFFFF]">Blog</Link>
      </div>
    </div>

    {/* Socials */}
    <div className="flex flex-col gap-[20px]">
      <h6 className="font-bold text-[20px] md:text-[28px] text-[#FFFFFF]">
        Socials
      </h6>
      <div className="flex flex-row md:flex-col gap-[16px]">
        <LuFacebook className="text-[#FFFFFF] text-[20px]" />
        <LuInstagram className="text-[#FFFFFF] text-[20px]" />
        <LuTwitter className="text-[#FFFFFF] text-[20px]" />
        <LuYoutube className="text-[#FFFFFF] text-[20px]" />
      </div>
    </div>
  </div>

  {/* Bottom Line */}
  <div className="mt-[50px] border-t border-[#595A5B] pt-6 text-center text-[#A6A9AC] text-[14px]">
    © {new Date().getFullYear()} StaySmart. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
