import React, { useState, useContext, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../../context/ShopContext";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const ArrowLeft = ({ onClick }) => (
  <button className="arrow-button left" onClick={onClick}>
    <BsFillArrowLeftSquareFill className="arrow-icon" />
  </button>
);

const ArrowRight = ({ onClick }) => (
  <button className="arrow-button right" onClick={onClick}>
    <BsFillArrowRightSquareFill className="arrow-icon" />
  </button>
);

const TopTen = () => {
  const { products } = useContext(ShopContext);
  const [slidesToShow, setSlidesToShow] = useState(5); // Initial value for slidesToShow

  // Update the slidesToShow value based on screen width
  const updateSlidesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      setSlidesToShow(5);
    } else if (screenWidth >= 992) {
      setSlidesToShow(4);
    } else if (screenWidth >= 768) {
      setSlidesToShow(3);
    } else if (screenWidth >= 576) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(2);
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use the dynamic value
    slidesToScroll: 1,
  };

  const goToPrevSlide = () => {
    if (slider) {
      slider.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (slider) {
      slider.slickNext();
    }
  };

  let slider; // Reference to the Slider component

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">Top Ten Books</h2>

      <div className="container mx-auto">
        <div className="slider-wrapper">
          <ArrowLeft onClick={goToPrevSlide} />
          <Slider
            ref={(c) => (slider = c)} // Set the reference
            {...sliderSettings}
            className="lg:w-[900px]  mx-auto"
          >
            {products.map((product) => (
              <div key={product.id} className="">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="lg: w-48 lg:h-72 md:h-24 mx-auto  "
                />
              </div>
            ))}
          </Slider>
          <ArrowRight onClick={goToNextSlide} />
        </div>
      </div>
    </div>
  );
};

export default TopTen;
