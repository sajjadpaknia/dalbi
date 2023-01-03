import axios from "axios";
import { useEffect, useState } from "react";
import Boxes from "../../Components/Boxes/Boxes";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import ProductCategories from "../../Components/ProductCategories/ProductCategories";
import Slider from "../../Components/Slider/Slider";
import Slides from "../../Components/Slides/Slides";
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
        <Slides
          title={"Todays best deals for you!"}
          bkColor={"--color-blue-gray-bk"}
          products={popularProducts}
        />
        <Boxes />
        <ProductCategories />
        <Slides
          title={"Top sells"}
          bkColor={" --color-pink"}
          products={popularProducts}
        />
      </Container>
    </>
  );
}
