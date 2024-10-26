// read doc

import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // save properties in real state, and used to getting the localstorage in browser where the firebase backend is
import { db } from "./firebase";


const customStorage = {
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
export const store = create()(
  persist(
    (set) => ({ // all default
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct:  [],

      getUserInfo: async (uid) => {
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
      addToCart: (product) => { // getting the products
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
        return new Promise((resolve) => {
          set((state) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id
            );
            return {
              favoriteProduct: isFavorite ? state.favoriteProduct.filter( (item) => item._id !== product._id ) : [...state.favoriteProduct, { ...product }],
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