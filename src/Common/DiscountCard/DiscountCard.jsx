import { Link } from "react-router-dom";
import CategoryTitle from "../CategoryTitle/CategoryTitle";
import classes from "./DiscountCard.module.css";

export default function DiscountCard() {
  return (
    <>
      <CategoryTitle>get up to 70% off</CategoryTitle>
      <section className={classes.container}>
        <div className={`${classes.card} ${classes.yellow}`}>
          <Link to={"#"}>
            <div className={classes.info}>
              <p className={classes.header}>Save</p>
              <p className={classes.discount}>
                <span>$</span> <p>100</p>
              </p>
              <p className={classes.description}>
                Explore our furniture & home furnishing range.
              </p>
            </div>
            <figure className={classes.image}>
              <img src="./assets/images/discountCard/sofa.jpg" alt="" />
            </figure>
          </Link>
        </div>
        <div className={`${classes.card} ${classes.red}`}>
          <Link to={"#"}>
            <div className={classes.info}>
              <p className={classes.header}>Save</p>
              <p className={classes.discount}>
                <span>$</span> <p>29</p>
              </p>
              <p className={classes.description}>
                Enjoy discount all types of books & gadgets item.
              </p>
            </div>
            <figure className={classes.image}>
              <img src="./assets/images/discountCard/book.jpg" alt="" />
            </figure>
          </Link>
        </div>
        <div className={`${classes.card} ${classes.brown}`}>
          <Link to={"#"}>
            <div className={classes.info}>
              <p className={classes.header}>Save</p>
              <p className={classes.discount}>
                <span>$</span> <p>67</p>
              </p>
              <p className={classes.description}>
                explore our all types dresses for men.
              </p>
            </div>
            <figure className={classes.image}>
              <img src="./assets/images/discountCard/clothes.jpg" alt="" />
            </figure>
          </Link>
        </div>
        <div className={`${classes.card} ${classes.green}`}>
          <Link to={"#"}>
            <div className={classes.info}>
              <p className={classes.header}>Save</p>
              <p className={classes.discount}>
                <span>$</span> <p>59</p>
              </p>
              <p className={classes.description}>
                enjoy discount all types of educational accessories.
              </p>
            </div>
            <figure className={classes.image}>
              <img src="./assets/images/discountCard/bag.jpg" alt="" />
            </figure>
          </Link>
        </div>
      </section>
    </>
  );
}
