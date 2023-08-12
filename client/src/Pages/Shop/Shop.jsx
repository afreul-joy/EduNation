import { useContext, useState } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import { ShopContext } from "../../context/ShopContext";
import { FaStar } from "react-icons/fa";
import { PiListFill, PiGridFourFill } from "react-icons/pi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ProductListCard from "../../Components/Card/ProductListCard";

const Shop = () => {
  const { products, filters, setFilters } = useContext(ShopContext);
  const [viewType, setViewType] = useState("grid"); // Add state for view type

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category.length ||
        filters.category.includes(product.category)) &&
      ((filters.minPrice === "" && filters.maxPrice === "") || // Check if both min and max prices are empty
        (filters.minPrice === "" &&
          product.discountedPrice <= filters.maxPrice) || // Check only max price
        (filters.maxPrice === "" &&
          product.discountedPrice >= filters.minPrice) || // Check only min price
        (product.discountedPrice >= filters.minPrice &&
          product.discountedPrice <= filters.maxPrice)) && // Check both min and max prices
      (!filters.rating || product.rating >= filters.rating)
    );
  });

  const handleFilterChange = (filterType, value) => {
    if (filterType === "category") {
      const updatedCategories = filters.category.includes(value)
        ? filters.category.filter((category) => category !== value)
        : [...filters.category, value];
      setFilters({ ...filters, [filterType]: updatedCategories });
    } else if (filterType === "priceRange") {
      const [minPrice, maxPrice] = value;

      // Ensure non-negative values
      const updatedMinPrice = Math.max(0, parseFloat(minPrice));
      const updatedMaxPrice = Math.max(updatedMinPrice, parseFloat(maxPrice));

      // Update slider range
      const newSliderRange = [updatedMinPrice, updatedMaxPrice];
      setFilters({
        ...filters,
        minPrice: updatedMinPrice,
        maxPrice: updatedMaxPrice,
        sliderRange: newSliderRange,
      });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const categories = [
    "fiction",
    "romance",
    "philosophy",
    "thriller",
    "programming",
  ];

  // SORTING PRODUCTS
  const sortProducts = (filteredProducts) => {
    if (filters.sortBy === "priceLowToHigh") {
      return filteredProducts.sort(
        (a, b) => a.discountedPrice - b.discountedPrice
      );
    } else if (filters.sortBy === "priceHighToLow") {
      return filteredProducts.sort(
        (a, b) => b.discountedPrice - a.discountedPrice
      );
    }
    return filteredProducts;
  };

  const sortedProducts = sortProducts(filteredProducts);

  // View change
  const handleViewChange = (viewType) => {
    setViewType(viewType); // Update the view type state
  };

  return (
    <div className="flex flex-wrap">
      {/* Left Column - Filters */}

      <div className="w-full md:w-1/5 p-4 sm:w-full">
        {/* Category Filtering */}
        <div className="bg-white shadow-md p-4">
          <h3 className="text-lg font-semibold ">Category</h3>
          <div className="flex flex-col   ">
            {categories.map((category) => (
              <label
                key={category}
                className=" capitalize my-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105  p-2"
              >
                <input
                  type="checkbox"
                  className="mr-2 "
                  value={category}
                  checked={filters.category.includes(category)}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        {/* Price Range Filtering */}
        <div className="bg-white shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold">Price Range</h3>
          <div className="flex items-center mt-2">
            <label htmlFor="min">Min</label>
            <input
              type="text"
              className="w-1/3 p-2 ml-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
            <span className="mx-2">-</span>
            <label htmlFor="max">Max</label>
            <input
              type="text"
              className="w-1/3 p-2 ml-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs"
              placeholder="5000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>
          <div className="flex items-center mt-4">
            <Slider
              range
              min={0}
              max={5000}
              value={[filters.minPrice, filters.maxPrice]}
              onChange={(value) => handleFilterChange("priceRange", value)}
            />
          </div>
        </div>

        {/* Rating Filtering */}
        <div className="bg-white shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold">Minimum Rating</h3>
          {/* Rating Filtering */}
          <label className="flex items-center mt-2">
            <input
              type="radio"
              name="rating"
              value="4"
              checked={filters.rating === "4"}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            />
            <FaStar className="text-yellow-500" />4 stars or above
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              name="rating"
              value="3"
              checked={filters.rating === "3"}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            />
            <FaStar className="text-yellow-500" />3 stars or above
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              name="rating"
              value="2"
              checked={filters.rating === "2"}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            />
            <FaStar className="text-yellow-500" />2 stars or above
          </label>
          <label className="flex items-center mt-2">
            <input
              type="radio"
              name="rating"
              value="1"
              checked={filters.rating === "1"}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
            />
            <FaStar className="text-yellow-500" />1 star or above
          </label>
        </div>
      </div>

      {/* Right Column - Product List */}
      <div className="w-full md:w-4/5 p-4">
        {/* Display filtered product count */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-between">
            {/* viewing  */}
            <label htmlFor="view" className="text-gray-600">
              View :
            </label>
            <div
              className={`cursor-pointer ${
                viewType === "grid" ? "text-slate-900" : "text-slate-500"
              } hover:text-slate-700`}
              onClick={() => handleViewChange("grid")}
            >
              <PiGridFourFill className="inline-block mr-2 text-lg" size={25} />
            </div>
            {/* List View Icon */}
            <div
              className={`cursor-pointer ${
                viewType === "list" ? "text-slate-900" : "text-slate-500"
              } hover:text-slate-700`}
              onClick={() => handleViewChange("list")}
            >
              <PiListFill className="inline-block mr-2 text-lg" size={25} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-light text-gray-600">
              {filteredProducts.length} Book Found
            </h2>
          </div>
          <div>
            {/* Sorting Dropdown */}
            <label htmlFor="sort" className="text-gray-600">
              Sort by:
            </label>
            <select
              id="sort"
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div
          className={`${
            viewType === "grid"
              ? "grid-cols-1 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1"
          } grid gap-4`}
        >
          {sortedProducts.map((product) =>
            viewType === "grid" ? (
              <ProductCard key={product._id} product={product} />
            ) : (
              <ProductListCard key={product._id} product={product} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
