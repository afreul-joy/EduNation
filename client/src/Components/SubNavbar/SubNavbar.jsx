import { Link } from "react-router-dom";

const SubNavbar = () => {
  return (
    <div className="bg-gray-200 text-center">
      <ul className="flex  justify-center space-x-4 ">
        <li>
          <Link
            to="/coming"
            className="hover:text-orange-500 transition-colors"
          >
            Today's Deals
          </Link>
        </li>
        <li>
          <Link
            to="/coming"
            className="hover:text-orange-500 transition-colors"
          >
            DONATION
          </Link>
        </li>
        <li>
          <Link
            to="/coming"
            className="hover:text-orange-500 transition-colors"
          >
            CUSTOMER CARE
          </Link>
        </li>
        <li>
          <Link
            to="/coming"
            className="hover:text-orange-500 transition-colors"
          >
            Gift Cards
          </Link>
        </li>
        <li>
          <Link
            to="/coming"
            className="hover:text-orange-500 transition-colors"
          >
            SIGNUP / LOGIN
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubNavbar;
