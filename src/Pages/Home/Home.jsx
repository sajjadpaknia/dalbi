import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Boxes from "../../Components/Boxes/Boxes";
import Container from "../../Components/Container/Container";
import DiscountCard from "../../Components/DiscountCard/DiscountCard";
import Footer from "../../Components/Footer/Footer";
import Introducing from "../../Components/FullBanner/Introducing";
import Header from "../../Components/Header/Header";
import HugeBanner from "../../Components/HugeBanner/HugeBanner";
import ProductCategories from "../../Components/ProductCategories/ProductCategories";
import Slider from "../../Components/Slider/Slider";
import Slides from "../../Components/Slides/Slides";
import Subcategories from "../../Components/Subcategories/Subcategories";
import TopBrands from "../../Components/TopBrands/TopBrands";
import TopCellPhones from "../../Components/TopCellPhones/TopCellPhones";
import WideBanner from "../../Components/WideBanner/WideBanner";
import classes from "./Home.module.css";
export default function Home() {
  const [phones, setPhones] = useState();
  const [topSellPhones, setTopSellPhones] = useState();
  useEffect(() => {
    const getItems = async () => {
      await axios.get("/products").then((res) => {
        setPhones(res.data);
        setTopSellPhones(
          res.data.sort((a, b) => b.sellCount - a.sellCount).slice(0, 10)
        );
      });
    };
    getItems();
  }, []);

  return (
    <>
      <Container>
        <Header />
        <Slider />
        <Subcategories />
        {topSellPhones && (
          <Slides
            title={"Todays best deals for you!"}
            bkColor={"--color-blue-gray-bk"}
            products={topSellPhones}
          />
        )}
        <Boxes />
        <ProductCategories />
        <HugeBanner />
        <TopBrands />
        <WideBanner />
        {topSellPhones && (
          <Slides
            title={"Weekly popular products"}
            bkColor={"--color-blue-gray-bk"}
            products={topSellPhones}
          />
        )}
        <DiscountCard />
        <Introducing />

        {phones && <TopCellPhones products={phones} />}

        <Footer />
      </Container>
    </>
  );
}
