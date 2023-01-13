import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import Rate from "../Rate/Rate";
import classes from "./ProductCard.module.css";

// let title = document.querySelectorAll("#productCardTitle");
export default function ProductCard({ data }) {
  return (
    <div className={classes.card}>
      <Link to={"#"}>
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <figure className={classes.figure}>
              <LazyLoadImage
                src={`./assets/images/products/${data.image.mainImage}`}
                alt="#"
                effect="blur"
              />
            </figure>
          </div>
          <div className={classes.info}>
            <div className={classes.title}>
              <h1 id="productCardTitle">
                {data.title}
                {/* {title.map((item) => {
                  return item.textContent.substring(0, 20) + "...";
                })} */}
              </h1>
            </div>
            <div className={classes.details}>
              <Rate rate={data.rate} />
              <Badge title={data.badge} />
            </div>
            <div className={classes.price}>
              <p className={classes.priceWrapper}>
                <span className={classes.dollar}>$</span>
                <span className={classes.priceNumber}>{data.price}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
