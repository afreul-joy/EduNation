import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../../context/ShopContext";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';

const ArrowLeft = ({ onClick }) => (
  <button
    className="arrow-button left"
    onClick={onClick}
    style={{
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      position: "absolute",
      left: "0",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: "1",
    }}
  >
    <BsFillArrowLeftSquareFill className="arrow-icon" style={{ fontSize: "30px", marginLeft: '10px' }} />
  </button>
);

const ArrowRight = ({ onClick }) => (
  <button
    className="arrow-button right"
    onClick={onClick}
    style={{
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: "1",
    }}
  >
    <BsFillArrowRightSquareFill className="arrow-icon" style={{ fontSize: "30px", marginRight: '10px' }} />
  </button>
);

const TopTen = () => {
  const { products } = useContext(ShopContext);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8 mx-auto container">
      <h2 className="text-xl font-semibold mb-4">Top Ten Books</h2>

      <div className="">
        <Slider {...sliderSettings} className="">
          {products.map((product) => (
            <div
              key={product.id}
              className="px-4 "
            >
              <div className=" shadow-md bg-red-300 ">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-48 h-72  mb-2"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopTen;
