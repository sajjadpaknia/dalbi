import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination } from "swiper";
import Badge from "../../Common/Badge/Badge";
import Rate from "../../Common/Rate/Rate";
import Container from "../../Components/Container/Container";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import ColorBox from "./ColorBox";
import Configuration from "./Configuration";
import classes from "./Product.module.css";
import Specifications from "./Specifications";
import Spinner from "../../Common/Spinner/Spinner";

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [increaseColorPrice, setIncreaseColorPrice] = useState(0);
  const [increaseConfigurationPrice, setIncreaseConfigurationPrice] =
    useState(0);
  const [textareaError, setTextareaError] = useState(false);
  const [productPrice, setProductPrice] = useState();
  const [satisfaction, setSatisfaction] = useState();
  const [selectedConfiguration, setSelectedConfiguration] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [configurationError, setConfigurationError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [addToFavorites, setAddToFavorites] = useState(false);
  const [addToCartFnc, setAddToCartFnc] = useState(false);
  const [addToCartBTN, setAddToCartBTN] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [getUser, setGetUser] = useState();
  useEffect(() => {
    setGetUser(JSON.parse(localStorage.getItem("auth-user")));
  }, [id]);
  useEffect(() => {
    if (getUser) {
      if (addToCartFnc) {
        async function patchToOrders() {
          await Promise.resolve("Success").then((res) => {
            const newItem = {
              id: data.id,
              category: data.category,
              title: data.title,
              price:
                increaseColorPrice + increaseConfigurationPrice + productPrice,
              configuration: selectedConfiguration,
              color: selectedColor,
              image: data.image[0],
              count: 1,
              seller: data.seller.name,
              date: new Date().toISOString().slice(0, 10),
            };
            const obj = {
              ...getUser,
              dashboard: {
                ...getUser.dashboard,
                cart: [...getUser.dashboard.cart, newItem],
              },
            };
            localStorage.setItem("auth-user", JSON.stringify(obj));
            setAddToCartBTN("It was added to cart");
          });
        }
        patchToOrders();
      } else {
        setAddToCartBTN("Add to cart");
      }
    } else {
      setAddToCartBTN("login");
    }
  }, [addToCartFnc, getUser]);
  useEffect(() => {
    const getItems = async () => {
      await axios.get("/products").then((res) => {
        let [product] = res.data.filter((item) => {
          return item.id == id;
        });
        setData(product);
        setProductPrice(product.price);
        setSatisfaction(product.seller.satisfaction);
      });
    };
    getItems();
  }, [id]);
  useEffect(() => {
    const satisfactionItem = document.getElementById("satisfaction");
    const performanceItem = document.getElementById("performance");
    if (satisfaction && satisfactionItem) {
      if (satisfaction < 30) {
        satisfactionItem.style.color = "#EE0034";
        satisfactionItem.style.background = "#ff000026";
        performanceItem.style.color = "#EE0034";
        performanceItem.innerHTML = "Bad";
      } else if (30 <= satisfaction && satisfaction < 80) {
        satisfactionItem.style.color = "#F27800";
        satisfactionItem.style.background = "#ff7b0033";
        performanceItem.style.color = "#F27800";
        performanceItem.innerHTML = "Good";
      } else if (80 <= satisfaction && satisfaction <= 100) {
        satisfactionItem.style.color = "#287818";
        satisfactionItem.style.background = "#00891233";
        performanceItem.style.color = "#287818";
        performanceItem.innerHTML = "Excellent";
      }
    }
  }, [satisfaction]);
  const isOneChecked = () => {
    const optionConfiguration = Array.from(
      document.querySelectorAll("[data-type='option-configuration']:checked")
    );
    const optionColor = Array.from(
      document.querySelectorAll("[data-type='option-color']:checked")
    );
    if (data.category === "super-market") {
      if (optionConfiguration.length === 1) {
        setConfigurationError(false);
        setAddToCartFnc(true);
      } else {
        setConfigurationError(true);
      }
    } else if (data.category === "sports-goods") {
      if (optionColor.length === 1) {
        setColorError(false);
        setAddToCartFnc(true);
      } else {
        setColorError(true);
      }
    } else if (
      data.category === "books-podcasts" ||
      data.category === "Health-Personal-Care" ||
      data.category === "stationery"
    ) {
      setAddToCartFnc(true);
    } else {
      if (optionConfiguration.length === 1) {
        setConfigurationError(false);
      } else {
        setConfigurationError(true);
      }
      if (optionColor.length === 1) {
        setColorError(false);
      } else {
        setColorError(true);
      }
      if (optionColor.length === 1 && optionConfiguration.length === 1) {
        setAddToCartFnc(true);
        return;
      }
    }
  };
  const goToComments = () => {
    const comments =
      document.getElementById("comments").getBoundingClientRect().top +
      window.scrollY;
    window.scroll({
      top: comments - 40,
    });
  };
  const handleShowComment = (idx) => {
    setShowComment(true);
    const faders = Array.from(document.querySelectorAll("#fader"));
    const comments = Array.from(
      document.querySelectorAll("[data-type='comment']")
    );
    faders[idx].style.display = "none";
    comments[idx].style.height = "auto";
  };
  useEffect(() => {
    if (
      getUser &&
      getUser.dashboard &&
      getUser.dashboard.favorites.length > 0
    ) {
      if (getUser.dashboard.favorites.includes(+id)) {
        setAddToFavorites(true);
      } else {
        setAddToFavorites(false);
      }
    }
  }, [id, getUser]);
  const handlePatchItem = async () => {
    if (!addToFavorites) {
      await Promise.resolve("Success").then((res) => {
        const obj = {
          ...getUser,
          dashboard: {
            ...getUser.dashboard,
            favorites: [...getUser.dashboard.favorites, data.id],
          },
        };
        localStorage.setItem("auth-user", JSON.stringify(obj));
        setGetUser(obj);
        setAddToFavorites(true);
      });
    } else {
      if (getUser.dashboard.favorites.length > 0) {
        await Promise.resolve("Success").then((res) => {
          const obj = {
            ...getUser,
            dashboard: {
              ...getUser.dashboard,
              favorites: getUser.dashboard.favorites.filter((i) => {
                return i !== data.id;
              }),
            },
          };
          localStorage.setItem("auth-user", JSON.stringify(obj));
          setGetUser(obj);
          setAddToFavorites(false);
        });
      }
    }
  };
  const postComment = async () => {
    const textarea = document.getElementById("comment_box");
    if (textarea.value === "") {
      setTextareaError(true);
      return;
    }
    setTextareaError(false);
    let newComment = {
      postID: id,
      author: getUser.name,
      title: data.title,
      image: data.image[0],
      date: new Date().toISOString().slice(0, 10),
      comment: textarea.value,
    };
    await Promise.resolve("Success").then((res) => {
      const obj = {
        ...getUser,
        dashboard: {
          ...getUser.dashboard,
          comments: [...getUser.dashboard.comments, newComment],
        },
      };
      localStorage.setItem("auth-user", JSON.stringify(obj));
      setGetUser(obj);
      textarea.value = "";
    });
  };
  return (
    <>
      <Container>
        <Header />
        {data ? (
          <>
            <main className={classes.main} id="product_page">
              <section className={classes.product_info}>
                <section className={classes.product_specifications}>
                  <div className={classes.product_picture}>
                    <figure className={classes.product_img}>
                      <figure className={classes.product_img_wrapper}>
                        <Swiper
                          loop={data.image.length > 1 ? true : false}
                          grabCursor={data.image.length > 1 ? true : false}
                          effect={"creative"}
                          creativeEffect={{
                            prev: {
                              shadow: false,
                              translate: ["-120%", 0, -500],
                            },
                            next: {
                              shadow: false,
                              translate: ["120%", 0, -500],
                            },
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[EffectCreative, Pagination]}
                          className="mySwiper"
                        >
                          {data.image.map((i, idx) => {
                            return (
                              <SwiperSlide key={idx}>
                                <LazyLoadImage
                                  src={`/assets/images/products/${data.image[idx]}`}
                                  alt="#"
                                  effect="blur"
                                />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </figure>
                    </figure>
                  </div>
                  <div className={classes.product_details}>
                    <div className={classes.label}>
                      <div className={classes.badge}>
                        <Badge title={data.badge} />
                      </div>
                      {getUser && (
                        <div
                          className={`${classes.AddToFavorites} ${
                            addToFavorites ? classes.active : ""
                          }`}
                          onClick={() => {
                            handlePatchItem();
                          }}
                        >
                          <i className="fa-regular fa-heart"></i>
                          {addToFavorites
                            ? "It was added to favorites"
                            : "Add to favorites"}
                        </div>
                      )}
                    </div>
                    <div className={classes.title}>
                      <h1>{data.title}</h1>
                      <div className={classes.subTitle}>
                        <div className={classes.rate}>
                          <Rate rate={data.rate} />
                          <span
                            onClick={() => {
                              goToComments();
                            }}
                          >
                            {getUser &&
                              `${
                                data.comments.length +
                                getUser.dashboard.comments.length
                              }reviews`}
                          </span>
                        </div>
                        <div className={classes.compare}>
                          <i className="fa-regular fa-code-compare"></i>
                          Compare
                        </div>
                        <div className={classes.share}>
                          <i className="fa-regular fa-share-nodes"></i>Share
                        </div>
                      </div>
                    </div>

                    {data.category === "books-podcasts" ||
                    data.category === "Health-Personal-Care" ||
                    data.category === "stationery" ||
                    !getUser ? null : (
                      <ul className={classes.options}>
                        <div className={classes.division__title}>Options</div>
                        {data.category !== "sports-goods" && (
                          <li className={classes.options__item}>
                            <p className={classes.options__item__title}>
                              {data.category === "phone"
                                ? "Choose your configuration"
                                : data.category === "clothing"
                                ? "Choose your size"
                                : data.category === "super-market"
                                ? "Choose your weight"
                                : ""}
                            </p>
                            <Configuration
                              setSelectedConfiguration={
                                setSelectedConfiguration
                              }
                              category={data.category}
                              data={data.configuration}
                              setPrice={setIncreaseConfigurationPrice}
                            />

                            {configurationError ? (
                              <p className={classes.options__error}>
                                <i className="fa-regular fa-triangle-exclamation"></i>
                                Please choose the configuration you want.
                              </p>
                            ) : null}
                          </li>
                        )}

                        {data.colors && (
                          <li className={classes.options__item}>
                            <p className={classes.options__item__title}>
                              Choose your color
                            </p>
                            <ColorBox
                              setSelectedColor={setSelectedColor}
                              data={data.colors}
                              setPrice={setIncreaseColorPrice}
                            />
                            {colorError ? (
                              <p className={classes.options__error}>
                                <i className="fa-regular fa-triangle-exclamation"></i>
                                Please choose the color you want.
                              </p>
                            ) : null}
                          </li>
                        )}
                      </ul>
                    )}
                    <ul className={classes.specifications}>
                      <div className={classes.division__title}>
                        Specifications
                      </div>
                      <Specifications data={data} />
                    </ul>
                  </div>
                </section>

                <section className={classes.product_introduction}>
                  <div className={classes.division__title}>Introduction</div>
                  <p>{data.introduction}</p>
                </section>
                <section className={classes.product_comments} id="comments">
                  <div className={classes.division__title}>
                    Comments (
                    {getUser
                      ? data.comments.length + getUser.dashboard.comments.length
                      : data.comments.length}
                    )
                  </div>
                  <form
                    className={classes.comments_box}
                    style={{
                      border: textareaError
                        ? "1px solid var(--color-error)"
                        : "1px solid var(--color-dark-30)",
                    }}
                  >
                    <textarea
                      id="comment_box"
                      onInput={({ target }) => {
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      name="comment"
                      placeholder="Write a comment..."
                    ></textarea>
                    <button
                      className={classes.send_icon}
                      onClick={(e) => {
                        e.preventDefault();
                        postComment();
                      }}
                    >
                      <i className="fa-regular fa-paper-plane"></i>
                    </button>
                  </form>
                  {textareaError ? (
                    <p className={classes.comments_box_error}>
                      Enter your comment please.
                    </p>
                  ) : null}

                  <ul className={classes.comments}>
                    {getUser && getUser.dashboard.comments.length > 0
                      ? getUser.dashboard.comments.map((i, idx) => {
                          if (i.postID == id) {
                            return (
                              <li className={classes.comment} key={idx}>
                                <h1 className={classes.comments_author}>
                                  {i.author}
                                </h1>
                                <div className={classes.comments_details}>
                                  <div className={classes.comments_rate}>
                                    <Rate rate={5} />
                                  </div>
                                  <p className={classes.comments_date}>
                                    {i.date}
                                  </p>
                                </div>
                                <p
                                  className={classes.comments_text}
                                  data-type="comment"
                                >
                                  <span
                                    id="fader"
                                    onClick={() => {
                                      handleShowComment(idx);
                                    }}
                                  ></span>

                                  {i.comment}
                                </p>
                              </li>
                            );
                          }
                        })
                      : ""}
                    {data.comments.map((i, idx) => {
                      return (
                        <li className={classes.comment} key={i.id}>
                          <h1 className={classes.comments_author}>
                            {i.author}
                          </h1>
                          <div className={classes.comments_details}>
                            <div className={classes.comments_rate}>
                              <Rate rate={i.rate} />
                            </div>
                            <p className={classes.comments_date}>{i.date}</p>
                          </div>
                          <p
                            className={classes.comments_text}
                            data-type="comment"
                          >
                            <span
                              id="fader"
                              onClick={() => {
                                handleShowComment(idx);
                              }}
                            ></span>

                            {i.text}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </section>
              <section className={classes.product_buy} id="product_buy">
                <section className={classes.product_offers}>
                  <div className={classes.product_offers__actions}>
                    <div>
                      <h1>
                        $
                        <span>
                          {increaseColorPrice +
                            increaseConfigurationPrice +
                            productPrice}
                        </span>
                      </h1>
                      <p className={classes.product_right__title}>
                        Available offers
                      </p>
                      <ul className={classes.product_offers__list}>
                        <li>
                          <p>spread the cost with ExBank.</p>
                          <Link to={"#"}>More info</Link>
                        </li>
                        <li>
                          <p>Get up to 20% off on exchange.</p>
                          <Link to={"#"}>More info</Link>
                        </li>
                        <li>
                          <p>Notify me about price drop.</p>
                        </li>
                      </ul>
                    </div>
                    <div
                      id="add-to-cart-btn"
                      className={`${classes.button} ${
                        !getUser ? classes.disable : ""
                      } ${addToCartFnc ? classes.add : ""}`}
                      onClick={() => {
                        if (getUser) {
                          isOneChecked();
                          return;
                        }
                        return;
                      }}
                    >
                      <Link to={`${getUser ? "#" : "/login"}`}>
                        {addToCartBTN}
                      </Link>
                    </div>
                    {configurationError || colorError ? (
                      <p className={classes.product_right__error}>
                        There are options to choose from.
                      </p>
                    ) : null}
                  </div>
                  <div className={classes.product_offers__seller}>
                    <p className={classes.product_right__title}>Seller</p>
                    <div className={classes.seller_profile}>
                      <figure className={classes.seller_profile_pic}>
                        <img loading="lazy" src={data.seller.profileImg} />
                      </figure>
                      <div className={classes.seller_info}>
                        <h3>{data.seller.name}</h3>
                        <p>{data.seller.company}</p>
                      </div>
                    </div>
                    <ul className={classes.seller_list}>
                      <li>
                        Product satisfaction:
                        <span
                          className={classes.seller_satisfaction}
                          id="satisfaction"
                        >
                          {satisfaction}%
                        </span>
                      </li>
                      <li>
                        Performance:
                        <span
                          className={classes.seller_performance}
                          id="performance"
                        ></span>
                      </li>
                      <li>
                        Status:
                        <span className={classes.seller_status}>
                          <i className="fa-solid fa-circle-check"></i>
                          {data.seller.status}
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>
              </section>
            </main>
          </>
        ) : (
          <div className={classes.loading}>
            <Spinner size={"40px"} borderSize={"5px"} />
          </div>
        )}
        <Footer />
      </Container>
    </>
  );
}
