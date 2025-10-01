import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MainHome from "./home/MainHome";
import NavBar from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return; // if no reference, just show homepage normally

      try {
        const res = await fetch(
          `https://backend-tidoy-payment-4.onrender.com/api/payment/verify?reference=${reference}`
        );
        const data = await res.json();

        if (data?.message === "Payment successful") {
          toast.success("Payment verified");
        } else {
          toast.error("Payment failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        toast.error("Error verifying payment");
      } finally {
        // remove ?reference from URL without reloading page
        window.history.replaceState({}, document.title, "/");
      }
    };

    verifyPayment();
  }, [reference]);
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