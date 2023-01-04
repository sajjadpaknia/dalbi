import { Link } from "react-router-dom";
import classes from "./Subcategories.module.css";

export default function Subcategories() {
  return (
    <section className={classes.container}>
      <p className={classes.mainTitle}>
        You can visit Dalbi subcategories and get special gifts. <br /> After-sales
        service, free shipping, games and many other services.
      </p>
      <div className={classes.wrapper}>
        <div className={classes.item}>
          <Link to={"#"}>
            <figure className={`${classes.profile} ${classes.elite}`}>
              <img
                src="./assets/images/subcategory/elite.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Dalbi Elite</h1>
              <p className={classes.subTitle}>
                Multi-tasking, gaming or binge watching your favorite.
              </p>
            </div>
          </Link>
        </div>
        <div className={classes.item}>
          <Link to={"#"}>
            <figure className={`${classes.profile} ${classes.pro}`}>
              <img
                src="./assets/images/subcategory/pro.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Dalbi Pro</h1>
              <p className={classes.subTitle}>
                Follow your after-sales service and special offers.
              </p>
            </div>
          </Link>
        </div>
        <div className={classes.item}>
          <Link to={"#"}>
            <figure className={`${classes.profile} ${classes.club}`}>
              <img
                src="./assets/images/subcategory/club.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Dalbi Club</h1>
              <p className={classes.subTitle}>
                Free shipping, product insurance and choice of shipping method.
              </p>
            </div>
          </Link>
        </div>
        <div className={classes.item}>
          <Link to={"#"}>
            <figure className={`${classes.profile} ${classes.time}`}>
              <img
                src="./assets/images/subcategory/time.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Dalbi Time</h1>
              <p className={classes.subTitle}>
                Return or sell the product you bought without any hassle.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
