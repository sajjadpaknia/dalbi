import { Link } from "react-router-dom";
import classes from "./Subcategories.module.css";
import { data } from "./data";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Subcategories() {
  const [categories, setCategories] = useState(data);
  return (
    <section className={classes.container}>
      <p className={classes.mainTitle}>
        You can visit Dalbi subcategories and get special gifts. <br />{" "}
        After-sales service, free shipping, games and many other services.
      </p>
      <div className={classes.wrapper}>
        {categories.map((item) => {
          return (
            <div className={classes.item} key={item._id}>
              <Link to={item.to}>
                <figure
                  className={classes.profile}
                  style={{ background: item.bkColor }}
                >
                  <LazyLoadImage
                    effect="blur"
                    src={`/assets/images/subcategory/${item.logo}.png`}
                    alt="the woman is laughing"
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
      </div>
    </section>
  );
}
