import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { products } from "./data";
axios.defaults.baseURL = "http://localhost:4433";
async function post() {
  console.log(JSON.stringify(products));
  await axios
    .post("/products", products)
    .then((res) => console.log(res));
}
post();
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
