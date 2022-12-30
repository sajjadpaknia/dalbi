import classes from "./Rate.module.css";

export default function Rate({rate}) {
  return (
    <div className={classes.container}>
      <i className="fa-solid fa-star"></i>
      <p className={classes.degree}>{rate}</p>
    </div>
  );
}
