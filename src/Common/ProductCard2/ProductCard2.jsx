import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Badge from "../Badge/Badge";
import Rate from "../Rate/Rate";
import classes from "./ProductCard2.module.css";

export default function ProductCard2({ data }) {
  return (
    <div className={classes.card}>
      <Link to={`/product/${data.category}/${data.id}`}>
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <figure className={classes.figure}>
              <img
                src={`./assets/images/products/${data.image[0]}`}
                alt="#"
                loading="lazy"
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
