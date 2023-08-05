/* eslint-disable react/prop-types */
import React from "react";

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

  return (
    <div className="bg-white shadow-md overflow-hidden relative w-60 h-96">
      {/* Badge */}
      <div
        className="bg-red-500 text-white px-2 py-1 top-2 left-0 t text-xs  font-light absolute"
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
          <h3 className="text-base text-center ">{bookName}</h3>
          <p className="text-gray-600 italic text-sm text-center ">- By {author}</p>

          {/* Price */}
          <div className="flex justify-between items-center mt-4 ">
            <p>
              <b>Rs. {discountedPrice} &nbsp;&nbsp;</b>
              <del>Rs. {originalPrice}</del> &nbsp;&nbsp;
              <span className="text-rose-500 text-xs" >({discountPercent}% off)</span>
            </p>
          </div>

          {/* Rating and Add to Cart */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600">Rating: {rating}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
