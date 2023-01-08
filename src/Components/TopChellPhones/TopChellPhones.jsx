import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";
import classes from "./TopChellPhones.module.css";
import ProductCard2 from "../../Common/ProductCard2/ProductCard2";
import { Link } from "react-router-dom";
export default function TopChellPhones() {
  const list = document.getElementById("barndList");
  const items = document.querySelectorAll(`[data-name="menu-item"]`);
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
  const obj = {
    badge: "new",
    rate: 4.8,
    price: 104.8,
    title: "Apple",
    image: {
      mainImage: "Cell-Phones/Apple/Pic-1/Pic-1.jpg",
    },
  };
  return (
    <section className={classes.container}>
      <CategoryTitle>The best phones according to users</CategoryTitle>
      <div className={classes.brands}>
        <ul className={classes.list} id={"barndList"}>
          <li
            className={classes.list__item}
            data-name={"menu-item"}
            id="brandActive"
            style={{ color: "var(--color-primary)" }}
          >
            All
          </li>
          <li className={classes.list__item} data-name={"menu-item"}>
            Apple
          </li>
          <li className={classes.list__item} data-name={"menu-item"}>
            Samsung
          </li>
          <li className={classes.list__item} data-name={"menu-item"}>
            Huawei
          </li>
          <li className={classes.list__item} data-name={"menu-item"}>
            Nokia
          </li>
          <li className={classes.list__item} data-name={"menu-item"}>
            Xiaomi
          </li>
          <li className={classes.list__item} data-name={"menu-item"}>
            Motorola
          </li>
          <div className={classes.circle} id="circle"></div>
        </ul>
      </div>
      <div className={classes.wrapper}>
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
        <ProductCard2 data={obj} />
      </div>
      <div className={classes.footer}>
        <Link to={"#"}>
          see more <i className="fa-regular fa-chevron-right"></i>
        </Link>
      </div>
    </section>
  );
}
