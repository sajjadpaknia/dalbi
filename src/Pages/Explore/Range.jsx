import { useState } from "react";
import classes from "./Range.module.css";

export default function Range() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const rangeInput = document.querySelectorAll("#range_input input"),
    priceInput = document.querySelectorAll("#price_input input"),
    progress = document.getElementById("progressBar");
  let priceGap = 1500;
  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(priceInput[0].value),
        maxVal = parseInt(priceInput[1].value);
      if (maxVal - minVal >= priceGap && maxVal <= 10000) {
        if (e.target.id === "input-min") {
          rangeInput[0].value = minVal;
          progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxVal;
          progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });
  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
      if (maxVal - minVal < priceGap) {
        if (e.target.id === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });
  return (
    <div className={classes.range}>
      <h3 className={classes.title}>Price Range</h3>
      <div className={classes.slider_wrapper}>
        <div className={classes.slider} id="range_input">
          <div className={classes.progress} id="progressBar"></div>
          <input
            type="range"
            id="range-min"
            className={classes.range_min}
            min={"0"}
            max={"10000"}
            step={"100"}
            value={min}
            onChange={(e) => {
              setMin(e.target.value);
            }}
          />
          <input
            type="range"
            id="range-max"
            className={classes.range_max}
            min={"0"}
            max={"10000"}
            step={"100"}
            value={max}
            onChange={(e) => {
              setMax(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={classes.price_input} id="price_input">
        <fieldset>
          <span>Min $</span>
          <input type="number" id="input-min" />
        </fieldset>
        <fieldset>
          <span>Max $</span>
          <input type="number" />
        </fieldset>
      </div>
    </div>
  );
}
