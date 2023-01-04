import { Link } from "react-router-dom";
import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./TopBrands.module.css";

const TopBrands = () => {
  return (
    <>
      <CategoryTitle>Choose by brand</CategoryTitle>
      <section className={classes.container}>
        <div
          className={classes.item}
          style={{ background: "rgba(92, 0, 230, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/apple.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Apple</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: "rgba(0, 158, 55, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/asus.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Asus</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: "rgba(230, 0, 92, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/canon.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Canon</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: " rgba(0, 165, 230, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/microsoft.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Microsoft</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: "rgba(230, 0, 0, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/huawei.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Huawei</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: "rgba(19, 0, 230, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/samsung.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>Samsung</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: "rgba(230, 123, 0, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/hp.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>hp</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
        <div
          className={classes.item}
          style={{ background: "rgba(207, 0, 230, 0.2)" }}
        >
          <Link to={"#"}>
            <figure className={classes.profile}>
              <img
                src="./assets/images/brands/dell.png"
                alt="the woman is laughing"
              />
            </figure>
            <div className={classes.info}>
              <h1 className={classes.title}>dell</h1>
              <p className={classes.subTitle}>Delivery with in 24 hours</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default TopBrands;
