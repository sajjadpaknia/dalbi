import { useState } from "react";
import { useEffect } from "react";
import classes from "./FilterBrands.module.css";

export default function FilterItem(props) {
  useEffect(() => {
    const filter_input = document.querySelectorAll(
      "input[name='brand_filter']"
    );
    filter_input.forEach((element) => {
      element.checked = false;
    });
  }, [props.data]);

  const unique = (arr) => [...new Set(arr)];
  const [items, setItems] = useState();
  useEffect(() => {
    let dataArray = unique(
      props.data.map((item) => {
        if (props.category === "books-podcasts") {
          return item.specifications.publisher;
        }
        return item.specifications.brand;
      })
    ).map((i) => {
      return {
        title: i,
        quantity: props.data.filter((item) => {
          if (props.category === "books-podcasts") {
            return item.specifications.publisher === i;
          }
          return item.specifications.brand === i;
        }),
      };
    });
    setItems(dataArray);
  }, [props.data]);
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        {props.category === "books-podcasts" ? "publisher" : "brand"}
      </h3>
      <ul>
        <li
          onClick={() => {
            props.setFilter({ ...props.filter, brand: null });
            props.filterProducts();
          }}
        >
          <label>
            <input type="radio" name="brand_filter" className={classes.input} />
            <div className={classes.content}>
              <p className={classes.item_title}>All products</p>
              <p className={classes.item_quantity}>{props.data.length}</p>
            </div>
          </label>
        </li>
        {items &&
          items.map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  props.setFilter({ ...props.filter, brand: item.title });
                  props.filterProducts();
                }}
              >
                <label>
                  <input
                    type="radio"
                    name="brand_filter"
                    className={classes.input}
                  />
                  <div className={classes.content}>
                    <p className={classes.item_title} title={item.title}>
                      {item.title}
                    </p>
                    <p className={classes.item_quantity}>
                      {item.quantity.length}
                    </p>
                  </div>
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
