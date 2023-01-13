import ProductCard from "../../Common/ProductCard/ProductCard";
import classes from "./Slides.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import CategoryTitle from "../../Common/CategoryTitle/CategoryTitle";

const Slides = (props) => {
  return (
    <>
      <CategoryTitle>{props.title}</CategoryTitle>

      <section
        className={classes.container}
        style={{ background: `var(${props.bkColor})` }}
      >
        <div className={classes.wrapper}>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={true}
            breakpoints={{
              480: {
                slidesPerView: 2,
              },
              650: {
                slidesPerView: 3,
              },
              850: {
                slidesPerView: 4,
              },
              1100: {
                slidesPerView: 5,
              },
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {props.products.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductCard data={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slides;
