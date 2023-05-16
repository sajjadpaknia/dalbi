import classes from "./Slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Slider() {
  return (
    <>
      <section className={classes.slider}>
        <div className={classes.swiperItem}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            lazy={{
              loadPrevNext: true,
            }}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/1.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/2.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/3.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/4.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/5.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/6.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/7.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/8.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/9.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"#"}>
                <LazyLoadImage
                  effect="blur"
                  className={classes.image}
                  src="/assets/images/slider/10.jpg"
                  alt=""
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={classes.item}>
          <Link to={"#"}>
            <LazyLoadImage
              effect="blur"
              className={classes.image}
              src="/assets/images/adv (2).jpg"
              alt=""
            />
          </Link>
        </div>
        <div className={classes.item}>
          <Link to={"#"}>
            <LazyLoadImage
              effect="blur"
              className={classes.image}
              src="/assets/images/adv (1).jpg"
              alt=""
            />
          </Link>
        </div>
      </section>
    </>
  );
}
