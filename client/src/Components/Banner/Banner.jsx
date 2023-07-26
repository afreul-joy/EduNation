import banner from "../../../src/Assets/Images/banner.jpg";
import "./banner.css";
const Banner = () => {
  return (
    <div className="bg-white py-16 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Welcome to <span className="text-gray-800">EDUNATION</span> Bookstore
            </h1>
            <p className="text-lg md:text-xl text-black mb-6">
              Explore a vast collection of books for all ages and interests.
            </p>
            <button className="bg-black text-white hover:bg-white hover:text-black py-2 px-6 rounded-lg font-bold shadow-md">
              Browse Books
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="animate-zoom-rotate">
              <img
                src={banner}
                alt="Banner"
                className="w-full rounded-lg shadow-md border-2 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
