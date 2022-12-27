import classes from "./Rate.module.css";

export default function Rate() {
  return (
    <div className={classes.container}>
      <i className="fa-solid fa-star"></i>
      <p className={classes.degree}>4.2</p>
    </div>
  );
}
