import { useContext, useEffect, useState } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import { ShopContext } from "../../context/ShopContext";
import { FaStar } from "react-icons/fa";
import { PiListFill, PiGridFourFill } from "react-icons/pi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ProductListCard from "../../Components/Card/ProductListCard";
import Select from "react-select";
import Pagination from "../../Components/Pagination/Pagination";
const Shop = () => {
  const { products, filters, setFilters, clearFilters, searchQuery ,setSearchQuery} =
    useContext(ShopContext);

    const queryParam = new URLSearchParams(location.search).get("query") || "";

    useEffect(() => {
      setSearchQuery(queryParam);
      // Rest of the code remains the same
    }, [queryParam]);
  
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

  // Sort options for react-select
  const sortOptions = [
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "priceHighToLow", label: "Price: High to Low" },
  ];

  // View change
  const handleViewChange = (viewType) => {
    setViewType(viewType); // Update the view type state
  };

  //   Pagination
  const itemsPerPage = 8;
  // Update the number of total pages based on the filtered blogs
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Get the current page's data to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-wrap ">
      {/* Left Column - Filters */}

      <div className="w-full md:w-1/5 p-4 sm:w-full">
        <div className="flex justify-between mb-4">
          <h2> Filters: </h2>
          <button
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 cursor-pointer"
            onClick={clearFilters}
          >
            Reset
          </button>
        </div>
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
        {/* --------heading--------  */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          {/* Viewing Options */}
          <div className="flex justify-between mb-2 sm:mb-0">
            <label htmlFor="view" className="text-gray-600 mr-2">
              View:
            </label>
            <div
              className={`cursor-pointer ${
                viewType === "grid" ? "text-slate-900" : "text-slate-500"
              } hover:text-slate-700 mr-2 sm:mr-4`}
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
          {/* Book Count */}
          <div className="mb-2 sm:mb-0">
            <h2 className="text-xl font-light text-gray-600">
              {currentData.length} Book{currentData.length !== 1 ? "s" : ""}{" "}
              Found {searchQuery && `in "${searchQuery}"`}
            </h2>
          </div>
          {/* Sorting */}
          <div className="flex justify-end items-center space-x-2 sm:space-x-4">
            <label htmlFor="sort" className="text-gray-600 mr-2">
              Sort by:
            </label>
            <div className="text-gray-600">
              <Select
                id="sort"
                options={sortOptions}
                value={sortOptions.find(
                  (option) => option.value === filters.sortBy
                )}
                onChange={(selectedOption) =>
                  handleFilterChange("sortBy", selectedOption.value)
                }
                className=" text-black focus:ring "
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: "1px solid black",
                    boxShadow: state.isFocused ? "0 0 0 2px black" : "none",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "black" : "white",
                    color: state.isFocused ? "white" : "black",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            viewType === "grid"
              ? "grid-cols-1 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1"
          } grid gap-4`}
        >
          {currentData.map((product) =>
            viewType === "grid" ? (
              <ProductCard key={product._id} product={product} />
            ) : (
              <ProductListCard key={product._id} product={product} />
            )
          )}
        </div>
      </div>

      <div className=" mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Shop;
