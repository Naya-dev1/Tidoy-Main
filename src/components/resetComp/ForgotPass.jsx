import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const ForgotPass = () => {
  return (
    <div className=" w-full mx-auto flex flex-col justify-center h-screen items-center">
      <Link>
        <img src={logo} alt="" />
      </Link>

      <div className="w-[378px] flex flex-col items-center gap-2 mt-[28px]">
        <h3 className="text-[#2D2E2E] text-[28px] font-bold">
          Forgot Password
        </h3>
        <p className="font-medium text-[18px] text-[#595A5B] leading-[28px] text-center">
          Enter your email here and we will send you a link to reset your
          password
        </p>
      </div>

      <div className="w-[450px] flex flex-col gap-6 mt-10">
        <div className=" flex flex-col gap-[6px] ">
          <label htmlFor="" className="text-[14px] text-[#2D2E2E] font-medium">
            Email
          </label>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="py-2 px-3 border border-[#C3C7CA] bg-white rounded-[12px]"
          />
        </div>
        <button className="bg-[#FF9A01] py-3 px-[68px] rounded-[16px] font-medium text-[18px] text-[#2D2E2E]">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPass;
