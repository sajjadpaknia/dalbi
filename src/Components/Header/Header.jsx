import classes from "./Header.module.css";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Search from "../Search/Search";
import UserDropdown from "../UserDropdown/UserDropdown";
import MegaMenu from "../MegaMenu/MegaMenu";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Header() {
  // If "megaMenuState" is "true", "Mega menu" will be displayed.
  const [megaMenuState, setMegaMenuState] = useState(false);
  // If "userDropdown" is "true", "User dropdown" will be displayed.
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef();
  const userBtnRef = useRef();
  // When "Mega menu" is displayed, the "Scrolls of Body" must be disabled for "Mega menu" to be displayed correctly.
  const [getUser, setGetUser] = useState();
  const { category } = useParams();
  useEffect(() => {
    setGetUser(JSON.parse(localStorage.getItem("auth-user")));
  }, [category]);
  useEffect(() => {
    if (megaMenuState) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflowY = "visible";
    document.body.style.overflowX = "hidden";
    document.body.style.height = "auto";
  }, [megaMenuState]);
  // Closing the "User dropdown" when the user clicks outside of it
  window.addEventListener("click", (e) => {
    if (e.target !== dropdownRef.current && e.target !== userBtnRef.current) {
      setUserDropdown(false);
    }
  });
  // Codes
  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__container}>
          <figure className={classes.logo}>
            <Link to={"/"}>
              <LazyLoadImage
                effect="blur"
                src="http://127.0.0.1:3000/assets/svg/light-logo.svg"
                alt="logo"
              />
            </Link>
          </figure>
          <div className={classes.search}>
            <Search />
          </div>
          <div className={classes.buttonGroup}>
            <div className={classes.buttonGroup__btn}>
              <div
                className={classes.absoluteBtn}
                onClick={() => {
                  setMegaMenuState(true);
                }}
              ></div>
              <i className="fa-regular fa-grid-2"></i>
            </div>
            <div className={classes.buttonGroup__btn}>
              <div className={classes.cartWrapper}>
                <Link to={"/cart"}>
                  {getUser && getUser.dashboard.cart.length > 0 ? (
                    <span className={classes.CartCount}>
                      {getUser.dashboard.cart.length}
                    </span>
                  ) : (
                    ""
                  )}
                  <i className="fa-regular fa-cart-shopping"></i>
                </Link>
              </div>
            </div>

            <div className={classes.buttonGroup__btn}>
              <div
                className={classes.absoluteBtn}
                onClick={() => {
                  setUserDropdown(!userDropdown);
                }}
                ref={userBtnRef}
              ></div>
              <i className="fa-regular fa-user"></i>
            </div>

            <UserDropdown dropdownRef={dropdownRef} state={userDropdown} />
          </div>

          <MegaMenu
            setMegaMenuState={setMegaMenuState}
            megaMenuState={megaMenuState}
          />
        </div>
      </header>
      {/* The dark background behind "Mega menu" that closes "Mega menu" when clicked. */}
      <div
        className={`${classes.backdrop} ${megaMenuState ? classes.show : null}`}
        onClick={() => {
          setMegaMenuState(false);
        }}
      ></div>
    </>
  );
}
