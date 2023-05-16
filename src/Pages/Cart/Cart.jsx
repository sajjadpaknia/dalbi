import { LazyLoadImage } from "react-lazy-load-image-component";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import classes from "./Cart.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  const { category } = useParams();
  const [price, setPrice] = useState();
  const [error, setError] = useState(false);
  const [getUser, setGetUser] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  useEffect(() => {
    setGetUser(JSON.parse(localStorage.getItem("auth-user")));
  }, [category]);
  useEffect(() => {
    if (getUser) {
      const sum = getUser.dashboard.cart.reduce((total, current) => {
        return total + current.price;
      }, 0);
      setPrice(sum);
    }
  }, [getUser]);
  let navigate = useNavigate();
  const checkout = () => {
    if (selectedPaymentMethod) {
      setError(false);
      navigate("/payment");
      return;
    }
    setError(true);
  };
  const removeItem = async (item) => {
    await Promise.resolve("Success").then((res) => {
      const filter = getUser.dashboard.cart.filter((i) => {
        return i.id !== item.id;
      });
      const obj = {
        ...getUser,
        dashboard: {
          ...getUser.dashboard,
          cart: [...filter],
        },
      };
      localStorage.setItem("auth-user", JSON.stringify(obj));
      setGetUser(obj);
    });
  };
  return (
    <>
      <Container>
        <Header />
        {getUser && getUser.dashboard.cart.length > 0 ? (
          <main className={classes.main}>
            <div className={classes.payment}>
              <p className={classes.payment_title}>Payment Method</p>
              <ul>
                {paymentMethod.map((item, idx) => {
                  return (
                    <li
                      className={classes.container}
                      key={idx}
                      onClick={() => setSelectedPaymentMethod(item)}
                    >
                      <label className={classes.checkbox}>
                        <input
                          type="radio"
                          name="payment"
                          className={classes.input}
                          data-type={"option-payment"}
                        />
                        <div className={classes.content}>
                          <div
                            className={classes.icon}
                            style={{
                              background: `url(/assets/images/${item.path}) no-repeat center`,
                            }}
                          ></div>
                          <div className={classes.details}>
                            <p className={classes.details__title}>
                              {item.title}
                            </p>
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
            <div className={classes.content}>
              <p className={classes.content_title}>Item in cart ( 3 )</p>
              <ul className={classes.content_wrapper}>
                {getUser.dashboard.cart.map((i) => {
                  return (
                    <li className={classes.productCart} key={i.id}>
                      <div className={classes.productCart_wrapper}>
                        <figure className={classes.photo}>
                          <LazyLoadImage
                            src={`/assets/images/products/${i.image}`}
                            alt="#"
                            effect="blur"
                          />
                        </figure>
                        <div className={classes.details}>
                          <h1 className={classes.productTitle}>{i.title}</h1>
                          <div className={classes.productDetails}>
                            <ul className={classes.productDetailsList}>
                              {i.category === "phone" ||
                              i.category === "clothing" ||
                              i.category === "shoes" ||
                              i.category === "sports-goods" ? (
                                <li>
                                  <p className={classes.color}>
                                    <span
                                      style={{
                                        background: i.color.hexCode,
                                      }}
                                    ></span>
                                    {i.color.colorName}
                                  </p>
                                </li>
                              ) : null}

                              <li>
                                {i.category === "phone" ? (
                                  <>
                                    Memory : &nbsp;
                                    <span>{i.configuration.ram} GB </span>
                                  </>
                                ) : i.category === "clothing" ||
                                  i.category === "shoes" ? (
                                  <>
                                    size : &nbsp;
                                    <span>{i.configuration.size} </span>
                                  </>
                                ) : i.category === "super-market" ? (
                                  <>
                                    weight : &nbsp;
                                    <span>{i.configuration.weight} KG</span>
                                  </>
                                ) : null}
                              </li>
                              {i.category === "phone" ? (
                                <li>
                                  Internal storage : &nbsp;
                                  <span>{i.configuration.storage} GB</span>
                                </li>
                              ) : null}

                              <li>
                                Count :&nbsp;<span>{i.count}</span>
                              </li>
                            </ul>
                          </div>
                          <p className={classes.productPrice}>${i.price}</p>
                        </div>
                      </div>
                      <button
                        className={classes.productCart_btn}
                        onClick={() => {
                          removeItem(i);
                        }}
                      >
                        Remove from cart
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={classes.price}>
              <div>
                <h1 className={classes.price_number}>${price && price}</h1>
                <h3 className={classes.price_subNumber}>Total Price</h3>
                <p className={classes.price_desc}>
                  To return the purchased product, you should not open the
                  package. Otherwise, returns are not included.
                </p>
                <button
                  className={classes.checkoutBtn}
                  onClick={() => checkout()}
                >
                  <Link>Checkout</Link>
                </button>
                {error && (
                  <p className={classes.checkout_error}>
                    Please select your payment method.
                  </p>
                )}
              </div>
              <ul className={classes.shipping_info}>
                <li>
                  <p className={classes.shipping_info_title}>Transferee</p>
                  <p className={classes.shipping_info_subTitle}>Your Name</p>
                </li>
                <li>
                  <p className={classes.shipping_info_title}>phone number</p>
                  <p className={classes.shipping_info_subTitle}>
                    (+1) 111 222 333
                  </p>
                </li>
                <li>
                  <p className={classes.shipping_info_title}>Loaction</p>
                  <p className={classes.shipping_info_subTitle}>City/Town</p>
                </li>
                <li>
                  <p className={classes.shipping_info_title}>
                    shipping address
                  </p>
                  <p className={classes.shipping_info_subTitle}>Your Address</p>
                </li>
              </ul>
            </div>
          </main>
        ) : (
          <div className={classes.empty_cart}>
            <div>
              <img src="/assets/images/empty_cart.png" />
            </div>
            <h3>Your shopping cart is empty</h3>
            <p>Go to the products page and select the product you want.</p>
          </div>
        )}
      </Container>
      <div className={classes.back}></div>
    </>
  );
}
