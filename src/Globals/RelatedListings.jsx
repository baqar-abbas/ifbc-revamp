import { useContext } from "react";
import BarLoader from "src/Animations/BarLoader";
import { MyContext } from "src/Context/ListingDataContext";
import ListingsColumns from "src/Pages/ListingsPage/ListingsColumns";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NavLink } from "react-router-dom";

const RelatedListings = ({ isForm }) => {
  const { listings, loading, role } = useContext(MyContext);
  function getRandomNumberInInterval(min, max, interval) {
    const rangeMin = Math.ceil(min / interval) * interval;
    const rangeMax = Math.floor(max / interval) * interval;
    const randomInterval =
      Math.floor(Math.random() * ((rangeMax - rangeMin) / interval + 1)) *
      interval;
    return rangeMin + randomInterval;
  }

  function getRandomMinMaxInIntervals(min, max, interval) {
    // Generate a random minimum number within the interval
    const randomMin = getRandomNumberInInterval(min, max - interval, interval);

    // Generate a random maximum number within the interval that is at least one interval more than randomMin
    const randomMax = getRandomNumberInInterval(
      randomMin + interval,
      max,
      interval
    );

    return { randomMin, randomMax };
  }

  // Example usage
  const min = 0;
  const max = 508;
  const interval = 25;

  const { randomMin, randomMax } = getRandomMinMaxInIntervals(
    min,
    max,
    interval
  );

  return loading ? (
    <div className="grid place-content-center bg-custom-dark-blue px-4 py-24">
      <BarLoader />
      <h4>Loading Listings</h4>
    </div>
  ) : (
    <section className="hidden md:block bg-custom-dark-blue/15 p-12">
      <h2 className="font-medium font-poppins text-5xl capitalize mb-4 text-custom-heading-color  text-center mt-0">
        Featured Franchises
      </h2>

      <div
        className="max-w-5xl m-auto flex items-center h-full"
        id="home-swiper"
      >
        <Swiper
          modules={[Navigation, Autoplay, Pagination, A11y, EffectCoverflow]}
          spaceBetween={role && role !== "N" ? 50 : 20}
          slidesPerView={3}
          centeredSlides
          initialSlide={12}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          navigationautoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {listings &&
            listings.length > 0 &&
            listings.map((listing, index) => {
              if (index > randomMin && index < randomMax) {
                return (
                  <SwiperSlide key={index}>
                    <ListingsColumns listing={listing} slider={true} />
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
      </div>

      <div className="flex items-center justify-center">
        <NavLink to="/search-franchises" className="candidate-btn md:w-64">
          Explore More Franchises
        </NavLink>
      </div>
    </section>
  );
};

export default RelatedListings;
