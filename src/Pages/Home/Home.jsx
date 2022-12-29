import Boxes from "../../Components/Boxes/Boxes";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import Slider from "../../Components/Slider/Slider";
import Slides from "../../Components/Slides/Slides";
import classes from "./Home.module.css";
export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <Slider />
        <Slides title={"Todays best deals for you!"} bkColor={"--color-blue"} />
        <Boxes />
        <Slides title={"Top sells"} bkColor={" --color-pink"} />
      </Container>
    </>
  );
}
