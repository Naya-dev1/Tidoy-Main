import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHomeContext } from "../contexts/HomeContext";
import ProductBody from "../components/productComp/ProductBody";
import PaymenttDetails from "../components/productComp/PaymenttDetails";

const ProductDetail = () => {
  const { id } = useParams(); // get product id from URL
  const { data, loading, error } = useHomeContext();
  const [property, setProperty] = useState(null);
  const [screen, setScreen] = useState("body");

  useEffect(() => {
    if (data.length > 0) {
      const found = data.find((p) => String(p._id) === String(id));
      setProperty(found);
    }
  }, [id, data]);

  if (loading) return <p>Loading property...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div>
      {screen === "body" && (
        <ProductBody setScreen={setScreen} property={property} />
      )}
      {screen === "payment" && (
        <PaymenttDetails setScreen={setScreen} property={property} />
      )}
    </div>
  );
};

export default ProductDetail;
