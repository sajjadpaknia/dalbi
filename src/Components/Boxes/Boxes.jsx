import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import classes from "./Boxes.module.css";
import { data } from "./data";
const Boxes = () => {
  const [boxes, setBoxes] = useState(data);
  return (
    <div className={classes.container}>
      {boxes.map((item) => {
        return (
          <div className={classes.box} key={item._id}>
            <Link to={item.to} className={classes.figure}>
              <LazyLoadImage
                src={`/assets/images/${item.background}.jpg`}
                alt=""
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Boxes;
