import React, { useState, useContext, useEffect } from "react";
import moon from "../assets/logo.png";
import google from "../assets/google.png";
import facebook from "../assets/facebook.png";
import img from "../assets/signInImg.png";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.GOOGLE_CLIENT_ID, // put this in .env
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch(
        "https://tidoy-web-backend.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ googleJWT: response.credential }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.localJWT);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        console.error("Google login failed:", data.message);
      }
    } catch (err) {
      console.error("Error logging in with Google:", err);
    }
  };

  return (
    <div className="min-h-full flex flex-row lg:flex-row">
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10">
        <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[450px]">
          {/* LOGO */}
          <Link to="/">
            <img src={moon} alt="" />
          </Link>
          <div className="gap-2 flex flex-col items-center justify-center text-center">
            <p className="text-[#2D2E2E] text-[28px] font-bold leading-[36px]">
              Welcome Back{" "}
            </p>
            <p className="text-[#595A5B] text-[18px] font-medium leading-[28px]">
              Let’s get you signed ASAP
            </p>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="text-[14px] font-medium leading-[20px] text-[#2D2E2E]"
              >
                Email
              </label>{" "}
              <br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 py-2 px-3 border border-[#C3C7CA] bg-[#FFFFFF] rounded-lg outline-none"
                placeholder="example@gmail.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="text-[14px] font-medium leading-[20px] text-[#2D2E2E]"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-3 pr-10 border border-[#C3C7CA] outline-none bg-transparent rounded-lg"
                  placeholder="*********"
                />

                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6A9AC]"
                >
                  {passwordVisible ? (
                    <MdVisibility className="w-5 h-5" />
                  ) : (
                    <MdVisibilityOff className="w-5 h-5" />
                  )}
                </button>
              </div>
              <Link
                to="/reset-password"
                className="text-[#2D2E2E] text-[12px] font-normal leading-[16px] flex justify-end"
              >
                Forgot Password?
              </Link>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={!email || !password || loading}
              className={`w-full h-[52px] rounded-2xl font-bold text-[14px] transition ${
                !email || !password || loading
                  ? "bg-[#D1D5DC] text-[#4A5565] cursor-not-allowed"
                  : "bg-[#FF9A01] text-[#FFFFFF] hover:bg-[#E68A00]"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {/* OTHER OPTIONS */}
          <div className="w-full flex flex-col gap-4">
            <button className="flex justify-center items-center py-3 px-4 w-full h-[52px] rounded-2xl bg-[#FFFFFF] text-[#2D2E2E] text-[18px] font-medium border border-[#C3C7CA] cursor-pointer">
              {" "}
              <span>
                <img src={google} alt="" className="pr-2" />
              </span>
              Continue with Google
            </button>
            {/* <div id="google-btn" className="flex justify-center" /> */}

            <button className="flex justify-center items-center py-3 px-4 w-full h-[52px] rounded-2xl bg-[#FFFFFF] text-[#2D2E2E] text-[18px] font-medium border border-[#C3C7CA] cursor-pointer">
              {" "}
              <span>
                <img src={facebook} alt="" className="pr-2" />
              </span>
              Continue with Facebook
            </button>
          </div>
          {/* SIGN UP LINK */}
          <p className="text-center font-medium text-[14px] text-[#000000] pt-6">
            Dont have an account?{" "}
            <Link to="/sign-up" className="font-bold text-[#FF9A01]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative">
        <img src={img} alt="" className="min-h-screen w-full object-cover" />
        <div className="absolute bottom-22 left-26 backdrop-blur-xs text-[#FFFFFF] p-4 text-[16px] leading-[24px] max-w-[400px] rounded-lg">
          <p className="font-medium mb-2">
            "I love the flexibility of being able to chat with my therapist
            whenever I need support. Highly recommend!"
          </p>
          <p className="font-bold">Sarutobi .H</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
