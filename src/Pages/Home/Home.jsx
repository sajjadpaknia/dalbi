import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import classes from "./Home.module.css";
export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <section className={classes.slider}>
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
        </section>
      </Container>
    </>
  );
}
