import classes from "./Badge.module.css";

export default function Badge({ title }) {
  let color;

  if (title === "new") {
    color = "#04d19d";
  } else if (title === "original") {
    color = "#ee0034";
  } else if (title === "bestseller") {
    color = "#00acee";
  } else if (title === "non original") {
    color = "#ee6b00";
  } else if (title === "fresh") {
    color = "#8106C4";
  }
  return (
    <>
      {title && (
        <div className={classes.container} style={{ background: color }}>
          {title}
        </div>
      )}
    </>
  );
}
