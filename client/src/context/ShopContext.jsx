// ShopContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    rating: "",
  });

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
    <ShopContext.Provider value={{ products, setProducts, filters, setFilters }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
