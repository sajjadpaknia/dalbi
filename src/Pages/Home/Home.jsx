import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Boxes from "../../Components/Boxes/Boxes";
import Container from "../../Components/Container/Container";
import DiscountCard from "../../Components/DiscountCard/DiscountCard";
import Header from "../../Components/Header/Header";
import ProductCategories from "../../Components/ProductCategories/ProductCategories";
import Slider from "../../Components/Slider/Slider";
import Slides from "../../Components/Slides/Slides";
import Subcategories from "../../Components/Subcategories/Subcategories";
import TopBrands from "../../Components/TopBrands/TopBrands";
import WideBanner from "../../Components/WideBanner/WideBanner";
import classes from "./Home.module.css";
export default function Home() {
  const [popularProducts, setPopularProducts] = useState();
  useEffect(() => {
    setTimeout(() => {
      const getItems = async () => {
        await axios
          .get("/products")
          .then((res) =>
            setPopularProducts(
              res.data.phone
                .sort((a, b) => b.sellCount - a.sellCount)
                .slice(0, 10)
            )
          );
      };
      getItems();
    }, 5000);
  }, []);
  return (
    <>
      <Container>
        <Header />
        <Slider />
        <Subcategories />
        <Slides
          title={"Todays best deals for you!"}
          bkColor={"--color-blue-gray-bk"}
          products={popularProducts}
        />
        <Boxes />
        <ProductCategories />
        <TopBrands />
        <WideBanner />
        <Slides
          title={"Weekly popular products"}
          bkColor={"--color-blue-gray-bk"}
          products={popularProducts}
        />
        <DiscountCard />
      </Container>
    </>
  );
}
