import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import Slider from "../../Components/Slider/Slider";
import classes from "./Home.module.css";
export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <Slider />
      </Container>
    </>
  );
}
