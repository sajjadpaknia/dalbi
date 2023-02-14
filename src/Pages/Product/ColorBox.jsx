import { logDOM } from "@testing-library/react";
import classes from "./ColorBox.module.css";

export default function ColorBox({ data, setPrice }) {
  const handleChange = (item) => {
    setPrice(item.increase);
  };
  return (
    <div className={classes.wrapper}>
      {data.map((item) => {
        return (
          <div
            className={`${classes.container} ${
              !item.available ? classes.unavailable : ""
            }`}
            key={item.id}
          >
            <label className={classes.checkbox}>
              <input
                type="radio"
                name="color"
                className={classes.input}
                data-type={"option-color"}
                onChange={() => {
                  handleChange(item);
                }}
              />
              <div className={classes.content}>
                <div
                  className={classes.color}
                  style={{
                    background: item.hexCode,
                  }}
                ></div>
                <div className={classes.details}>
                  <p className={classes.details__title}>{item.colorName}</p>
                  <p className={classes.details__subTitle}>
                    {item.available
                      ? item.increase === 0
                        ? "Free"
                        : `$${item.increase} more`
                      : "Unavailable"}
                  </p>
                </div>
              </div>
            </label>
          </div>
        );
      })}
    </div>
  );
}
