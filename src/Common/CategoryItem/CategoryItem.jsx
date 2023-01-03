import classes from "./CategoryItem.module.css";
import { Link } from "react-router-dom";

const CategoryItem = (props) => {
  return (
    <Link to={"#"} className={classes.container}>
      <div className={classes.bk}>
        <h1 className={classes.title}>{props.title}</h1>
        <p className={classes.productCount}>10 Products</p>
      </div>
      <figure className={classes.img}>
        <img src={`./assets/images/category/${props.clothes}`} alt="" />
      </figure>
    </Link>
  );
};

export default CategoryItem;
