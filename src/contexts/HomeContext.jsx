import { createContext, useContext, useEffect, useState } from "react";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 New state for filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Fetch function
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tidoy-server.onrender.com/properties"
      );
      if (!response.ok) throw new Error("Failed to fetch properties");

      const datafetch = await response.json();
      setData(datafetch);
      setFilteredData(datafetch); // initialize filtered with all data
      console.log("Fetched data:", datafetch);
    } catch (err) {
      console.error("Failed to fetch Data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  //  Function to filter properties by type
  const filterByType = (type) => {
    if (!type || type === "all") {
      setFilteredData(data); // reset to all
    } else {
      const filtered = data.filter(
        (property) =>
          property.propertyType?.toLowerCase() === type.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  return (
    <HomeContext.Provider
      value={{ data, filteredData, loading, error, fetchAllData, filterByType }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
