import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import Layout from './ui/Layout.jsx'
import Cancel from "./pages/Cancel.jsx";
import Cart from "./pages/Cart.jsx";
import Category from "./pages/Category.jsx";
import Favorite from "./pages/Favorite.jsx";
import NotFound from "./pages/NotFound.jsx";
import Orders from "./pages/Orders.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./pages/Profile.jsx";
import Success from "./pages/Success.jsx";

const RouterLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ], 
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
