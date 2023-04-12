import classes from "./Configuration.module.css";

export default function Configuration({
  category,
  data,
  setPrice,
  setSelectedConfiguration,
}) {
  const handleChange = (item) => {
    setSelectedConfiguration(item);
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
            {category === "phone" ? (
              <label className={classes.checkbox}>
                <input
                  type="radio"
                  name="configuration"
                  className={classes.input}
                  data-type={"option-configuration"}
                  onChange={() => {
                    handleChange(item);
                  }}
                />
                <div className={classes.content} style={{ width: "180px" }}>
                  <ul className={classes.list}>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>Ram</p>
                      <p className={classes.item__info}>{`${item.ram} GB`}</p>
                    </li>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>Storage</p>
                      <p
                        className={classes.item__info}
                      >{`${item.storage} GB`}</p>
                    </li>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>
                        {item.available
                          ? item.increase === 0
                            ? "Free"
                            : `$${item.increase} more`
                          : "Unavailable"}
                      </p>
                    </li>
                  </ul>
                </div>
              </label>
            ) : category === "clothing" ? (
              <label className={classes.checkbox}>
                <input
                  type="radio"
                  name="configuration"
                  className={classes.input}
                  data-type={"option-configuration"}
                  onChange={() => {
                    handleChange(item);
                  }}
                />
                <div className={classes.content} style={{ width: "140px" }}>
                  <ul className={classes.list}>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>Size</p>
                      <p className={classes.item__info}>{item.size}</p>
                    </li>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>
                        {item.available
                          ? item.increase === 0
                            ? "Free"
                            : `$${item.increase} more`
                          : "Unavailable"}
                      </p>
                    </li>
                  </ul>
                </div>
              </label>
            ) : category === "shoes" ? (
              <label className={classes.checkbox}>
                <input
                  type="radio"
                  name="configuration"
                  className={classes.input}
                  data-type={"option-configuration"}
                  onChange={() => {
                    handleChange(item);
                  }}
                />
                <div className={classes.content} style={{ width: "140px" }}>
                  <ul className={classes.list}>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>Size</p>
                      <p className={classes.item__info}>{item.size}</p>
                    </li>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>
                        {item.available
                          ? item.increase === 0
                            ? "Free"
                            : `$${item.increase} more`
                          : "Unavailable"}
                      </p>
                    </li>
                  </ul>
                </div>
              </label>
            ) : category === "super-market" ? (
              <label className={classes.checkbox}>
                <input
                  type="radio"
                  name="configuration"
                  className={classes.input}
                  data-type={"option-configuration"}
                  onChange={() => {
                    handleChange(item);
                  }}
                />
                <div className={classes.content} style={{ width: "140px" }}>
                  <ul className={classes.list}>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>Weight</p>
                      <p className={classes.item__info}>{item.weight} Kg</p>
                    </li>
                    <li className={classes.list__item}>
                      <p className={classes.item__title}>
                        {item.available
                          ? item.increase === 0
                            ? "Free"
                            : `$${item.increase} more`
                          : "Unavailable"}
                      </p>
                    </li>
                  </ul>
                </div>
              </label>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
