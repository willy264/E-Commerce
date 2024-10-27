import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegStar, FaStar } from 'react-icons/fa'
import { LuArrowLeftRight } from "react-icons/lu";
import { store } from '../lib/store';
import toast from 'react-hot-toast';


const ProductCardSideNav = ({ product }) => {

  const { addToFavorite, favoriteProduct } = store();
  const [existingProduct, setExistingProduct] = useState(
    null
  );

  const handleFavorite = () => {
    if (product) {
      console.log('existingProduct', existingProduct)
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct ? `${product.name.substring(0, 10)} removed successfully!` : `${product.name.substring(0, 10)} added successfully!`
        );
      });
    }
  };
  useEffect(() => {
    const availableItem = favoriteProduct.find((item) => item._id === product._id) // checking if the products in favorite if ... equal to ... then saving in a constant
    setExistingProduct(availableItem || null)
  }, [product, favoriteProduct]) // when ever we change the data or the favourite item

  return (
    <div className="absolute md:right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300 right-10">
      <span
        onClick={handleFavorite}
        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
        {existingProduct ? <FaStar /> : <FaRegStar />}
        </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <LuArrowLeftRight />
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <FaRegEye />
      </span>
    </div>
  )
}

export default ProductCardSideNav