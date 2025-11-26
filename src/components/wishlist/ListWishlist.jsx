import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useProperties } from "../../contexts/PropertiesContext";
import { IoMdHeart } from "react-icons/io";
import verified from "../../assets/verified.png";
import star from "../../assets/star_purple500.png";
import bed from "../../assets/bed.png";
import bath from "../../assets/bathtub.png";
import square from "../../assets/aspect_ratio.png";
import park from "../../assets/local_parking.png";

const ListWishlist = () => {
  const { wishlist, addPropertyToWishlist, removePropertyFromWishlist } = useContext(AuthContext);
  const { properties } = useProperties();

  const allProperties = properties || [];

  const isPropertyLiked = (propertyId) => {
    return Object.values(wishlist).some((ids) => ids.includes(propertyId));
  };

const handleLikeClick = (property, groupName) => {
  const id = property._id;
  if (isPropertyLiked(id)) {
    removePropertyFromWishlist(groupName, id);
  } else {
    addPropertyToWishlist(groupName, id);
  }
};


  const handleViewNow = (id) => {
    window.location.href = `/property/${id}`;
  };

  useEffect(() => {
  console.log("🔎 Wishlist from AuthContext:", wishlist);
}, [wishlist]);


  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Wishlists</h1>
      </div>

      {/* Empty State */}
      {Object.keys(wishlist).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty wishlist"
            className="w-32 h-32 mb-6 opacity-80"
          />
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            No wishlists yet
          </h2>
          <p className="text-gray-500 mb-6">
            Save your favorite properties and organize them into wishlists.
          </p>
        </div>
      ) : (
        /* Wishlist Groups */
        <div className="space-y-10">
          {Object.entries(wishlist).map(([group, propertyIds]) => (
            <div key={group}>
              <h3 className="font-semibold text-2xl mb-4 text-[#2D2E2E]">
                {group}
              </h3>

              <div className="flex flex-col gap-8">
                {propertyIds.map((id) => {
                  const property = allProperties.find((p) => p._id === id);
                  if (!property) return null;

                  return (
                    <div
                      key={property._id}
                      className="flex flex-col md:flex-row bg-[#EDF1F5] p-3 md:p-4 gap-3 rounded-[18px]"
                    >
                      {/* Image */}
                      <img
                        src={
                          Array.isArray(property.images)
                            ? property.images[0]
                            : property.images
                        }
                        alt={property.title}
                        className="w-full md:w-[220px] h-[220px] md:h-[320px] object-cover rounded-[12px]"
                      />

                      {/* Info */}
                      <div className="flex flex-col justify-between flex-1">
                        {/* Top */}
                        <div className="flex items-center justify-between mb-2">
                          <img
                            src={verified}
                            alt="verified"
                            className="w-[60px] md:w-[79px] h-[20px] md:h-[24px]"
                          />

                          <div className="flex gap-1.5 items-center">
                            <img src={star} alt="" className="w-4 h-4" />
                            <p className="font-bold text-xs md:text-sm text-[#000000]">
                              {property.score || "No rating"} ({property.reviewCount})
                            </p>
                          </div>
                        </div>

                        {/* Title + Location */}
                        <div className="mb-3">
                          <h6 className="font-bold text-base md:text-lg text-[#2D2E2E] leading-snug">
                            {property.title}
                          </h6>
                          <p className="text-sm md:text-base text-[#595A5B]">
                            {property.area}, {property.city}
                          </p>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex gap-1 items-center">
                            <img src={bed} alt="" className="w-4 h-4" />
                            <p className="text-sm text-[#595A5B]">
                              {property.bedrooms} bedrooms
                            </p>
                          </div>

                          <div className="flex gap-1 items-center">
                            <img src={bath} alt="" className="w-4 h-4" />
                            <p className="text-sm text-[#595A5B]">
                              {property.bathrooms} Bathrooms
                            </p>
                          </div>

                          <div className="flex gap-1 items-center">
                            <img src={square} alt="" className="w-4 h-4" />
                            <p className="text-sm text-[#595A5B]">
                              {property.size || "—"} sqm
                            </p>
                          </div>

                          <div className="flex gap-1 items-center">
                            <img src={park} alt="" className="w-4 h-4" />
                            <p className="text-sm text-[#595A5B]">
                              {property.parking ? "Parking: Yes" : "Parking: No"}
                            </p>
                          </div>
                        </div>

                        {/* Price + Button */}
                        <div className="flex items-center justify-between">
                          <p className="text-[#2D2E2E] text-base md:text-lg font-bold">
                            NGN {property.pricePerNight}/night
                          </p>

                          <IoMdHeart
                            onClick={() => handleLikeClick(property, group)}
                            className={`text-lg md:text-xl cursor-pointer transition-colors duration-300 ${
                              isPropertyLiked(property._id)
                                ? "text-[#ED1F4F]"
                                : "text-gray-400"
                            }`}
                          />
                        </div>

                        <button
                          onClick={() => handleViewNow(property._id)}
                          className="mt-3 bg-[#FF9A01] w-full md:w-auto px-6 py-2.5 font-medium text-sm md:text-base text-[#2D2E2E] rounded-[12px]"
                        >
                          View Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListWishlist;
