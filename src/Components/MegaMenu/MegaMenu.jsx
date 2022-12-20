import { Link } from "react-router-dom";
import { galleryData } from "./Data";
import { servicesData } from "./Data";
import classes from "./MegaMenu.module.css";
export default function MegaMenu({ setMegaMenuState, megaMenuState }) {
  return (
    <>
      <div className={`${classes.menu} ${megaMenuState ? classes.show : null}`}>
        <div
          className={classes.close}
          onClick={() => {
            setMegaMenuState(false);
          }}
        >
          <i className="fa-regular fa-xmark"></i>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.category}>
            <div className={classes.category__title}>
              <h3>Category</h3>
            </div>
            <div className={classes.gallery}>
              {galleryData.map((item) => {
                return (
                  <Link key={item.id} to={item.to}>
                    <div className={classes.gallery__container}>
                      <div className={classes.gallery__info}>
                        <div
                          className={classes.badge}
                          style={{ background: item.badgeBKColor }}
                        >
                          <i className="fa-solid fa-circle-small"></i>
                          {item.badgeTitle}
                        </div>
                        <p className={classes.gallery__desc}>
                          {item.description}
                        </p>
                      </div>
                      <figure className={classes.gallery__bk}>
                        <img src={item.background} alt={item.alt} />
                      </figure>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={classes.group}>
            <div className={classes.subCatagories}>
              <div className={classes.category__title}>
                <h3>Dolbi Subcategories</h3>
              </div>
              <div className={classes.services}>
                {servicesData.map((item) => {
                  return (
                    <Link key={item.id} to={item.to}>
                      <div className={classes.services__container}>
                        <figure className={classes.logo}>
                          <img src={item.logo} alt={item.alt} />
                        </figure>
                        <div className={classes.info}>
                          <h3 className={classes.title}>{item.title}</h3>
                          <p className={classes.desc}>{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={classes.mobileApp}>
              <div className={classes.category__title}>
                <h3>Mobile App</h3>
              </div>
              <div className={classes.mobileAppContainer}>
                <div className={classes.mobileAppContainer__wrapper}>
                  <figure className={classes.mobileAppContainer__figure}>
                    <img src="./assets/images/shop.png" alt="" />
                  </figure>
                  <div className={classes.mobileAppContainer__group}>
                    <figure className={classes.apps}>
                      <Link to={"#"}>
                        <img src="./assets/svg/google-play.svg" alt="" />
                      </Link>
                    </figure>
                    <figure className={classes.apps}>
                      <Link to={"#"}>
                        <img src="./assets/svg/app-store.svg" alt="" />
                      </Link>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.notification}>
          <figure className={classes.profile}>
            <img
              src="./assets/images/profile/Woman.jpeg"
              alt="the woman is laughing"
            />
          </figure>
          <p className={classes.msg}>
            Enter your email address to be reminded of discounts and special
            offers.
            <span>
              <Link>Let's go.</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
