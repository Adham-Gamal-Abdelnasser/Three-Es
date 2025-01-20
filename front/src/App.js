import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Products from "./Components/Products/Products.jsx";
import AddProduct from "./Components/AddProduct/AddProduct.jsx";
import Customers from "./Components/Customers/Customers.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import AddCategory from "./Components/AddCategory/AddCategory.jsx";
import Units from "./Components/Units/Units.jsx";
import AddClient from "./Components/AddClient/AddClient.jsx";
import { CartContextProvider } from "./Context/CartContext.js";
import Cart from "./Components/Cart/Cart.jsx";
import { ToastContainer } from 'react-toastify';
import AddUnit from "./Components/AddUnit/AddUnit.jsx";
import ProductsLayout from "./Components/ProductsLayout/ProductsLayout.jsx";
import { CategoryContextProvider } from "./Context/CategoryContext.js";
import ProductByCategory from "./Components/ProductByCategory/ProductByCategory.jsx";
import RoomByUnit from "./Components/RoomByUnit/RoomByUnit.jsx";
import AddRoom from "./Components/AddRoom/AddRoom.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import { RoomContextProvider } from "./Context/RoomContext.js";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import CartCalculations from "./Components/CartOperation/CartOperation.jsx";
import Invoice from "./Components/Invoice/Invoice.jsx";
import Order from "./Components/Order/Order.jsx";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Products /> },
        { path: "products", element: <ProductsLayout /> , children:[
          { path: "", element: <Products /> },
          { path: ":id", element: <ProductByCategory /> },
        ]},
        { path: "addProduct", element: <AddProduct /> },
        { path: "addClient", element: <AddClient /> },
        { path: "*", element: <NotFound /> },
        { path: "addUnit", element: <AddUnit /> },
        { path: "product/:productDetailedId", element: <ProductDetails /> },
        { path: "addRoom", element: <AddRoom /> },
        { path: "customers", element: <Customers /> },
        { path: "cart", element: <Cart /> },
        { path: "calculate-cart", element: <CartCalculations /> },
        { path: "get-invoice", element: <Invoice /> },
        { path: "order", element: <Order /> },
        { path: "checkout", element: <Checkout /> },
        { path: "categories", element: <Categories /> },
        { path: "addCategory", element: <AddCategory /> },
        { path: "units", element: <Units /> , children:[
          {path:":unitId" , element: <RoomByUnit></RoomByUnit>}
        ] },
        
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <RoomContextProvider>
        <CategoryContextProvider>
            <ToastContainer></ToastContainer>
            <RouterProvider router={routers}></RouterProvider>
        </CategoryContextProvider>
      </RoomContextProvider>
    </CartContextProvider>
  );
}

export default App;
