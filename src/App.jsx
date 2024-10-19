import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import LoginPopUp from "./components/loginPopUp/LoginPopUp.jsx";
import Navbar from "./components/navbar/Navbar";
import Admin from "./pages/admin/Admin";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home.jsx";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import AddProduct from './components/admin/AddProduct/AddProduct.jsx';
import ViewOrder from './components/admin/ViewOrder/ViewOrder.jsx';
import ViewProducts from './components/admin/ViewProducts/ViewProducts.jsx';
import ViewUsers from './components/admin/ViewUsers/ViewUsers.jsx';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  //  .useLocation() is a class with a object called location have a so many properties like pathname, search, hash, state, key, and other property
  const location = useLocation();

  const isAdminRoute = location.pathname === "/admin"; //Check if the current path is "/admin"

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        {/* Conditionally render Navbar */}
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path = "/" element                   = {<Home />} />
          <Route path = "/cart" element               = {<Cart />} />
          <Route path = "/placeOrder" element         = {<PlaceOrder />} />
          <Route path = "/admin" element              = {<Admin />} />
          <Route path = "/admin/AddProduct" element   = {<AddProduct />} />
          <Route path = "/admin/ViewOrder" element    = {<ViewOrder />} />
          <Route path = "/admin/ViewProducts" element = {<ViewProducts />} />
          <Route path = "/admin/ViewUsers" element    = {<ViewUsers />} />
        </Routes>
      </div>
      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
