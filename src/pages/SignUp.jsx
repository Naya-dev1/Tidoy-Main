import React, { useState, useContext } from "react";
import moon from "../assets/logo.png";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import img from "../assets/signInImg.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // simple UI-only validation
  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;
  const isMatch = password && confirmPassword && password === confirmPassword;

  const canSubmit = isEmailValid && isPasswordValid && isMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      toast.error("Please fill in all fields correctly!");
      return;
    }

    try {
      await signup(email, password, confirmPassword); // calls backend
      toast.success("Account created successfully!, Welcome aboard!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/"); // or "/sign-in" if you don’t auto-login
    } catch (err) {
      toast.error(err.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[698px] flex flex-col justify-center items-center px-6 py-10">
        <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[450px]">
          {/* LOGO */}
          <Link to="/">
            <img src={moon} alt="" />
          </Link>
          <div className="gap-2 flex flex-col items-center justify-center">
            <p className="text-[#2D2E2E] text-[28px] font-bold">Welcome </p>
            <p className="text-[#595A5B] text-[18px] font-medium">
              Let’s get you started in ASAP
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-[14px] font-medium text-[#2D2E2E]"
              >
                Email
              </label>{" "}
              <br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-1 py-2 px-3 border rounded-lg ${
                  !email || isEmailValid ? "border-[#C3C7CA]" : "border-red-500"
                }`}
                placeholder="example@gmail.com"
              />
              {!isEmailValid && email && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="text-[14px] font-medium text-[#2D2E2E]"
              >
                Password
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

            {/* CONFIRM PASSWORD */}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full py-2 px-3 pr-10 border rounded-lg ${
                    !confirmPassword || isMatch
                      ? "border-[#C3C7CA]"
                      : "border-red-500"
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
              {!isMatch && confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* SIGN UP BUTTON */}
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
                Sign Up
              </button>
            </div>
          </form>

          {/* OTHER OPTIONS */}
          <div className="w-full max-w-[450px] flex flex-col gap-3">
            <button className="flex justify-center items-center py-3 px-4 w-full h-[46px] rounded-2xl bg-[#FFFFFF] text-[#2D2E2E] text-[16px] font-medium border border-[#C3C7CA]">
              {" "}
              <span>
                <img src={google} alt="" className="pr-2" />
              </span>
              Sign up with Google
            </button>
            <button className="flex justify-center items-center py-3 px-4 w-full h-[46px] rounded-2xl bg-[#FFFFFF] text-[#2D2E2E] text-[16px] font-medium border border-[#C3C7CA]">
              {" "}
              <span>
                <img src={facebook} alt="" className="pr-2" />
              </span>
              Sign up with Facebook
            </button>
          </div>

          {/* SWITCH TO SIGN IN */}
          <p className="text-center font-medium text-[14px] text-[#000000] pt-3">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-bold text-[#FF9A01]">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative">
        <img src={img} alt="" className="min-h-screen w-full object-cover" />
        <div className="absolute bottom-24 left-40 backdrop-blur-xs text-[#FFFFFF] px-4 py-3 text-[16px] leading-[24px] w-[350px] rounded-[10px]">
          <p className="font-medium">
            "I love the flexibility of being able to chat with my therapist
            whenever I need support. Highly recommend!"
          </p>
          <p className="font-bold mt-2">Jiraiya</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
