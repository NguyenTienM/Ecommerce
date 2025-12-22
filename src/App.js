import "./App.css";
import Shop from "./Pages/Home/Shop";
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { ShopCategory } from "./Pages/Category/ShopCategory";
import { Product } from "./Pages/Product/Product";
import { LoginSignup } from "./Pages/Auth/LoginSignup";
import { Cart } from "./Pages/Cart/Cart";
import Men from "./Pages/Category/Men/Men";
import { Footer } from "./Components/Footer/Footer";
import AccountLayout from "./Pages/Layout/AccountLayout";
import Profile from "./Pages/Account/Profile";
import OrdersPage from "./Pages/Orders/OrdersPage";
import OrderDetail from "./Pages/Orders/OrderDetails/OrderDetail";
import ChatAi from "./Components/ChatAi/ChatAi";
import Women from "./Pages/Category/Women/Women";
import Kid from "./Pages/Category/Kid/Kid";
import CheckoutLayout from "./Pages/Checkout/CheckoutLayout/CheckoutLayout";
import CheckoutDelivery from "./Pages/Checkout/CheckoutDelivery/CheckoutDelivery";
import CheckoutPayment from "./Pages/Checkout/CheckoutPayment/CheckoutPayment";
import CheckoutSummary from "./Pages/Checkout/CheckoutSummary/CheckoutSummary";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            // element={<ShopCategory banner={men_banner} category="men" />}
            element={<Men />}
          />
          <Route path="/womens" element={<Women />} />
          <Route path="/kids" element={<Kid />} />
          <Route path="/:gender/:category" element={<ShopCategory />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/user" element={<AccountLayout />}>
            <Route path="account/profile" element={<Profile />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
          </Route>
          <Route path="/checkout" element={<CheckoutLayout />}>
            <Route path="delivery" element={<CheckoutDelivery />} />
            <Route path="payment" element={<CheckoutPayment />} />
            <Route path="summary" element={<CheckoutSummary />} />
          </Route>
        </Routes>
        <Footer />
        <ChatAi />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
