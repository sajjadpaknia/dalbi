import { useState } from "react";
import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./ProductCategories.module.css";
import { data } from "./data";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const ProductCategories = () => {
  const [categoryData, setCategoryData] = useState(data);
  return (
    <>
      <CategoryTitle>Shop our top categories</CategoryTitle>
      <div className={classes.container}>
        {categoryData.map((item) => {
          return (
            <Link
              to={`explore/${item.to}`}
              className={classes.wrapper}
              key={item._id}
            >
              <div className={classes.bk}>
                <h1 className={classes.title}>{item.title}</h1>
                <p className={classes.productCount}>
                  {item.productsCount} Products
                </p>
              </div>
              <figure className={classes.img}>
                <LazyLoadImage
                  effect="blur"
                  src={`/assets/images/category/${item.image}`}
                  alt=""
                />
              </figure>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProductCategories;
