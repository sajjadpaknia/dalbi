import { useState } from "react";
import { useEffect } from "react";
import classes from "./FilterRam.module.css";

export default function FilterRam(props) {
  useEffect(() => {
    const filter_input = document.querySelectorAll("input[name='ram_filter']");
    filter_input.forEach((element) => {
      element.checked = false;
    });
  }, [props.data]);
  const unique = (arr) => [...new Set(arr)];
  const [rams, setRams] = useState();
  useEffect(() => {
    const RAM = [];
    props.data.map((item) => {
      return item.configuration.map((el) => {
        RAM.push(el.ram);
      });
    });
    RAM.sort((a, b) => {
      return a - b;
    });
    setRams(unique(RAM));
  }, [props.data]);

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Ram</h3>
      <ul>
        <li
          onClick={() => {
            props.setFilter({ ...props.filter, ram: null });
            props.filterProducts();
          }}
        >
          <label>
            <input type="radio" name="ram_filter" className={classes.input} />
            <div className={classes.content}>
              <p className={classes.item_title}>All Rams</p>
            </div>
          </label>
        </li>
        {rams &&
          rams.map((item, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  props.setFilter({ ...props.filter, ram: item });
                  props.filterProducts();
                }}
              >
                <label>
                  <input
                    type="radio"
                    name="ram_filter"
                    className={classes.input}
                  />
                  <div className={classes.content}>
                    <p className={classes.item_title}>{item} GB</p>
                  </div>
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
