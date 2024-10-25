import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { store } from '../lib/store';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';

const AddToCartBtn = ({className, title, product}) => {

  const newClassName = twMerge(
    "bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer",
    className
  );

  const [existingProduct, setExistingProduct] = useState(null);
  const { addToCart, cartProduct, decreaseQuantity } = store();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name.substring(0, 10)} added successfully!`); // when the small popup shows the title of the product is not more than 10 words
    } else {
      toast.error("Product is undefined!");
    }
  };

  useEffect(() => { // checking if we have the product
    const availableItem = cartProduct.find(
      (item) => item._id === product._id
    );
    setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        decreaseQuantity(existingProduct._id);
        toast.success(
          `${product.name.substring(0, 10)} decreased successfully`
        );
      } else {
        toast.error("You can not decrease less than 1");
      }
    } else { 
    }
  };

  // const getRegularPrice = () => {
  //   if (existingProduct) {
  //     if (product) {
  //       return product?.regularPrice * existingProduct?.quantity;
  //     }
  //   } else {
  //     return product?.regularPrice;
  //   }
  // };

  // const getDiscountedPrice = () => {
  //   if (existingProduct) {
  //     if (product) {
  //       return product?.discountedPrice * product?.quantity;
  //     }
  //   } else {
  //     return product?.discountedPrice;
  //   }
  // };

  return (
    <>
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={newClassName}>
          {title ? title : "Add to cart"}
        </button>
      )}
    </>

  )
}

export default AddToCartBtn