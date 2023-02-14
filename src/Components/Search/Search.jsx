import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Badge from "../../Common/Badge/Badge";
import Rate from "../../Common/Rate/Rate";
import classes from "./Search.module.css";

export default function Search() {
  const [dropdown, setDropdown] = useState(false);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const search = useRef();
  const subSearch = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== subSearch.current && e.target !== search.current) {
      setDropdown(false);
    }
  });
  // Fetch data
  useEffect(() => {
    const getItems = async () => {
      await axios.get("/products").then((res) => {
        setProducts(res.data);
      });
    };
    getItems();
  }, []);
  const handleSearch = (e) => {
    setSearchItems(
      products.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value);
      })
    );
  };
  return (
    <>
      <div className={classes.search}>
        <input
          ref={search}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setInput(e.target.value.toLowerCase());
            setDropdown(true);
            handleSearch(e);
          }}
        />
        <button className={classes.searchIcon}>
          <i className="fa-regular fa-magnifying-glass"></i>
        </button>
        <div
          className={`${classes.subSearch} ${dropdown ? classes.show : ""}`}
          ref={subSearch}
        >
          <div className={classes.icon}>
            <i className="fa-regular fa-xmark"></i>
          </div>
          <div className={classes.wrapper}>
            {input.length > 0 ? (
              searchItems.length > 0 ? (
                searchItems.slice(0, 3).map((item) => {
                  return (
                    <div className={classes.item} key={item.id}>
                      <Link to={`/product/${item.category}/${item.id}`}>
                        <div className={classes.card}>
                          <div className={classes.card__image}>
                            <figure className={classes.card__figure}>
                              <img
                                src={`http://127.0.0.1:3000/assets/images/products/${item.image[0]}`}
                                alt="#"
                                loading="lazy"
                              />
                            </figure>
                          </div>
                          <div className={classes.card__info}>
                            <div className={classes.card__title}>
                              <h1 id="productCardTitle">{item.title}</h1>
                            </div>
                            <div className={classes.card__details}>
                              <Rate rate={item.rate} />
                              <Badge title={item.badge} />
                            </div>
                            <div className={classes.card__price}>
                              <p className={classes.card__priceWrapper}>
                                <span>$</span>
                                <span className={classes.card__priceNumber}>
                                  {item.price}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className={classes.msg}>
                  <figure>
                    <img
                      loading="lazy"
                      src="http://127.0.0.1:3000/assets/images/error.png"
                      alt=""
                    />
                  </figure>
                  <p>Your desired product was not found.</p>
                </div>
              )
            ) : (
              <div className={classes.msg}>
                <figure>
                  <img
                    loading="lazy"
                    src="http://127.0.0.1:3000/assets/images/search.png"
                    alt=""
                  />
                </figure>
                <p>Please enter the name of the product you want.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
