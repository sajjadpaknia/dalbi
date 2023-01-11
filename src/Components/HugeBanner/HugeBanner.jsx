import { Link } from "react-router-dom";
import classes from "./HugeBanner.module.css";

export default function HugeBanner() {
  return (
    <section className={classes.container}>
        <div className={classes.box}>
          <h1>Get 5% Cash Back On $200</h1>
          <p>
            Shopping is a bit of a relaxing hobby for me, which is sometimes
            troubling for the bank balance.
          </p>

          <button>
            <Link to={"#"}>Learn More</Link>
          </button>
        </div>
    </section>
  );
}
