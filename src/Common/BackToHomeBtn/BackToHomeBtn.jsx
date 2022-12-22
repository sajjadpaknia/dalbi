import { Link } from "react-router-dom";
import classes from "./BackToHomeBtn.module.css";

export default function BackToHomeBtn({ backToHome }) {
  return (
    <>
      {backToHome && (
        <div className={classes.backToHome}>
          <Link to={"/"}>
            <i className="fa-regular fa-chevron-left"></i>
            <p>Back to Home</p>
          </Link>
        </div>
      )}
    </>
  );
}
