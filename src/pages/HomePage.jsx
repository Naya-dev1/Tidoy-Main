import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MainHome from "./home/MainHome";
import NavBar from "../components/NavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return;

      try {
        const res = await fetch(
          `https://backend-tidoy-payment-4.onrender.com/api/payment/verify?reference=${reference}`
        );
        const data = await res.json();

        if (data && data.message === "Payment successful") {
          toast.success("Payment verified ✅");
          navigate("/", { replace: true });
          // redirect to homepage
        } else {
          toast("Payment failed ");
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error("Error verifying payment ");
        navigate("/");
      } finally {
        // Clean up URL so the homepage reloads cleanly
        window.history.replaceState({}, document.title, "/");
      }
    };

    verifyPayment();
  }, [reference, navigate]);
  return (
    <div className="relative">
      <div className="hero-img  relative">
        <div className="z-50  backdrop-blur-[10px] bg-[#FBFBFB59]  fixed w-full top-0 sm:px-[100px] px-6">
          <NavBar />
        </div>
        <div className="pt-[120px]">
          {" "}
          <HeroSection />
        </div>{" "}
      </div>

      <MainHome />
    </div>
  );
};

export default HomePage;
