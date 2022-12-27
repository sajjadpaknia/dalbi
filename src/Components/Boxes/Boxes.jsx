import classes from "./Boxes.module.css";

const Boxes = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <figure className={classes.figure}>
           <img src="./assets/images/box1.jpg" alt="" />
        </figure>
      </div>
      <div className={classes.box}>
        <figure className={classes.figure}>
           <img src="./assets/images/box1.jpg" alt="" />
        </figure>
      </div>
      <div className={classes.box}>
        <figure className={classes.figure}>
           <img src="./assets/images/box1.jpg" alt="" />
        </figure>
      </div>
      <div className={classes.box}>
        <figure className={classes.figure}>
           <img src="./assets/images/box1.jpg" alt="" />
        </figure>
      </div>
    </div>
  );
};

export default Boxes;
