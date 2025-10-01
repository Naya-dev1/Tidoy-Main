import { createContext, useContext, useEffect, useState } from "react";

export const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [allUniqueAreas, setAllUniqueAreas] = useState([]); // New: For static unique areas
  const [isLoading, setIsLoading] = useState(false);
  // const [category, setCategory] = useState("");

  const [filters, setFilters] = useState({
    area: "",
    category: "",
    location: "",
    propertyType: "any",
    minPrice: "",
    maxPrice: "",
    amenities: "any",
    bedrooms: 0,
    bathrooms: 0,
    score: "",
    sortBy: "",
  });

  // const fetchProperties = async (appliedFilters = {}) => {};

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://tidoy-backend-3.onrender.com/api/properties"
      );
      const json = await res.json();
      if (json.success) {
        setProperties(json.data); // ✅ triggers re-render
        setAllUniqueAreas([...new Set(json.data.map((p) => p.area))]); // Added: Set static areas
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false); // Added: Clear loading
    }
  };

  // Fetch filtered properties
  const handleApplyFilters = async (override = {}) => {
    setIsLoading(true);
    const activeFilters = { ...filters, ...override };
    const query = {};
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== "" &&
        filters[key] !== "any" &&
        filters[key] !== null &&
        filters[key] !== undefined &&
        !(typeof filters[key] === "number" && activeFilters[key] === 0) // skip 0 values
      ) {
        query[key] = filters[key];
      }
    });

    const params = new URLSearchParams(query).toString();
    try {
      const res = await fetch(
        `https://tidoy-backend-3.onrender.com/api/properties?${params}`
      );
      const data = await res.json();
      if (data.success) {
        console.log("Filtered API result:", data.data);
        setProperties(data.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Filter fetch error:", err);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const setArea = (area) => {
    setFilters((prev) => ({ ...prev, area }));
  };

  // const setArea = (area) => {
  //   setFilters((prev) => {
  //     const newFilters = { ...prev, area };
  //     return newFilters;
  //   });
  // };

  const resetFilters = async () => {
    // Added: Reset function
    setFilters({
      area: "",
      category: "",
      location: "",
      propertyType: "any",
      minPrice: "",
      maxPrice: "",
      amenities: "any",
      bedrooms: 0,
      bathrooms: 0,
      score: "",
      sortBy: "",
    });
    await fetchAllData();
  };

  const uniqueAreas = [...new Set(properties.map((p) => p.area))];
  // const nearbyProperties = properties.filter(
  //   (p) => p.city.toLowerCase() === "lagos" // for now: only Lagos
  // );

  // const recommendedProperties = properties.filter(
  //   (p) => p.score >= 4.5 // for now: score-based recommendation
  // );

  useEffect(() => {
    handleApplyFilters();
  }, [filters]);

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        setProperties,
        filters,
        setFilters,
        handleApplyFilters,
        setArea,
        uniqueAreas,
        allUniqueAreas,
        isLoading,
        resetFilters,
      }}
    >
      {" "}
      {children}
    </PropertiesContext.Provider>
  );
};

//

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
};
