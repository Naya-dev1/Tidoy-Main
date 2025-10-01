import { createContext, useContext, useEffect, useState } from "react";

// 1   Create Context
export const DateContext = createContext();

// 2   Custom Hook (easier access)
export const useFilter = () => useContext(DateContext);

// Apartment guest limits
const apartmentGuestLimits = {
  Villa: 12,
  House: 8,
  Hotel: 3,
  Apartment: 6,
  default: 4,
};

// 3   Provider Component
export const DateProvider = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [apartmentType, setApartmentType] = useState("");
  const [guestCount, setGuestCount] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  // Get the max guest limit based on apartment type
  const getMaxGuests = () =>
    apartmentGuestLimits[apartmentType] || apartmentGuestLimits.default;

  const updateGuestCount = (type, action) => {
    setGuestCount((prev) => {
      const updated = { ...prev };

      if (action === "increment") {
        if (type === "infants") {
          // infants capped at 5
          if (prev.infants >= 5) return prev;
          updated.infants += 1;
        } else {
          const total = prev.adults + prev.children;
          if (total >= getMaxGuests()) return prev; // enforce per-apartment limit
          updated[type] += 1;
        }
      } else if (action === "decrement") {
        if (prev[type] > 0) {
          updated[type] -= 1;
        }
      }

      return updated;
    });
  };

  // 4   Load from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dates");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCheckInDate(parsed.checkInDate || null);
        setCheckOutDate(parsed.checkOutDate || null);
        setApartmentType(parsed.apartmentType || "");
        setGuestCount(
          parsed.guestCount || { adults: 0, children: 0, infants: 0 }
        );
      }
    } catch (err) {
      console.error("Error loading dates from localStorage:", err);
    }
  }, []);

  // 5   Save to localStorage every time filters change
  useEffect(() => {
    try {
      localStorage.setItem(
        "dates",
        JSON.stringify({
          checkInDate,
          checkOutDate,
          apartmentType,
          guestCount,
        })
      );
    } catch (err) {
      console.error("Error saving dates to localStorage:", err);
    }
  }, [checkInDate, checkOutDate, apartmentType, guestCount]);

  return (
    <DateContext.Provider
      value={{
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        apartmentType,
        setApartmentType,
        guestCount,
        setGuestCount,
        updateGuestCount,
        getMaxGuests, // expose helper if needed
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
