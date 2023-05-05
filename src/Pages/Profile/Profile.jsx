import { Link, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import classes from "./Profile.module.css";
import { controlMenu, dashboardStaticData } from "./Data";
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FavoritesCard from "./FavoritesCard";
import Spinner from "../../Common/Spinner/Spinner";
export default function Profile() {
  const { category } = useParams();
  const [isActiveControl, setIsActiveControl] = useState(false);
  const controlMenulist = [
    ...document.querySelectorAll("#control-menu > li > a"),
  ];
  const [dashboardData, setDashboardData] = useState();
  const [ticketError, setTicketError] = useState(false);
  const [ticketData, setTicketData] = useState({
    title: null,
    msg: null,
    date: new Date().toISOString().slice(0, 10),
  });
  const [informationData, setInformationData] = useState();
  const [commentData, setCommentData] = useState();
  const [loading, setLoading] = useState(false);
  const [favoritesData, setFavoritesData] = useState();
  const [getUser, setGetUser] = useState(
    JSON.parse(localStorage.getItem("auth-user"))
  );
  useEffect(() => {
    if (dashboardData) {
      setInformationData(dashboardData.information);
    }
  }, [dashboardData]);
  useEffect(() => {
    const getData = async () => {
      await axios.get(`/users/${getUser.id}`).then((res) => {
        setDashboardData(res.data.dashboard);
      });
    };
    getData();
  }, [category]);
  useEffect(() => {
    if (dashboardData) {
      let arrayOfComments = [];
      const getItems = async () => {
        await axios.get("/products").then((res) => {
          dashboardData.comments.map((i) => {
            res.data.map((item) => {
              if (item.id == i.postID) {
                arrayOfComments.push(item);
              }
            });
          });
        });
        setCommentData(arrayOfComments);
      };
      getItems();
    }
  }, [dashboardData]);
  useEffect(() => {
    if (dashboardData) {
      let arrayOfFavorites = [];
      const getItems = async () => {
        await axios.get("/products").then((res) => {
          dashboardData.favorites.map((i) => {
            res.data.map((item) => {
              if (item.id == i) {
                arrayOfFavorites.push(item);
              }
            });
          });
        });
        setFavoritesData(arrayOfFavorites);
      };
      getItems();
    }
  }, [dashboardData]);
  const isActive = (idx) => {
    controlMenulist.forEach((i) => {
      i.style.color = "initial";
      i.style.background = "initial";
    });
    controlMenulist[idx].style.color = "var(--color-primary)";
    controlMenulist[idx].style.background = "var(--color-primary-light)";
  };
  useEffect(() => {
    if (controlMenulist) {
      controlMenulist.forEach((i) => {
        if (i.href === window.location.href) {
          i.style.color = "var(--color-primary)";
          i.style.background = "var(--color-primary-light)";
          return;
        }
        i.style.color = "initial";
        i.style.background = "initial";
      });
    }
  }, [category, controlMenulist]);
  const deleteComment = async (productID) => {
    await axios.get(`/users/${getUser.id}`).then((res) => {
      const obj = {
        dashboard: {
          comments: res.data.dashboard.comments.filter((i) => {
            return i.postID !== productID;
          }),
          ...res.data.dashboard,
        },
      };
      axios.patch(`/users/${getUser.id}`, obj).then((res) => {
        localStorage.setItem("auth-user", JSON.stringify(res.data));
      });
    });
  };
  const postInfo = async () => {
    setLoading(true);
    const obj = {
      name: informationData.fName + " " + informationData.lName,
      dashboard: {
        ...dashboardData,
        information: informationData,
      },
    };
    await axios.patch(`/users/${getUser.id}`, obj).then((res) => {
      localStorage.setItem("auth-user", JSON.stringify(res.data));
      setLoading(false);
    });
  };
  const postTicket = async () => {
    if (ticketData.title && ticketData.msg) {
      setLoading(true);
      setTicketError(false);
      const obj = {
        dashboard: {
          ...dashboardData,
          tickets: [...dashboardData.tickets, ticketData],
        },
      };
      await axios.patch(`/users/${getUser.id}`, obj).then((res) => {
        setLoading(false);
        setDashboardData(res.data.dashboard);
        localStorage.setItem("auth-user", JSON.stringify(res.data));
      });
      return;
    }
    setTicketError(true);
  };
  return (
    <>
      <Container>
        <Header />
        {dashboardData ? (
          <main className={classes.main}>
            <section
              className={`${classes.control} ${
                isActiveControl ? classes.active : ""
              }`}
            >
              <div className={classes.profile_details}>
                <div className={classes.profile_photo}>
                  <i className="fa-regular fa-user"></i>
                </div>
                <h1>
                  {dashboardData &&
                  dashboardData.information.fName &&
                  dashboardData.information.lName
                    ? dashboardData.information.fName +
                      " " +
                      dashboardData.information.lName
                    : getUser.name}
                </h1>
                <p>{dashboardData ? dashboardData.information.email : ""}</p>
              </div>
              <div
                id="control_btn"
                className={classes.control_btn}
                onClick={() => {
                  setIsActiveControl(!isActiveControl);
                }}
              >
                {isActiveControl ? (
                  <i className="fa-regular fa-angles-up"></i>
                ) : (
                  <i className="fa-regular fa-chevrons-down"></i>
                )}
              </div>
              <div className={classes.menu}>
                <ul className={classes.menu_list} id="control-menu">
                  {controlMenu.map((item, idx) => {
                    return (
                      <li
                        className={`${classes.menu_item}`}
                        key={item.id}
                        onClick={() => {
                          setTimeout(() => {
                            setIsActiveControl(false);
                          }, 250);
                          isActive(idx);
                        }}
                      >
                        <Link to={`/profile/${item.to}`}>
                          <i className={item.icon}></i>
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
            <section className={classes.content}>
              <p className={classes.content_title}>{category}</p>
              {dashboardData && category === "dashboard" ? (
                <div className={classes.dashboard}>
                  {dashboardStaticData.map((i) => {
                    return (
                      <div
                        className={classes.dashboard_item}
                        key={i.id}
                        style={{ background: i.hex }}
                      >
                        <div className={classes.dashboard_content}>
                          <h2>{i.title}</h2>
                          <p>
                            {i.title === "Orders"
                              ? dashboardData.orders.length
                              : i.title === "Favorites"
                              ? dashboardData.favorites.length
                              : i.title === "Comments"
                              ? dashboardData.comments.length
                              : i.title === "Tickets"
                              ? dashboardData.tickets.length
                              : i.title === "Reviews"
                              ? dashboardData.reviews.length
                              : i.title === "Returns"
                              ? dashboardData.returns.length
                              : i.title === "Buy"
                              ? dashboardData.buy.length
                              : i.title === "Total Purchase"
                              ? dashboardData.totalPurchases
                              : i.title === "Total Discounts"
                              ? dashboardData.totalDiscounts
                              : i.title === "Selling Goods"
                              ? dashboardData.numberOfGoodsSold
                              : i.title === "Sales Amount"
                              ? dashboardData.salesAmount
                              : i.title === "Offers"
                              ? dashboardData.offers
                              : "Unknown"}
                          </p>
                        </div>
                        <div className={classes.dashboard_icon}>
                          <i className={i.icon}></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : category === "orders" ? (
                <div className={classes.orders}>
                  <div className={classes.shipping_info}>
                    <div className={classes.shipping_info_content}>
                      <div className={classes.shipping_info_item}>
                        <p>Transferee</p>
                        <span>Your name</span>
                      </div>
                      <div className={classes.shipping_info_item}>
                        <p>phone number</p>
                        <span>(+1) 111 222 333</span>
                      </div>
                      <div className={classes.shipping_info_item}>
                        <p>Loaction</p>
                        <span>City/Town</span>
                      </div>
                      <div className={classes.shipping_info_item}>
                        <p>shipping address</p>
                        <span>Your address</span>
                      </div>
                    </div>
                    <div className={classes.shipping_info_change}>
                      <Link>Change</Link>
                    </div>
                  </div>
                  <div className={classes.item_in_Order}>
                    <p>
                      Item in orders ({" "}
                      {dashboardData ? dashboardData.orders.length : ""} )
                    </p>
                    {dashboardData.orders.length === 0 ? (
                      <p className={classes.item_in_Order_msg}>
                        There are no items in the order section.
                      </p>
                    ) : (
                      dashboardData.orders.map((i, idx) => {
                        return (
                          <div className={classes.productCart} key={idx}>
                            <figure className={classes.photo}>
                              <LazyLoadImage
                                src={`http://127.0.0.1:3000/assets/images/products/${i.image}`}
                                alt="#"
                                effect="blur"
                              />
                            </figure>
                            <div className={classes.details}>
                              <h1 className={classes.productTitle}>
                                {i.title}
                              </h1>
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
                            <div className={classes.status}>
                              <ul className={classes.status_list}>
                                <li className={classes.status_item_badge}>
                                  <p className={classes.status_title}>
                                    Status :
                                  </p>
                                  <p className={classes.status_content}>
                                    Processing
                                  </p>
                                </li>
                                <li className={classes.status_item}>
                                  <p className={classes.status_title}>
                                    payment :
                                  </p>
                                  <p className={classes.status_content_icon}>
                                    <img
                                      src="http://127.0.0.1:3000/assets/svg/check2.svg"
                                      alt=""
                                    />
                                    Complete
                                  </p>
                                </li>
                                <li className={classes.status_item}>
                                  <p className={classes.status_title}>
                                    Seller :
                                  </p>
                                  <p className={classes.status_content}>
                                    {i.seller}
                                  </p>
                                </li>
                                <li className={classes.status_item}>
                                  <p className={classes.status_title}>
                                    Order date :
                                  </p>
                                  <p className={classes.status_content}>
                                    {i.date}
                                  </p>
                                </li>
                                <li className={classes.status_item}>
                                  <p className={classes.status_title}>
                                    Discount :
                                  </p>
                                  <p className={classes.status_content}>$0</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : category === "favorites" ? (
                <div className={classes.favorites}>
                  {favoritesData && favoritesData.length > 0 ? (
                    favoritesData.map((i) => {
                      return <FavoritesCard data={i} key={i.id} />;
                    })
                  ) : (
                    <p className={classes.item_in_Order_msg}>
                      There are no items in the favorite section.
                    </p>
                  )}
                </div>
              ) : category === "information" ? (
                <div className={classes.information}>
                  <div className={classes.information_item}>
                    <p className={classes.title_info}>Personal Information</p>
                    <table className={classes.table}>
                      <tbody>
                        <tr>
                          <td className={classes.table__title}>Full Name</td>
                          <td>
                            {dashboardData.information.fName ||
                            dashboardData.information.lName ? (
                              dashboardData.information.fName +
                              " " +
                              dashboardData.information.lName
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.table__title}>Email</td>
                          <td>
                            {dashboardData.information.email ? (
                              dashboardData.information.email
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.table__title}>Gender</td>
                          <td>
                            {dashboardData.information.gender ? (
                              dashboardData.information.gender
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.table__title}>Phone Number</td>
                          <td>
                            {dashboardData.information.phone ? (
                              dashboardData.information.phone
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={classes.information_item}>
                    <p className={classes.title_info}>Shipping information</p>
                    <table className={classes.table}>
                      <tbody>
                        <tr>
                          <td className={classes.table__title}>City/Town</td>
                          <td>
                            {dashboardData.information.city ? (
                              dashboardData.information.city
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.table__title}>
                            State/Province/Region
                          </td>
                          <td>
                            {dashboardData.information.state ? (
                              dashboardData.information.state
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.table__title}>Address</td>
                          <td>
                            {dashboardData.information.address ? (
                              dashboardData.information.address
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className={classes.table__title}>
                            Zip/Postal Code
                          </td>
                          <td>
                            {dashboardData.information.zipCode ? (
                              dashboardData.information.zipCode
                            ) : (
                              <span>Not entered</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className={classes.information_change_link}>
                    <Link to={`/profile/edit-info`}>change information</Link>
                  </p>
                </div>
              ) : category === "comments" ? (
                <div className={classes.comments}>
                  {dashboardData &&
                  commentData &&
                  dashboardData.comments.length > 0 ? (
                    dashboardData.comments.map((i, idx) => {
                      return (
                        <div className={classes.comment_item} key={idx}>
                          <div className={classes.comment_product}>
                            <Link
                              to={`/explore/${commentData[idx].category}/${commentData[idx].id}/${commentData[idx].title}`}
                            >
                              <figure className={classes.comment_photo}>
                                <LazyLoadImage
                                  effect="blur"
                                  src={`http://127.0.0.1:3000/assets/images/products/${i.image}`}
                                  alt="product photo"
                                />
                              </figure>
                              <p className={classes.comment_title}>{i.title}</p>
                            </Link>
                          </div>
                          <p className={classes.comment_subTitle}>
                            You commented on this post - {i.date}
                          </p>
                          <p className={classes.comment_text}>{i.comment}</p>
                          <button onClick={() => deleteComment(i.postID)}>
                            Delete
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <p className={classes.item_in_Order_msg}>
                      There are no comments in the Comment section.
                    </p>
                  )}
                </div>
              ) : category === "tickets" ? (
                <>
                  <div className={classes.newTicket}>
                    <p className={classes.title_info}>New ticket</p>
                    <form>
                      <fieldset>
                        <label htmlFor="ticket_input">
                          <p className={classes.title_input}>Ticket Title</p>
                          <input
                            type="text"
                            id="ticket_input"
                            onChange={({ target }) => {
                              setTicketData({
                                ...ticketData,
                                title: target.value,
                              });
                            }}
                            placeholder="What is your message about?"
                          />
                        </label>
                      </fieldset>
                      <fieldset>
                        <label htmlFor="ticket_input">
                          <p className={classes.title_input}>
                            Ticket Description
                          </p>
                          <textarea
                            name=""
                            id="ticket_input"
                            onChange={({ target }) => {
                              setTicketData({
                                ...ticketData,
                                msg: target.value,
                              });
                            }}
                            placeholder="We are interested in answering your questions, What is your question?"
                          ></textarea>
                        </label>
                      </fieldset>
                      <button
                        className={classes.submit_btn}
                        onClick={(e) => {
                          e.preventDefault();
                          postTicket();
                        }}
                        style={{
                          background: `${
                            loading ? "none" : " var(--color-primary)"
                          }`,
                          pointerEvents: `${loading ? "none" : "initial"}`,
                        }}
                      >
                        {loading ? (
                          <Spinner size={"20px"} borderSize={"3px"} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </form>
                    {ticketError && (
                      <p className={classes.ticket_err}>
                        Please complete the relevant fields.
                      </p>
                    )}
                  </div>
                  <p className={classes.title_info}>Previous tickets</p>
                  <div className={classes.previousTicket}>
                    {dashboardData.tickets.length > 0 ? (
                      dashboardData.tickets.map((i, idx) => {
                        return (
                          <div className={classes.ticket_item} key={idx}>
                            <p className={classes.ticket_title}>{i.title}</p>
                            <p className={classes.ticket_msg}>{i.msg}</p>
                            <p className={classes.ticket_date}>{i.date}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className={classes.item_in_Order_msg}>
                        There are no tickets in the Ticket section.
                      </p>
                    )}
                  </div>
                </>
              ) : category === "edit-info" && informationData ? (
                <div className={classes.edit_info}>
                  <form>
                    <div className={classes.edit_info_personal}>
                      <p className={classes.title_info}>Personal Information</p>
                      <div className={classes.personalInputs}>
                        <fieldset>
                          <label htmlFor="firstName">
                            <p className={classes.title_input}>First name</p>
                            <input
                              type="text"
                              id="firstName"
                              value={informationData.fName}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  fName: target.value,
                                });
                              }}
                              placeholder="Your first name"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <label htmlFor="lastName">
                            <p className={classes.title_input}>Last name</p>
                            <input
                              type="text"
                              id="lastName"
                              value={informationData.lName}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  lName: target.value,
                                });
                              }}
                              placeholder="Your last name"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <label htmlFor="email_input">
                            <p className={classes.title_input}>Email</p>
                            <input
                              type="text"
                              id="email_input"
                              value={informationData.email}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  email: target.value,
                                });
                              }}
                              placeholder="Your email"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <label htmlFor="phone_number">
                            <p className={classes.title_input}>Phone Number</p>
                            <input
                              type="text"
                              id="phone_number"
                              value={informationData.phone}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  phone: target.value,
                                });
                              }}
                              placeholder="Your phone number"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <p className={classes.title_input}>Gender</p>
                          <div className={classes.btn_group}>
                            <button>Female</button>
                            <button>Male</button>
                            <button>Intersex</button>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className={classes.edit_info_shipping}>
                      <p className={classes.title_info}>Shipping information</p>
                      <div className={classes.shippingInputs}>
                        <fieldset>
                          <label htmlFor="state-province-region">
                            <p className={classes.title_input}>
                              State/Province/Region
                            </p>
                            <input
                              type="text"
                              id="state-province-region"
                              value={informationData.state}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  state: target.value,
                                });
                              }}
                              placeholder="Your State/Province/Region"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <label htmlFor="city-town">
                            <p className={classes.title_input}>City/Town</p>
                            <input
                              type="text"
                              id="city-town"
                              value={informationData.city}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  city: target.value,
                                });
                              }}
                              placeholder="Your City/Town"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <label htmlFor="zip-code">
                            <p className={classes.title_input}>
                              Zip/Postal Code
                            </p>
                            <input
                              type="text"
                              id="zip-code"
                              value={informationData.zipCode}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  zipCode: target.value,
                                });
                              }}
                              placeholder="Your Zip/Postal Code"
                            />
                          </label>
                        </fieldset>
                        <fieldset>
                          <label htmlFor="address-input">
                            <p className={classes.title_input}>Address</p>
                            <input
                              type="text"
                              id="address-input"
                              value={informationData.address}
                              onChange={({ target }) => {
                                setInformationData({
                                  ...informationData,
                                  address: target.value,
                                });
                              }}
                              placeholder="Your address ..."
                            />
                          </label>
                        </fieldset>
                      </div>
                    </div>
                    <button
                      className={classes.submit_btn}
                      onClick={(e) => {
                        e.preventDefault();
                        postInfo();
                      }}
                      style={{
                        background: `${
                          loading ? "none" : " var(--color-primary)"
                        }`,
                        pointerEvents: `${loading ? "none" : "initial"}`,
                      }}
                    >
                      {loading ? (
                        <Spinner size={"20px"} borderSize={"3px"} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                ""
              )}
            </section>
          </main>
        ) : (
          "Loading..."
        )}
      </Container>
      <div className={classes.back}></div>
    </>
  );
}
