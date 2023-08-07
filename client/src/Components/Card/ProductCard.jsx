/* eslint-disable react/prop-types */
import React from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);
  const {
    id,
    bookName,
    author,
    originalPrice,
    discountedPrice,
    discountPercent,
    rating,
    imgSrc,
    badgeText,
  } = product;

  // Function to generate stars based on the rating
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      starsArray.push(<FaStar key={fullStars} half />);
    }

    return starsArray;
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="bg-white shadow-md overflow-hidden relative w-60 h-96 transition-transform hover:scale-105">
        {/* Heart Icon */}
        <div className="absolute top-4 right-4">
          <Link to={`/product/${id}`}>
            <AiOutlineHeart
            size={30}
            className="text-gray-400 hover:text-rose-500 transition-colors "
          />
          </Link>
        </div>

        {/* Badge */}
        <div
          className="bg-red-500 text-white px-2 py-1 top-2 left-0 t text-xs font-light absolute"
          style={{ backgroundColor: "#F44336" }}
        >
          {badgeText}
        </div>

        {/* Image */}
        <div className="p-4">
          <img
            src={imgSrc}
            alt={bookName}
            className="w-full h-40 object-contain mb-4"
          />

          {/* Content */}
          <div>
            <h3 className="text-base text-center">{bookName}</h3>
            <p className="text-gray-600 italic text-sm text-center">
              - By {author}
            </p>

            {/* Price */}
            <div className="flex items-center justify-center mt-4">
              <p>
                <b>TK {discountedPrice} &nbsp;&nbsp;</b>
                <del>TK {originalPrice}</del> &nbsp;&nbsp;
                <span className="text-rose-500 text-xs">
                  ({discountPercent}% off)
                </span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex justify-center items-center mt-2">
              <p className="text-gray-600 flex">
                {renderRatingStars(rating)}
                <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
