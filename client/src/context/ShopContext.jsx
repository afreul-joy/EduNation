// ShopContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "", // New property for minimum price
    maxPrice: "", // New property for maximum price
    rating: "",
    sortBy: "priceLowToHigh",
    sliderRange: [0, 5000], // Added slider range
  });

  const clearFilters = () => {
    setFilters({
      category: [],
      minPrice: "",
      maxPrice: "",
      rating: "",
      sortBy: "priceLowToHigh",
      sliderRange: [0, 5000],
    });
  };

  useEffect(() => {
    axios
      .get("../../.././public/bookData.json")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <ShopContext.Provider
      value={{ products, setProducts, filters, setFilters,clearFilters }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
