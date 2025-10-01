import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profilepic.png";
import drop from "../../assets/drop.png";
import { IoMdSearch } from "react-icons/io";
import productimg from "../../assets/productimg.png";
import alexa from "../../assets/Avatars Base.png";
import bed from "../../assets/bed.png";
import bath from "../../assets/bathtub.png";
import square from "../../assets/aspect_ratio.png";
import yes from "../../assets/local_parking.png";
import messg from "../../assets/notification.png";
import verified from "../../assets/verified2.png";
import check from "../../assets/calendar_month.png";
import people from "../../assets/people.png";
import tag from "../../assets/tag.png";
import paystack from "../../assets/paystack-logo.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import card from "../../assets/card.png";
import Footer from "../Footer";
import CardModal from "./CardModal";
import SuccessModal from "./SuccessModal";
import { useFilter } from "../../contexts/DateContext";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../NavBar";
import close from "../../assets/close.png";

const PaymenttDetails = ({ setScreen }) => {
  const { id } = useParams();
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // "checkIn" or "checkOut"

  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guestCount,
    updateGuestCount,
    apartmentType,
  } = useFilter();

  const handleDateSelect = (date) => {
    if (activeTab === "checkIn") setCheckInDate(date);
    else setCheckOutDate(date);
  };

  const handleClear = () => {
    if (activeTab === "checkIn") setCheckInDate(null);
    if (activeTab === "checkOut") setCheckOutDate(null);
  };

  const handleDone = () => setShowCalendar(false);

  const serviceFee = 4000;
  const nights =
    checkInDate && checkOutDate
      ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = price && nights ? price * nights + serviceFee : 0;

  useEffect(() => {
    const fetchPropertyPrice = async () => {
      if (!id) return;
      try {
        const res = await fetch(
          `https://backend-tidoy-payment-4.onrender.com/api/property/${id}`
        );
        const data = await res.json();
        if (data?.property?.pricePerNight) setPrice(data.property.pricePerNight);
      } catch (error) {
        console.error("Failed to fetch property price:", error);
      }
    };
    fetchPropertyPrice();
  }, [id]);

  const handleCreateBooking = async () => {
    if (!id || !checkInDate || !checkOutDate || !guestCount) {
      toast("Please select dates and guest count.");
      return;
    }
    try {
      const res = await fetch(
        "https://backend-tidoy-payment-4.onrender.com/api/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: id,
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
            guestCount: guestCount,
            totalPrice,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setBookingId(data._id);
        toast("Booking created successfully! Proceed to payment.");
        return data._id;
      } else toast(data.error || "Failed to create booking");
    } catch (err) {
      console.error(err);
      toast("Error creating booking");
    }
  };

  const handlePayment = async (id) => {
    const payId = id || bookingId;
    if (!payId) return toast("Please create a booking first.");
    try {
      setLoading(true);
      const res = await fetch(
        "https://backend-tidoy-payment-4.onrender.com/api/payment/initialize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: payId,
            email: "customer@email.com",
            amount: totalPrice * 100,
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data.authorizationUrl) window.location.href = data.authorizationUrl;
      else toast(data.error || data.message || "Failed to initialize payment");
    } catch (err) {
      console.error(err);
      toast("Error initializing payment");
    } finally {
      setLoading(false);
    }
  };

  const handleReserveAndPay = async () => {
    const newBookingId = await handleCreateBooking();
    if (newBookingId) await handlePayment(newBookingId);
  };

  return (
    <div className="px-4 md:px-[100px]">
      <NavBar />
      <section className="flex flex-col md:flex-row gap-6 md:gap-[15px] mt-9">
        {/* Left Column */}
        <div className="w-full md:w-[704px]">
          {/* Property Image */}
          <img
            src={productimg}
            alt=""
            className="w-full md:w-[704px] md:h-[437px] rounded-xl"
          />
          <h2 className="text-[28px] md:text-[32px] font-bold mt-4">
            La Manga Luxury Beach Resort
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#858789] mt-1 font-normal">
            Ilashe Island, Lagos
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 md:gap-6 mt-2 md:mt-4 text-sm md:text-base text-[#2D2E2E]">
            <div className="flex items-center gap-2">
              <img src={bed} alt="" className="w-4 h-3" />
              <span>2 bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={bath} alt="" className="w-4 h-4" />
              <span>2 Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={square} alt="" className="w-4 h-3.5" />
              <span>400sqm</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={yes} alt="" className="w-3 h-3.5" />
              <span>Parking</span>
            </div>
          </div>

          {/* Owner */}
          <div className="mt-6 flex items-center gap-3 md:gap-[8px]">
            <img
              src={alexa}
              alt=""
              className="w-14 h-14 md:w-[56px] md:h-[56px] rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1 md:gap-[2px]">
                <h2 className="font-bold text-sm md:text-base">Adaline Alexa</h2>
                <img src={verified} alt="" className="w-[12.67px] h-[14px]" />
              </div>
              <p className="font-normal text-[#747677] text-xs md:text-sm">
                Property Owner
              </p>
            </div>
            <img src={messg} alt="" className="w-6 h-6 md:w-[22px] md:h-[22px]" />
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-[22px] font-bold">Description</h3>
            <p className="text-[#858789] text-sm md:text-base mt-2">
              La Manga Beach Resort is a secluded, Spanish-inspired luxury villa enclave...
            </p>
            <p className="mt-1 text-[16px]">Read more</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[508px] border rounded-xl border-[#EDF1F5] mt-6 md:mt-0 p-5">
          {/* Check-in / Check-out */}
          <div className="mb-4">
            <p className="text-sm font-medium text-[#2D2E2E]">Check-in</p>
            <div className="relative mt-1">
              <img
                src={check}
                alt=""
                className="absolute left-3 top-3 w-5 h-5 cursor-pointer"
                onClick={() => {
                  setActiveTab("checkIn");
                  setShowCalendar(true);
                }}
              />
              <input
                type="text"
                placeholder="Check-in"
                value={checkInDate ? checkInDate.toDateString() : ""}
                onClick={() => {
                  setActiveTab("checkIn");
                  setShowCalendar(true);
                }}
                readOnly
                className="w-full border border-[#C3C7CA] rounded-xl pl-12 h-12"
              />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-[#2D2E2E]">Check-out</p>
            <div className="relative mt-1">
              <img
                src={check}
                alt=""
                className="absolute left-3 top-3 w-5 h-5 cursor-pointer"
                onClick={() => {
                  setActiveTab("checkOut");
                  setShowCalendar(true);
                }}
              />
              <input
                type="text"
                placeholder="Check-out"
                value={checkOutDate ? checkOutDate.toDateString() : ""}
                onClick={() => {
                  setActiveTab("checkOut");
                  setShowCalendar(true);
                }}
                readOnly
                className="w-full border border-[#C3C7CA] rounded-xl pl-12 h-12"
              />
            </div>
          </div>

          {/* Guest Selector */}
          <div className="mb-4 relative">
            <p className="text-sm font-medium text-[#2D2E2E]">Guest</p>
            <input
              type="text"
              readOnly
              placeholder="Select guests"
              value={
                guestCount.adults + guestCount.children > 0
                  ? `${guestCount.adults + guestCount.children} guest(s)${
                      guestCount.infants > 0 ? `, ${guestCount.infants} infant(s)` : ""
                    }`
                  : ""
              }
              className="w-full border border-[#C3C7CA] rounded-xl pl-12 h-12 mt-1"
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            />
            <img src={people} alt="" className="absolute left-3 top-3 w-5 h-5" />
            {showGuestDropdown && (
              <div className="absolute z-50 bg-white border border-gray-300 rounded-xl shadow-lg w-full mt-1 p-4">
                {/* Adults */}
                <div className="flex justify-between items-center mb-2">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateGuestCount("adults", "decrement")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      -
                    </button>
                    <span>{guestCount.adults}</span>
                    <button
                      onClick={() => updateGuestCount("adults", "increment")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Children */}
                <div className="flex justify-between items-center mb-2">
                  <span>Children</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateGuestCount("children", "decrement")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      -
                    </button>
                    <span>{guestCount.children}</span>
                    <button
                      onClick={() => updateGuestCount("children", "increment")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Infants */}
                <div className="flex justify-between items-center mb-2">
                  <span>Infants</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateGuestCount("infants", "decrement")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      -
                    </button>
                    <span>{guestCount.infants}</span>
                    <button
                      onClick={() => updateGuestCount("infants", "increment")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="mt-2 px-4 py-2 bg-[#FF9A01] text-white rounded-lg"
                    onClick={() => setShowGuestDropdown(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <p className="text-[20px] font-bold mb-2">Payment Method</p>
            <div className="flex flex-col gap-4">
              {/* Paystack */}
              <div className="relative">
                <img src={paystack} alt="" className="absolute top-3 left-3 w-6 h-6" />
                <div className="flex items-center justify-between w-full border border-[#C3C7CA] rounded-xl pl-12 h-12">
                  <label>Paystack</label>
                  <input type="radio" name="payment" />
                </div>
              </div>
              {/* Apple */}
              <div className="relative">
                <img src={apple} alt="" className="absolute top-3 left-3 w-6 h-6" />
                <div className="flex items-center justify-between w-full border border-[#C3C7CA] rounded-xl pl-12 h-12">
                  <label>Apple Pay</label>
                  <input type="radio" name="payment" />
                </div>
              </div>
              {/* Card */}
              <div className="relative">
                <img src={card} alt="" className="absolute top-3 left-3 w-6 h-6" />
                <div
                  onClick={() => setModal(true)}
                  className="flex items-center justify-between w-full border border-[#C3C7CA] rounded-xl pl-12 h-12 cursor-pointer"
                >
                  <label>Add debit/credit card</label>
                  <input type="radio" name="payment" />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleReserveAndPay}
            disabled={loading || !checkInDate || !checkOutDate || !guestCount}
            className="w-full mt-6 h-12 rounded-3xl bg-[#FF9A01] text-white font-bold text-[18px]"
          >
            {loading ? "Processing..." : "Pay now"}
          </button>
        </div>
      </section>

      <Footer />

      {modal && <CardModal onClose={() => setModal(false)} />}
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      {showCalendar && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-[#2D2E2ECC] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 w-full max-w-md relative">
            <Calendar
              value={activeTab === "checkIn" ? checkInDate : checkOutDate}
              onChange={handleDateSelect}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={handleDone}
                className="px-4 py-2 bg-[#FF9A01] text-white rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymenttDetails;
