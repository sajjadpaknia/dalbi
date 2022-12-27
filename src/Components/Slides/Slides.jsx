import ProductCard from "../../Common/ProductCard/ProductCard";
import classes from "./Slides.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

const Slides = (props) => {
  return (
    <>
      <div className={classes.title}>
        <p>{props.title}</p>
      </div>
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
              500: {
                slidesPerView: 2,
              },
              750: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
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
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Slides;
