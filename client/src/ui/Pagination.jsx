import React, { useEffect, useState } from 'react'
import { config } from '../../config'
import { getData } from '../lib'
import ProductCard from './ProductCard';
import ReactPaginate from 'react-paginate';

 // from site
const Items = ({ currentItems }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {currentItems &&
        currentItems.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
    </div>
  );
}



const Pagination = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      const endpoint = `${config.baseUrl}/products`;
      try {
        const data = await getData(endpoint)
        // console.log('data', data)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

   // from site
  const itemsPerPage = 15;
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart = newOffset + 1;
    setItemOffset(newOffset);  
    setItemStart(newStart);
  };


  return (
    <>
      <Items currentItems={currentItems} />
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">

       {/* from site */}
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold py-10"
          activeClassName="bg-black text-white"
        />
        <p>
          Products from {itemStart} to {Math.min(endOffset, products.length)}{" "}
          of {products.length}
        </p>
      </div>
    </>
  )
}

export default Pagination