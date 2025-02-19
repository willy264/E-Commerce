// read doc (zustand)

import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // save properties in real state, and used to getting the localstorage in browser where the firebase backend is
import { db } from "./firebase";

const customStorage = { // custom storage(for handling the localstorage) is a function that returns an object
  getItem: (name) => { // getting item
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => { // setting item
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => { // removing item
    localStorage.removeItem(name);
  },
};

export const store = create()( // create(creating a store) is a function that returns a function

  persist(
    (set) => ({ // all default(main state properties)
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct:  [],

      
      getUserInfo: async (uid) => { // getting user info
        if (!uid) return set({ currentUser: null, isLoading: false }); // not finding user

        const docRef = doc(db, "users", uid); // getting document reference, in firebase
        const docSnap = await getDoc(docRef); // getting doc snap and wait till get doc from firebase, so it will search in the doc and then the db with the name of the user and go with the uid and match our user

        try {
          if (docSnap.exists()) { // if we have the doc(the user ) we get the data
            set({ currentUser: docSnap.data(), isLoading: false });
          }
        } catch (error) {
          console.log("getUserInfo error", error);
          set({ currentUser: null, isLoading: false });
        }
      },
      addToCart: (product) => { // getting the products (sent as a prop)
        return new Promise((resolve) => {
          set((state) => {
            console.log(state)
            const existingProduct = state.cartProduct.find( // if existing pdt is available in the cart 
              (p) => p._id === product._id 
            );
            

            if (existingProduct) {
              // console.log(existingProduct)
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: (p.quantity || 0) + 1 } // add one
                    : p 
                )
              };
            } else {
              return {
                cartProduct: [
                  ...state.cartProduct,
                  { ...product, quantity: 1 },
                ],
              };
            }
          });
          resolve();
        });
      },
      decreaseQuantity: (productId) => {
        set((state) => {
          const existingProduct = state.cartProduct.find(
            (p) => p._id === productId
          );
        console.log(state)


          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p._id === productId
                  ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                  : p
              ),
            };
          } else {
            return state;
          }
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cartProduct: state.cartProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },
      resetCart: () => {
        set({ cartProduct: [] });
      },
      addToFavorite: (product) => {
        return new Promise((resolve) => { // promise indicates async operation
          set((state) => { // to update the state (updating the favorite product array)
            console.log(state)
            const isFavorite = state.favoriteProduct.some( 
              (item) => item._id === product._id // checking if the product is in the favorite list using the some method
            );
            return {
              favoriteProduct: isFavorite ? state.favoriteProduct.filter( (item) => item._id !== product._id ) : [...state.favoriteProduct, { ...product }],
              // if pdt is in the list the filter method creates a new array without the pdt, if pdt is not in the list the the spread operator creates a copy of the current favoritepdt array while the ...product adds the new pdt to the copied array
            };
          });
          resolve();
        });
      },
      removeFromFavorite: (productId) => {
        set((state) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "store-storage",
      storage: customStorage,
    }
  )
);