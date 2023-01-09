import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { data, gateway } from "./data";
import { useState } from "react";
export default function Footer() {
  const [list, setList] = useState(data);
  const [gateways, setGateways] = useState(gateway);
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
              {gateways.map((item) => {
                return (
                  <div className={classes.payments__item} key={item._id}>
                    <img
                      src={`./assets/images/gateways/${item.imgURL}`}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <ul className={classes.list}>
            {list.map((item, idx) => {
              return (
                <li className={classes.list__item} key={idx}>
                  <ul className={classes.subList}>
                    {item.map((i) => {
                      return (
                        <li className={classes.subList__item} key={i._id}>
                          <Link to={i.to}>{i.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
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
