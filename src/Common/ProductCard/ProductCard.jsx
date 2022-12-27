import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import Rate from "../Rate/Rate";
import classes from "./ProductCard.module.css";

export default function ProductCard() {
  return (
    <div className={classes.card}>
      <Link to={"#"}>
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <figure className={classes.figure}>
              <img
                src="./assets/images/products/Shoes/Nike/Pic-1/Pic-1.jpg"
                alt=""
              />
            </figure>
          </div>
          <div className={classes.info}>
            <div className={classes.title}>
              <h1>iPhone 13 Pro A2639 - Dual SIM - 6 GB - 256 GB</h1>
            </div>
            <div className={classes.details}>
              <Rate />
              <Badge />
            </div>
            <div className={classes.price}>
              <p className={classes.priceWrapper}>
                <span className={classes.dollar}>$</span>
                <span className={classes.priceNumber}>680</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
