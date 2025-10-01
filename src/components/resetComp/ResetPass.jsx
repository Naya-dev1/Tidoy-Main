import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";

const ResetPass = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isPasswordValid = password.length >= 6;
  const isMatch = password && confirm && password === confirm;

  const canSubmit = isPasswordValid && isMatch;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Password reset successfully!");
    setPassword("");
    setConfirm("");

    setTimeout(() => {
      navigate("/sign-in");
    }, 1000);
  };

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

      <form
        onSubmit={handleSubmit}
        className="w-[450px] flex flex-col gap-6 mt-10"
      >
        <div className=" flex flex-col gap-[6px] ">
          <label htmlFor="" className="text-[14px] text-[#2D2E2E] font-medium">
            New Password{" "}
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2 px-3 pr-10 border rounded-lg ${
                !password || isPasswordValid
                  ? "border-[#C3C7CA]"
                  : "border-red-500"
              }`}
              placeholder="*********"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6A9AC]"
            >
              {showPassword ? (
                <MdVisibility className="w-5 h-5" />
              ) : (
                <MdVisibilityOff className="w-5 h-5" />
              )}
            </button>
          </div>
          {!isPasswordValid && password && (
            <p className="text-red-500 text-xs mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="text-[14px] font-medium text-[#2D2E2E]"
          >
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full py-2 px-3 pr-10 border rounded-lg ${
                !confirm || isMatch ? "border-[#C3C7CA]" : "border-red-500"
              }`}
              placeholder="*********"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6A9AC]"
            >
              {showConfirm ? (
                <MdVisibility className="w-5 h-5" />
              ) : (
                <MdVisibilityOff className="w-5 h-5" />
              )}
            </button>
          </div>
          {!isMatch && confirm && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full h-[46px] py-3 rounded-2xl font-bold text-[14px] ${
              canSubmit
                ? "bg-[#FF9A01] text-white"
                : "bg-[#D1D5DC] text-[#4A5565] cursor-not-allowed"
            }`}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
