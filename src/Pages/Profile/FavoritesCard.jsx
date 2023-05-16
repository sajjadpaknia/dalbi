import { Link } from "react-router-dom";
import Badge from "../../Common/Badge/Badge";
import Rate from "../../Common/Rate/Rate";
import classes from "./FavoritesCard.module.css";

export default function FavoritesCard({ data }) {
  return (
    <div className={classes.card}>
      <Link to={`/explore/${data.category}/${data.id}/${data.title}`}>
        <div className={classes.wrapper}>
          <div className={classes.image}>
            <figure className={classes.figure}>
              <img
                src={`/assets/images/products/${data.image[0]}`}
                alt="#"
                loading="lazy"
              />
            </figure>
          </div>
          <div className={classes.info}>
            <div className={classes.title}>
              <h1 id="productCardTitle">{data.title}</h1>
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
