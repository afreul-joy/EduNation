import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setSearchQuery, products } = useContext(ShopContext);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const searchTerm = inputValue.toLowerCase();
      const filteredSuggestions = products.filter(
        (product) =>
          product.bookName.toLowerCase().includes(searchTerm) &&
          product.bookName !== searchTerm
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); 
    }
  };

  const handleSearch = () => {
    if (value.trim() !== "") {
      setSearchQuery(value);
      navigate(`/shop?query=${encodeURIComponent(value)}`);
    }
  };

  // Reset input value when navigating away from /shop
  useEffect(() => {
    if (location.pathname !== "/shop") {
      setValue("");
    }
  }, [location.pathname]);

  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto">
        <div className="flex justify-center items-center space-x-4">
          <div className="text-2xl font-bold">
            <Link to="/">EduNation</Link>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Book..."
              value={value}
              onChange={handleInputChange}
              className="py-2 px-4 pr-10 border bg-white text-black md:w-14 lg:w-[600px] focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 px-3 py-2 bg-slate-500 text-white"
              disabled={value.trim() === ""}
            >
              <FontAwesomeIcon icon={faSearch} size="2x" />
            </button>
            <div className="absolute mt-2 bg-white  shadow-md md:w-14 lg:w-[600px]">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setValue(product.bookName);
                    setSuggestions([]);
                    handleSearch();
                  }}
                >
                  {product.bookName}
                </div>
              ))}
            </div>
          </div>
          <div className="text-black">
            <AiOutlineShoppingCart className="text-3xl" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
