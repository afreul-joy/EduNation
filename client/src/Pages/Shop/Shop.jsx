import { useContext } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import { ShopContext } from "../../context/ShopContext";
import { FaStar } from "react-icons/fa";

const Shop = () => {
  const { products, filters, setFilters } = useContext(ShopContext);

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
    } else if (filterType === "maxPrice") {
      // Convert the value to a number and update the filter
      const newValue = parseInt(value);
      setFilters({ ...filters, [filterType]: newValue });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const categories = ["fiction", "romance", "philosophy", "thriller", "romance","programming",]; // Add more categories
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
            <input
              type="number"
              className="w-1/3 p-2 mr-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs" 
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
            <span className="mx-2">-</span>
            <input
              type="number"
              className="w-1/3 p-2 ml-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-xs"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>
          {/* Price Range Bar */}
          <div className="flex items-center mt-4">
            <input
              type="range"
              className="w-full"
              min="1"
              max="1000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
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
