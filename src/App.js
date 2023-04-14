import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import Product from "./Pages/Product/Product";
import Explore from "./Pages/Explore/Explore";
import Profile from "./Pages/Profile/Profile";
import Cart from "./Pages/Cart/Cart";
axios.defaults.baseURL = "http://localhost:4433";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:category/:id/:title" element={<Product />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile/:category" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
