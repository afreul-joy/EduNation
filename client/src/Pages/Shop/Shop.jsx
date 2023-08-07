import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/Card/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  // Fetch products data from the JSON file using Axios
  useEffect(() => {
    axios
      .get("../../.././public//bookData.json")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap">
      {/* Right Column */}
      <div className="w-full md:w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {/* Add filter options here */}
        {/* Example: */}
        <div className="bg-white shadow-md p-4">
          <h3 className="text-lg font-semibold">Filter 1</h3>
          {/* Add filter options */}
        </div>
        <div className="bg-white shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold">Filter 2</h3>
          {/* Add filter options */}
        </div>
      </div>

      {/* Left Column */}
      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4 text-center underline   ">
          {" "}
          Number Of Products : {products.length}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
