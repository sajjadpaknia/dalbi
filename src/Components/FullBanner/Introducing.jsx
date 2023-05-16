import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "./Introducing.module.css";

export default function Introducing() {
  return (
    <section className={classes.mainContainer}>
      <div className={classes.context}>
        <p className={classes.intro}>
          Crash detection calls in help when you can't.
        </p>
        <div className={classes.subIntro}>
          <div className={classes.item}>
            <p className={classes.item__title}>Until</p>
            <p className={classes.item__content}>26 hours</p>
            <p className={classes.item__info}>play video on iPhone 14 Plus 3</p>
          </div>
          <div className={classes.item}>
            <p className={classes.item__title}>Until</p>
            <p className={classes.item__content}>20 hours</p>
            <p className={classes.item__info}>play video on iPhone 14 3</p>
          </div>
          <div className={classes.item}>
            <p className={classes.item__logo}>
              <LazyLoadImage
                effect="blur"
                src="/assets/svg/Energy.svg"
                alt=""
              />
            </p>
            <p className={classes.item__info}>
              Add a MagSafe charger for faster wireless charging 4
            </p>
          </div>
        </div>
      </div>
      <div className={classes.video}>
        <iframe
          //   width="962"
          //   height="541"
          src="https://www.youtube.com/embed/FT3ODSg1GFE"
          title="Introducing iPhone 14 Pro | Apple"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
