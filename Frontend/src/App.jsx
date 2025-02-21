import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Assets/Frontend_Assets/men_banner.png";
import women_banner from "./Assets/Frontend_Assets/women_banner.png";
import kids_banner from "./Assets/Frontend_Assets/kids_banner.png";
import { ToastContainer } from "react-toastify";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders/Orders";
import Verify from "./Pages/Verify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />;
        <Route
          path="/men"
          element={<ShopCategory category="men" banner={men_banner} />}
        />
        <Route
          path="/women"
          element={<ShopCategory category="women" banner={women_banner} />}
        />
        <Route
          path="/kids"
          element={<ShopCategory category="kid" banner={kids_banner} />}
        />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
