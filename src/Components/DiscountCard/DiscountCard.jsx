import { Link } from "react-router-dom";
import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./DiscountCard.module.css";
import { data } from "./data";
import { useState } from "react";
export default function DiscountCard() {
  const [cardSate, setCardSate] = useState(data);
  return (
    <>
      <CategoryTitle>get up to 70% off</CategoryTitle>
      <section className={classes.container}>
        {cardSate.map((item) => {
          return (
            <div className={classes.card} key={item._id}>
              <Link to={item.to}>
                <div
                  className={classes.info}
                  style={{ background: item.bkColor }}
                >
                  <p className={classes.header}>Save</p>
                  <div
                    className={classes.discount}
                    style={{ color: item.textColor }}
                  >
                    <span>$</span> <p>{item.discount}</p>
                  </div>
                  <p className={classes.description}>{item.info}</p>
                </div>
                <figure className={classes.image}>
                  <img src={`./assets/images/discountCard/${item.bkImage}`} />
                </figure>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
}
