/* eslint-disable react/prop-types */
import React from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductListCard = ({ product }) => {
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
    <Link to={`/product/${id}`} className="flex items-start space-x-4 p-4 border-b border-gray-200">
      {/* Image */}
      <img src={imgSrc} alt={bookName} className="w-24 h-32 object-contain" />

      {/* Content */}
      <div className="flex-grow">
        <h3 className="text-base">{bookName}</h3>
        <p className="text-gray-600 italic text-sm">- By {author}</p>

        {/* Price */}
        <div className="mt-2">
          <p>
            <b>TK {discountedPrice}</b>
            <span className="text-rose-500 text-xs ml-2">
              ({discountPercent}% off)
            </span>
          </p>
          <p>
            <del>TK {originalPrice}</del>
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {renderRatingStars(rating)}
          <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
        </div>
      </div>

      {/* Heart Icon */}
      <Link to={`/product/${id}`} className="text-gray-400 hover:text-rose-500">
        <AiOutlineHeart size={30} />
      </Link>

      {/* Badge */}
      <div
        className="bg-red-500 text-white px-2 py-1 text-xs font-light"
        style={{ backgroundColor: "#F44336" }}
      >
        {badgeText}
      </div>
    </Link>
  );
};

export default ProductListCard;
