import React from "react";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyPayment = () => {
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
          alert("Payment verified ✅");
          navigate("/"); // redirect to homepage
        } else {
          alert("Payment failed ");
          navigate("/"); // or navigate("/retry-payment")
        }
      } catch (err) {
        console.error("Verification error:", err);
        alert("Error verifying payment ");
        navigate("/");
      }
    };

    verifyPayment();
  }, [reference, navigate]);
  return <div></div>;
};

export default VerifyPayment;
