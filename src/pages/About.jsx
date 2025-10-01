import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import about from "../assets/download (4).jfif";
import { Link } from "react-router-dom";
import { FaHome, FaShieldAlt, FaMoneyBillWave, FaSmile } from "react-icons/fa";

const About = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="z-50 backdrop-blur-[10px] bg-[#FBFBFB59] fixed w-full top-0 sm:px-[100px] px-6">
        <NavBar />
      </div>

      <div className="pt-[100px]">
        {/* Hero Section */}
        <div className="relative w-full h-[500px]">
          <img
            src={about}
            alt="About us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Welcome
            </h1>
          </div>
        </div>

        {/* Intro */}
        <div className="py-20 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D2E2E]">
            About Tidoy
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At <span className="text-[#FF9A01] font-semibold">Tidoy</span>, we’re redefining how people
            discover and enjoy places to stay. Our platform connects curious
            travelers with trusted hosts, creating memorable experiences in every
            corner of the world. 
            <br /><br />
            From cozy apartments to family-friendly homes and unique
            getaways, Tidoy is built on transparency, safety, and simplicity. 
            We want every trip to feel exciting, every booking to feel effortless,
            and every guest to feel at home—no matter where they are.
          </p>
        </div>

        {/* Our Mission - split layout */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2E2E] mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We believe travel should be safe, seamless, and affordable. 
              That’s why we’re committed to building a platform where guests can
              book with confidence and hosts can share their spaces with ease. 
              By focusing on security, affordability, and verified stays, 
              Tidoy is here to make your journeys worry-free and unforgettable.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={about}
              alt="Mission"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white py-20 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2E2E] text-center mb-12">
            Our Story
          </h2>
          <div className="max-w-4xl mx-auto space-y-10">
            {[
              {
                year: "2022",
                text: "Tidoy was born with a vision to simplify travel and connect people to trusted stays worldwide.",
              },
              {
                year: "2023",
                text: "We grew our platform, welcoming thousands of new users and verified hosts into our community.",
              },
              {
                year: "2024",
                text: "Introduced secure payments, better discovery features, and expanded to more destinations.",
              },
              {
                year: "Today",
                text: "We continue to build a community where travelers feel safe, hosts feel supported, and every journey feels memorable.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#FF9A01] text-white flex items-center justify-center font-bold text-xl">
                  {item.year}
                </div>
                <p className="text-gray-600 text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#F9FAFB] py-16">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: (
                  <FaShieldAlt className="text-[#FF9A01] text-4xl mx-auto mb-4" />
                ),
                title: "Secure Bookings",
                desc: "Safe and protected transactions every time.",
              },
              {
                icon: (
                  <FaHome className="text-[#FF9A01] text-4xl mx-auto mb-4" />
                ),
                title: "Verified Stays",
                desc: "Every property is checked and trusted.",
              },
              {
                icon: (
                  <FaMoneyBillWave className="text-[#FF9A01] text-4xl mx-auto mb-4" />
                ),
                title: "Affordable Pricing",
                desc: "Transparent rates with no hidden fees.",
              },
              {
                icon: (
                  <FaSmile className="text-[#FF9A01] text-4xl mx-auto mb-4" />
                ),
                title: "Seamless Experience",
                desc: "From search to booking in just a few clicks.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition-transform"
              >
                {item.icon}
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
       <div className="text-center py-16">
               <h2 className="text-2xl md:text-3xl font-bold text-[#2D2E2E] mb-6">
                 Ready to start exploring?
               </h2>
               <Link
                 to="/discover"
                 className="bg-[#FF9A01] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e68a00]"
               >
                 Discover Stays
               </Link>
             </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
