import { Link } from "react-router-dom";
import { Zoom, Rotate } from "react-reveal";
import banner from "../../../src/Assets/Images/banner.jpg";

const Banner = () => {
  return (
    <div className="bg-gray-100 py-16 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2">
            <Zoom>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-4 transition-transform duration-500 transform hover:scale-105">
                Welcome to <span className="text-teal-600">EDUNATION</span>{" "}
                Bookstore
              </h1>
            </Zoom>
            <Zoom delay={300}>
              <p className="text-lg md:text-xl text-gray-700 mb-6 transition-opacity duration-500 opacity-70 hover:opacity-100">
                Explore a vast collection of books for all ages and interests.
              </p>
            </Zoom>
            <Zoom delay={600}>
              <Link to="/shop">
                <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-bold shadow-md transition-colors duration-300">
                  Browse Books
                </button>
              </Link>
            </Zoom>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <Rotate>
              <div className="animate-zoom-rotate">
                <img
                  src={banner}
                  alt="Banner"
                  className="w-full rounded-lg shadow-md border-2 border-gray-300"
                />
              </div>
            </Rotate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
