import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const CreateWishlistModal = ({ open, onClose, property }) => {
  const { wishlist, addPropertyToWishlist, removeFromWishlist } =
    useContext(AuthContext);
  const [newWishlistName, setNewWishlistName] = useState("");

  if (!open || !property) return null;

  const handleAddToExisting = (groupName) => {
    addPropertyToWishlist(property, groupName);
    onClose();
  };

  const handleCreateAndAdd = () => {
    if (!newWishlistName.trim()) return;
    addPropertyToWishlist(property, newWishlistName.trim());
    setNewWishlistName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
        <h3 className="text-lg font-bold mb-3 text-[#2D2E2E]">
          Add to Wishlist
        </h3>
        <p className="text-sm text-[#595A5B] mb-5">
          Organize your favorite properties by creating a wishlist category.
        </p>

        {/* Existing Categories */}
        {Object.keys(wishlist).length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Select a wishlist:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(wishlist).map((group) => (
                <button
                  key={group}
                  onClick={() => handleAddToExisting(group)}
                  className="px-3 py-1 rounded bg-[#FF9A01] text-white"
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        )}

        <hr className="my-4" />

        {/* <input
          type="text"
          placeholder="Enter wishlist name (e.g. Ecoe Stays)"
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF9A01]"
        />  */}

        {/* Create New Wishlist */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Create a new wishlist"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#FF9A01]"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAndAdd}
              className="px-3 py-1 rounded bg-[#FF9A01] text-white"
            >
              Create & Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWishlistModal;
