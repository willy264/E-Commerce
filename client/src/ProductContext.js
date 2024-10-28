import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);

    return (
      <ProductContext.Provider value={{ product, setProduct }}>
        {children}
      </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);