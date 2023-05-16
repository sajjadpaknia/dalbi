import { Link } from "react-router-dom";
import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./TopBrands.module.css";
import { data } from "./data";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
const TopBrands = () => {
  const [brands, setBrands] = useState(data);
  return (
    <>
      <CategoryTitle>Choose by brand</CategoryTitle>
      <section className={classes.container}>
        {brands.map((item) => {
          return (
            <div
              key={item._id}
              className={classes.item}
              style={{ background: item.bkColor }}
            >
              <Link to={item.to}>
                <figure className={classes.profile}>
                  <LazyLoadImage
                    effect="blur"
                    src={`/assets/images/brands/${item.logo}`}
                  />
                </figure>
                <div className={classes.info}>
                  <h1 className={classes.title}>{item.title}</h1>
                  <p className={classes.subTitle}>{item.info}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default TopBrands;
