import { Link } from "react-router-dom";
import classes from "./WideBanner.module.css";

const WideBanner = () => {
  return (
    <section className={classes.container}>
      <Link to={"#"}>
        <div className={classes.wrapper}>
          <div className={classes.context1}>
            <div className={classes.logo}>
              <img src="./assets/images/creativeCloud.png" alt="" />
            </div>
            <p className={classes.title}>
              The best laptops for graphic designers.
            </p>
          </div>
          <div className={classes.context2}>
            <div className={classes.logo}>
              <svg
                fill="#fff"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z" />
              </svg>
            </div>
            <p className={classes.title}>Windows 11</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default WideBanner;
