import { Link } from "react-router-dom";
import brandLogo from "../../assets/Images/EduNation.png";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const options = [
  { value: "contact", label: "Contact Us" },
  { value: "faq", label: "FAQ" },
  { value: "terms", label: "Terms & Conditions" },
  { value: "privacy", label: "Privacy Policy" },
];

const defaultOption = { value: "help", label: "Help" };

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center space-x-4">
          <div>
            <Link to="/">
              <img
                src={brandLogo}
                alt="Brand Logo"
                className="h-10 w-32 md:h-10 md:w-36"
              />
            </Link>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 pr-10 rounded-full bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="absolute right-0 top-0 bottom-0 px-3 py-2">
              <span className="text-gray-300">Search</span>
            </button>
          </div>

          <div className=" text-white">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          </div>

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
