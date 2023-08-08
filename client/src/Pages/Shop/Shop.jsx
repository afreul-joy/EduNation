import React, { useContext } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import { ShopContext } from "../../context/ShopContext";

const Shop = () => {
  const { products, filters, setFilters } = useContext(ShopContext);

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category.length || filters.category.includes(product.category)) &&
      (!filters.priceRange ||
        (filters.priceRange === "low" && product.discountedPrice < 200) ||
        (filters.priceRange === "medium" &&
          product.discountedPrice > 200 &&
          product.discountedPrice <= 500) ||
        (filters.priceRange === "high" && product.discountedPrice > 500)) &&
      (!filters.rating || product.rating >= filters.rating)
    );
  });

  const handleFilterChange = (filterType, value) => {
    if (filterType === "category") {
      const updatedCategories = filters.category.includes(value)
        ? filters.category.filter((category) => category !== value)
        : [...filters.category, value];
      setFilters({ ...filters, [filterType]: updatedCategories });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const categories = ["fiction", "romance", "philosophy", "mystery", "sci-fi"]; // Add more categories
  return (
    <div className="flex flex-wrap">
      {/* Left Column - Filters */}
      <div className="w-full md:w-1/4 p-4">
      <div className="bg-white shadow-md p-4">
          <h3 className="text-lg font-semibold text-center">Category</h3>
          <div className="flex flex-col ">
            {categories.map((category) => (
              <label
                key={category}
                className="block my-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105 rounded-lg p-2"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  value={category}
                  checked={filters.category.includes(category)}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold">Price Range</h3>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            <option value="">All</option>
            <option value="low">Low ($0 - $200)</option>
            <option value="medium">Medium ($200 - $500)</option>
            <option value="high">High ($500)</option>
          </select>
        </div>
        <div className="bg-white shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold">Minimum Rating</h3>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
          >
            <option value="">All</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>
      </div>

      {/* Right Column - Product List */}
      <div className="w-full md:w-3/4 p-4">
        {/* Display filtered product count */}
        <h2 className="text-3xl font-light mb-4 text-center text-gray-600">
          Number Of Products : {filteredProducts.length}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
