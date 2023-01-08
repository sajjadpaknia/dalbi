import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.container}>
      <section className={classes.top}>
        <div className={classes.left}>
          <div className={classes.logo}>
            <figure>
              <img src="./assets/svg/light-logo.svg" alt="" />
            </figure>
            <p>
              Dalbi's online store offers physical goods, supermarkets,
              technology and other products you need.
            </p>
          </div>
          <div className={classes.payments}>
            <h3>Accepted payments</h3>
            <div className={classes.payments__card}>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/stripe.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/visa.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/mastercard.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/amazon.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/klarna.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/paypal.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/apple.svg" alt="" />
              </div>
              <div className={classes.payments__item}>
                <img src="./assets/images/gateways/google.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <ul className={classes.list}>
            <li className={classes.list__item}>
              <ul className={classes.subList}>
                <li className={classes.subList__item}>Department</li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Fashion</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Education Product</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Frozen Food</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Beverages</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Organic Grocery</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Office Supplies</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Beauty Products</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Books</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Electronics & Gadget</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Travel Accesories</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Fitness</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Sneakers</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Toys</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Furniture</Link>
                </li>
              </ul>
            </li>
            <li className={classes.list__item}>
              <ul className={classes.subList}>
                <li className={classes.subList__item}>About us</li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>About shopcart</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Careers</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>News & Blog</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Help</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Press Center</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Shop by location</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Shopcart brands</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Affiliate & Partners</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Ideas & Guides</Link>
                </li>
              </ul>
            </li>
            <li className={classes.list__item}>
              <ul className={classes.subList}>
                <li className={classes.subList__item}>Services</li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Gift Card</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Mobile App</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Shipping & Delivery</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Order Pickup</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Account Signup</Link>
                </li>
              </ul>
            </li>
            <li className={classes.list__item}>
              <ul className={classes.subList}>
                <li className={classes.subList__item}>Help</li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Shopcart Help</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Returns</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>track orders</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>contact us</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>feedback</Link>
                </li>
                <li className={classes.subList__item}>
                  <Link to={"#"}>Security & Fraud</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      <ul className={classes.bottom}>
        <li className={classes.bottom__item}>
          <p>
            <Link to={"#"}>Terms of Use</Link>
          </p>
          <p>
            <Link to={"#"}>Privacy Policy</Link>
          </p>
        </li>
        <li className={classes.bottom__item}>
          All Right reserved by Dalbi | 2022
        </li>
      </ul>
    </footer>
  );
}
