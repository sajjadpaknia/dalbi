import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./TopCellPhones.module.css";
import ProductCard2 from "../../Common/ProductCard2/ProductCard2";
import { menu } from "./data";
import { Link } from "react-router-dom";
import Spinner from "../../Common/Spinner/Spinner";
import { useState } from "react";
export default function TopCellPhones(props) {
  window.onload = () => {
    const list = document.getElementById("brandList");
    const items = document.querySelectorAll(`[data-type="menu-item"]`);
    const circle = document.getElementById("circle");
    items.forEach((i) => {
      if (i.id) {
        circle.style.top =
          i.getBoundingClientRect().top -
          list.getBoundingClientRect().top +
          35 +
          "px";
        circle.style.left =
          i.getBoundingClientRect().left -
          list.getBoundingClientRect().left +
          i.getBoundingClientRect().width / 2 +
          "px";
      }
      // mouseover
      i.addEventListener("mouseover", (e) => {
        circle.style.top =
          i.getBoundingClientRect().top -
          list.getBoundingClientRect().top +
          35 +
          "px";
        circle.style.left =
          i.getBoundingClientRect().left -
          list.getBoundingClientRect().left +
          i.getBoundingClientRect().width / 2 +
          "px";
      });
      // mouseout
      i.addEventListener("mouseout", (e) => {
        items.forEach((n) => {
          if (n.id) {
            circle.style.top =
              n.getBoundingClientRect().top -
              list.getBoundingClientRect().top +
              35 +
              "px";
            circle.style.left =
              n.getBoundingClientRect().left -
              list.getBoundingClientRect().left +
              n.getBoundingClientRect().width / 2 +
              "px";
          }
        });
      });
      // click
      i.addEventListener("click", (e) => {
        items.forEach((j) => {
          j.removeAttribute("id");
          j.style.color = "inherit";
        });
        i.id = "brandActive";
        i.style.color = "var(--color-primary)";
        circle.style.left =
          i.getBoundingClientRect().left -
          list.getBoundingClientRect().left +
          i.getBoundingClientRect().width / 2 +
          "px";
      });
    });
  };
  const [topRatePhones, setTopRatePhones] = useState(
    props.products.sort((a, b) => b.rate - a.rate).slice(0, 20)
  );

  const filterPhones = (brand) => {
    if (brand === "all") {
      setTopRatePhones(
        props.products.sort((a, b) => b.rate - a.rate).slice(0, 20)
      );
      return;
    }
    setTopRatePhones(
      props.products
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 20)
        .filter((item) => item.specifications.brand === brand)
    );
  };
  return (
    <>
      {topRatePhones ? (
        <section className={classes.container}>
          <CategoryTitle>The best phones according to users</CategoryTitle>
          <div className={classes.brands}>
            <ul className={classes.list} id={"brandList"}>
              <li
                id={"brandActive"}
                onClick={() => {
                  filterPhones("all");
                }}
                className={classes.list__item}
                data-type={"menu-item"}
                style={{ color: "var(--color-primary)" }}
              >
                all
              </li>
              {menu.map((item) => {
                return (
                  <li
                    onClick={() => {
                      filterPhones(item.title);
                    }}
                    key={item._id}
                    className={classes.list__item}
                    data-type={"menu-item"}
                  >
                    {item.title}
                  </li>
                );
              })}
              <div className={classes.circle} id="circle"></div>
            </ul>
          </div>
          <div className={classes.wrapper}>
            {topRatePhones.map((item) => {
              return <ProductCard2 data={item} key={item.id} />;
            })}
          </div>
          <div className={classes.footer}>
            <Link to={"#"}>
              see more <i className="fa-regular fa-chevron-right"></i>
            </Link>
          </div>
        </section>
      ) : (
        <div className={classes.loading}>
          <Spinner size={"35px"} borderSize={"4px"} />
        </div>
      )}
    </>
  );
}
