import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setSearchQuery, filteredProducts, searchQuery } = useContext(ShopContext);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  
    if (inputValue.trim() === "") {
      setSuggestions([...filteredProducts]);
      setSearchQuery(""); 
    } else {
      const searchTerm = inputValue.toLowerCase();
      const filteredSuggestions = filteredProducts.filter(
        (product) =>
          product.bookName.toLowerCase().includes(searchTerm) &&
          product.bookName !== searchTerm
      );
      setSuggestions([...filteredSuggestions.slice(0, 5)]);
      setSearchQuery(inputValue);
      setCurrentIndex(-1);
    }
  };
  

  const handleSearch = () => {
    if (value.trim() !== "") {
      setSearchQuery(value);
      setSuggestions([]); 
      navigate(`/shop?query=${encodeURIComponent(value)}`);
    } else {
      setSearchQuery(""); 
      setSuggestions([]); 
    }
  };
  

  const handleSuggestionClick = (product) => {
    setValue(product.bookName);
    setSearchQuery(product.bookName);
    setSuggestions([]);
    navigate(`/shop?query=${encodeURIComponent(product.bookName)}`);
  };

  const handleKeyboardNavigation = (event) => {
    if (suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % suggestions.length;
      setCurrentIndex(nextIndex);
      setValue(suggestions[nextIndex].bookName);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex =
        (currentIndex - 1 + suggestions.length) % suggestions.length;
      setCurrentIndex(prevIndex);
      setValue(suggestions[prevIndex].bookName);
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(); 
      if (currentIndex !== -1) {
        handleSuggestionClick(suggestions[currentIndex]);
      } else {
        handleSearch();
      }
    }
  };

  const handleSuggestionsMouseLeave = () => {
    setSuggestions([]); 
  };

  useEffect(() => {
    if (location.pathname !== "/shop") {
      setValue("");
      setSuggestions([]);
      setCurrentIndex(-1);
      setSearchQuery("");
    }
  }, [location.pathname, setSearchQuery]);

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
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setSuggestions(filteredProducts)}
              onKeyDown={handleKeyboardNavigation}
              className="py-2 px-4 pr-10 border bg-white text-black md:w-14 lg:w-[600px] focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 px-3 py-2 bg-slate-500 text-white"
              disabled={value.trim() === ""}
            >
              <FontAwesomeIcon icon={faSearch} size="2x" />
            </button>
            <div
              className="absolute mt-2 bg-white shadow-md md:w-14 lg:w-[600px]"
              onMouseLeave={handleSuggestionsMouseLeave} // Add this line
            >
              {suggestions.slice(0, 5).map((product, index) => (
                <div
                  key={product.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    index === currentIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(product)}
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
