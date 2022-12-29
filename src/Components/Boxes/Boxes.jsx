import { Link } from "react-router-dom";
import classes from "./Boxes.module.css";

const Boxes = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Link to={"#"} className={classes.figure}>
          <img src="./assets/images/box1.jpg" alt="" />
        </Link>
      </div>
      <div className={classes.box}>
        <Link to={"#"} className={classes.figure}>
          <img src="./assets/images/box3.jpg" alt="" />
        </Link>
      </div>
      <div className={classes.box}>
        <Link to={"#"} className={classes.figure}>
          <img src="./assets/images/box2.jpg" alt="" />
        </Link>
      </div>
      <div className={classes.box}>
        <Link to={"#"} className={classes.figure}>
          <img src="./assets/images/box4.jpg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Boxes;
