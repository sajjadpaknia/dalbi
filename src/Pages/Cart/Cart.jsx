import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import classes from "./Cart.module.css";

export default function Cart() {
  const paymentMethod = [
    {
      id: 1,
      title: "Debit Card",
      content: "6226 9887 7204 9863",
      path: "debit-card.png",
    },
    {
      id: 2,
      title: "Mastercard",
      content: "5120 9410 9464 8697",
      path: "Mastercard.png",
    },
    { id: 3, title: "Visa", content: "4539 5099 0528 4107", path: "visa.png" },
    {
      id: 4,
      title: "PayPal",
      content: "youremail@gamil.com",
      path: "paypal.png",
    },
  ];
  return (
    <>
      <Container>
        <Header />
        <main className={classes.main}>
          <div className={classes.payment}>
            <p className={classes.payment_title}>Payment Method</p>
            <ul>
              {paymentMethod.map((item) => {
                return (
                  <li className={classes.container}>
                    <label className={classes.checkbox}>
                      <input
                        type="radio"
                        name="payment"
                        className={classes.input}
                        data-type={"option-payment"}
                        onChange={() => {
                          //   handleChange(item);
                        }}
                      />
                      <div className={classes.content}>
                        <div
                          className={classes.icon}
                          style={{
                            background: `url(http://127.0.0.1:3000/assets/images/${item.path}) no-repeat center`,
                          }}
                        ></div>
                        <div className={classes.details}>
                          <p className={classes.details__title}>{item.title}</p>
                          <p className={classes.details__subTitle}>
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={classes.content}></div>
          <div className={classes.price}></div>
        </main>
      </Container>
      <div className={classes.back}></div>
    </>
  );
}
