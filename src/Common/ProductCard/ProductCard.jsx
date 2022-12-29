import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import Rate from "../Rate/Rate";
import classes from "./ProductCard.module.css";

// let title = document.querySelectorAll("#productCardTitle");
export default function ProductCard() {
  return (
    <div className={classes.card}>
      <Link to={"#"}>
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <figure className={classes.figure}>
              <img
                src="./assets/images/products/Clothing/Nike/Pic-4/Pic-1.jpg"
                alt=""
              />
            </figure>
          </div>
          <div className={classes.info}>
            <div className={classes.title}>
              <h1 id="productCardTitle">
                iPhone 13 Pro A2639 - Dual SIM - 6 GB - 256 GB
                {/* {title.map((item) => {
                  return item.textContent.substring(0, 20) + "...";
                })} */}
              </h1>
            </div>
            <div className={classes.details}>
              <Rate />
              <Badge />
            </div>
            <div className={classes.price}>
              <p className={classes.priceWrapper}>
                <span className={classes.dollar}>$</span>
                <span className={classes.priceNumber}>680</span>
                <span className={classes.cent}>.99</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
