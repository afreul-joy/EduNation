import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/Images/EduNation.png";
import Select from "react-select";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const options = [
  { value: "contact", label: "Contact Us" },
  { value: "faq", label: "FAQ" },
  { value: "terms", label: "Terms & Conditions" },
  { value: "privacy", label: "Privacy Policy" },
];

const defaultOption = { value: "help", label: "Help" };

const Navbar = () => {
  return (
    <nav className="p-4 border-b ">
      <div className="container mx-auto">
        <div className="flex justify-center items-center space-x-4">
          {/* 1st column   */}
          <div className="text-2xl font-bold">
            <Link to="/">EduNation</Link>
          </div>
          {/* 2nd column   */}
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 pr-10 border bg-white text-black "
              style={{ width: "600px" }} // Set your custom width here
            />
            <button className="absolute right-0 top-0 bottom-0 px-3 py-2 bg-slate-500 text-white">
              <FontAwesomeIcon icon={faSearch} size="2x" />
            </button>
          </div>

          <div className="text-black">
            <AiOutlineShoppingCart className="text-3xl" /> {/* Use text sizing class */}
          </div>

          {/* 3rd column   */}
          {/* Select */}
          <div className="w-32">
            <Select
              options={options}
              defaultValue={defaultOption}
              className="text-black"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
