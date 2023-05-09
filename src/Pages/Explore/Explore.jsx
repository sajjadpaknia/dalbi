import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";
import classes from "./Explore.module.css";
import FilterBrands from "./FilterBrands";
import ProductCard2 from "../../Common/ProductCard2/ProductCard2";
import { generalSortData } from "./Data";
import axios from "axios";
import FilterRam from "./FilterRam";
import Spinner from "../../Common/Spinner/Spinner";

export default function Explore() {
  const unique = (arr) => [...new Set(arr)];
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [generalSort, setGeneralSort] = useState(false);
  const [generalSortTitle, setGeneralSortTitle] = useState("");
  const [isRAM, setIsRAM] = useState(false);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [filter, setFilter] = useState({
    brand: null,
    ram: null,
  });
  const generalSortDropdown = useRef();
  const generalSortDropdownParent = useRef();
  useEffect(() => {
    setGeneralSortTitle(generalSortData[0].title);
  }, [category]);
  useEffect(() => {
    setLoading(true);
    const getItems = async () => {
      await axios.get("/products").then((res) => {
        setData(
          res.data.filter((item) => {
            return item.category === category;
          })
        );
        setData2(
          res.data.filter((item) => {
            return item.category === category;
          })
        );
         setLoading(false);
      });
      if (category === "phone") {
        setIsRAM(true);
      } else {
        setIsRAM(false);
      }
    };
    getItems();
  }, [category]);
  const filterProducts = (item) => {
    if (category === "books-podcasts") {
      setData2(
        data.filter((i) => {
          if (filter.brand) {
            return i.specifications.publisher === filter.brand;
          }
          return data;
        })
      );
    } else if (category === "phone") {
      let ramHasBeenFilteredArray = [];
      data
        .filter((i) => {
          if (filter.brand) {
            return i.specifications.brand === filter.brand;
          }
          return data;
        })
        .map((i) => {
          if (filter.ram) {
            i.configuration.map((el) => {
              if (el.ram === filter.ram) {
                ramHasBeenFilteredArray.push(i);
              }
              setData2(unique(ramHasBeenFilteredArray));
            });
          } else {
            ramHasBeenFilteredArray.push(i);
            setData2(unique(ramHasBeenFilteredArray));
          }
        });
    } else if (
      category === "shoes" ||
      category === "clothing" ||
      category === "Health-Personal-Care" ||
      category === "sports-goods" ||
      category === "stationery" ||
      category === "super-market"
    ) {
      setData2(
        data.filter((i) => {
          if (filter.brand) {
            return i.specifications.brand === filter.brand;
          }
          return data;
        })
      );
    }
  };
  window.addEventListener("click", ({ target }) => {
    if (
      target !== generalSortDropdown.current &&
      target !== generalSortDropdownParent.current
    ) {
      setGeneralSort(false);
    }
  });
  const sorting = (title) => {
    setGeneralSortTitle(title);
    if (title === "Price (High - Low)") {
      let result = data2.sort((a, b) => {
        return b.price - a.price;
      });
      setData2(result);
    } else if (title === "Price (Low - High)") {
      let result = data2.sort((a, b) => {
        return a.price - b.price;
      });
      setData2(result);
    } else if (title === "Top Sellers") {
      let result = data2.sort((a, b) => {
        return b.sellCount - a.sellCount;
      });
      setData2(result);
    } else {
      setData2(data2.reverse());
    }
  };
  return (
    <>
      <Container>
        <Header />
        {data2 && !loading ? (
          <main className={classes.main}>
            <section className={classes.filter_section}>
              <h1 className={classes.filter_title}>filter</h1>
              {data2 && (
                <>
                  <FilterBrands
                    data={data}
                    category={category}
                    filter={filter}
                    setFilter={setFilter}
                    filterProducts={filterProducts}
                  />
                  {isRAM && (
                    <FilterRam
                      data={data}
                      category={category}
                      filter={filter}
                      setFilter={setFilter}
                      filterProducts={filterProducts}
                    />
                  )}
                </>
              )}
            </section>
            <section className={classes.products_section}>
              <section className={classes.sort}>
                <div
                  className={`${classes.general_sort} ${
                    generalSort ? classes.show : null
                  }`}
                >
                  <div
                    className={classes.absoluteBtn}
                    onClick={() => {
                      setGeneralSort(!generalSort);
                    }}
                    ref={generalSortDropdownParent}
                  ></div>
                  <span className={classes.sort_title}>{generalSortTitle}</span>
                  <i className="fa-regular fa-angle-down"></i>
                  <div
                    className={`${classes.dropdown} ${
                      generalSort ? classes.show : null
                    }`}
                    ref={generalSortDropdown}
                  >
                    <ul className={classes.dropdown__list}>
                      {generalSortData.map((i) => {
                        return (
                          <li
                            className={classes.dropdown__item}
                            key={i.id}
                            onClick={() => {
                              sorting(i.title);
                            }}
                          >
                            <span>{i.title}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className={classes.Number_products}>
                  {data2 && data2.length} products
                </div>
              </section>
              {data2 && data2.length > 0 ? (
                <section className={classes.products}>
                  {data2.map((i) => {
                    return <ProductCard2 data={i} key={i.id} />;
                  })}
                </section>
              ) : (
                <div className={classes.notFound}>
                  <figure>
                    <img src="./assets/images/bag.png" alt="" />
                  </figure>
                  <p>No Products Found</p>
                </div>
              )}
            </section>
          </main>
        ) : (
          <div className={classes.loading}>
            <Spinner size={"40px"} borderSize={"5px"} />
          </div>
        )}
      </Container>
      <div className={classes.back}></div>
    </>
  );
}
