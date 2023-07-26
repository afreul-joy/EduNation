import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">EDUNATION Bookstore</h2>
            <p className="text-sm">
              At EDUNATION Bookstore, we are passionate about books and
              committed to providing the best reading experience for all book
              lovers.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Email: contact@edunationbooks.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
            <p className="text-sm">
              Address: 1234 Bookstore Ave, City, Country
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Explore</h3>
            <ul className="text-sm">
              <li className="mb-1">
                <Link to="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/browse" className="text-white hover:text-gray-300">
                  Browse Books
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/about" className="text-white hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contact" className="text-white hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
            <p className="text-sm">
              Follow us on social media to stay up-to-date with the latest book
              releases and promotions.
            </p>
            <div className="flex mt-2">
              <a href="#" className="text-white hover:text-gray-300 mr-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 mr-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 mr-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300 mr-3">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EDUNATION Bookstore. All rights
            reserved.
          </p>
          <div className="mt-2">
            <Link to="/privacy" className="text-white hover:text-gray-300 mx-2">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white hover:text-gray-300 mx-2">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-white hover:text-gray-300 mx-2">
              FAQ
            </Link>
            <Link
              to="/shipping"
              className="text-white hover:text-gray-300 mx-2"
            >
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
