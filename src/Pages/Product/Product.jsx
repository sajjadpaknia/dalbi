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

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [increaseColorPrice, setIncreaseColorPrice] = useState(0);
  const [increaseConfigurationPrice, setIncreaseConfigurationPrice] =
    useState(0);
  const [productPrice, setProductPrice] = useState();
  const [satisfaction, setSatisfaction] = useState();
  const [configurationError, setConfigurationError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [addToFavorites, setAddToFavorites] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [getUser, setGetUser] = useState(
    JSON.parse(localStorage.getItem("auth-user"))
  );
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
  }, [satisfaction]);
  const isOneChecked = () => {
    const optionConfiguration = Array.from(
      document.querySelectorAll("[data-type='option-configuration']:checked")
    );
    const optionColor = Array.from(
      document.querySelectorAll("[data-type='option-color']:checked")
    );
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
    if (getUser) {
      if (getUser.favorites.length > 0) {
        getUser.favorites.find((i) => {
          if (i == id) {
            setAddToFavorites(true);
            return;
          }
        });
      }
    }
  }, []);
  const handlePatchItem = async () => {
    if (!addToFavorites) {
      await axios.get(`/users/${getUser.id}`).then((res) => {
        let arrayOfFavorite = res.data.favorites;
        const obj = {
          favorites: [...arrayOfFavorite, data.id],
        };
        axios.patch(`/users/${getUser.id}`, obj).then((res) => {
          if (res.status == 200) {
            localStorage.setItem(
              "auth-user",
              JSON.stringify({
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                favorites: res.data.favorites,
              })
            );
            setAddToFavorites(true);
          }
        });
      });
    } else {
      if (getUser.favorites.length > 0) {
        await axios.get(`/users/${getUser.id}`).then((res) => {
          const obj = {
            favorites: res.data.favorites.filter((i) => {
              return i !== data.id;
            }),
          };
          axios.patch(`/users/${getUser.id}`, obj).then((res) => {
            if (res.status == 200) {
              localStorage.setItem(
                "auth-user",
                JSON.stringify({
                  id: res.data.id,
                  email: res.data.email,
                  name: res.data.name,
                  favorites: res.data.favorites,
                })
              );
              setAddToFavorites(false);
            }
          });
        });
      }
    }
  };
  return (
    <>
      <Container>
        <Header />
        {data && (
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
                                  src={`http://127.0.0.1:3000/assets/images/products/${data.image[idx]}`}
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
                            ? "Added to favorites"
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
                            ({data.comments.length} reviews)
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
                    !getUser ? null : (
                      <ul className={classes.options}>
                        <div className={classes.division__title}>Options</div>
                        <li className={classes.options__item}>
                          <p className={classes.options__item__title}>
                            {data.category === "phone"
                              ? "Choose your configuration"
                              : data.category === "clothing"
                              ? "Choose your size"
                              : ""}
                          </p>
                          <Configuration
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
                        {data.colors && (
                          <li className={classes.options__item}>
                            <p className={classes.options__item__title}>
                              Choose your color
                            </p>
                            <ColorBox
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
                    Comments ({data.comments.length})
                  </div>
                  <div className={classes.comments_box}>
                    <textarea
                      onInput={({ target }) => {
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      name="comment"
                      placeholder="Write a comment..."
                    ></textarea>
                    <div className={classes.send_icon}>
                      <i className="fa-regular fa-paper-plane"></i>
                    </div>
                  </div>
                  <ul className={classes.comments}>
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
                      className={`${classes.button} ${
                        !getUser ? classes.disable : ""
                      }`}
                      onClick={() => {
                        if (getUser) {
                          isOneChecked();
                          return;
                        }
                        return;
                      }}
                    >
                      <Link to={`${getUser ? "#" : "/login"}`}>
                        {getUser ? "Add to cart" : "Login"}
                      </Link>
                    </div>
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
        )}
        <Footer />
      </Container>
    </>
  );
}
