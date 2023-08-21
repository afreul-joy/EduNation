/* eslint-disable react/prop-types */
// ShopContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); // Add this state for search query
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: "", // New property for minimum price
    maxPrice: "", // New property for maximum price
    rating: "",
    sortBy: "priceLowToHigh",
    sliderRange: [0, 5000], // Added slider range
    searchQuery: "", // Add searchQuery to your filters state
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

  useEffect(() => {
    const filteredProductsSearch = products.filter((product) => {
      const lowerCaseSearch = searchQuery.toLowerCase();
      return (
        product.bookName.toLowerCase().includes(lowerCaseSearch) ||
        product.author.toLowerCase().includes(lowerCaseSearch) ||
        product.category.toLowerCase().includes(lowerCaseSearch)
        // Add more fields to search if needed
      );
    });
  
    setFilteredProducts(filteredProductsSearch);
  }, [products, searchQuery]);
  


  return (
    <ShopContext.Provider
    value={{
      products: filteredProducts,
      filteredProducts,
      setProducts,
      filters,
      setFilters,
      clearFilters,
      searchQuery, // Pass searchQuery to context
      setSearchQuery, // Pass setSearchQuery to context
    }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
