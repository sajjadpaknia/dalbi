import axios from "axios";
import { useEffect, useState } from "react";

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
export default function Home() {
  const [phones, setPhones] = useState();
  const [topProducts, setTopProducts] = useState();
  useEffect(() => {
    const getItems = async () => {
      await axios.get("/products").then((res) => {
        setPhones(
          res.data.filter((item) => {
            return item.category === "phone";
          })
        );
        setTopProducts(
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
        {topProducts && (
          <Slides
            title={"Todays best deals for you!"}
            bkColor={"--color-blue-gray-bk"}
            products={topProducts}
          />
        )}
        <Boxes />
        <ProductCategories />
        <HugeBanner />
        <TopBrands />
        <WideBanner />
        {topProducts && (
          <Slides
            title={"Weekly popular products"}
            bkColor={"--color-blue-gray-bk"}
            products={topProducts}
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
