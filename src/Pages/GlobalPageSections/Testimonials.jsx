import React from "react"; // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
  const reviews = [
    {
      image: "/images/accounts/ndtv.png",
      title: "NDTV",
      link: "",
    },
    {
      image: "/images/accounts/global.png",
      title: "GLOBAL",
      link: "",
    },
    {
      image: "/images/accounts/trt.png",
      title: "TRT",
      link: "",
    },
    {
      image: "/images/accounts/cnbc.png",
      title: "CNBC",
      link: "",
    },
    {
      image: "/images/accounts/cnn.png",
      title: "CNN",
      link: "",
    },
    {
      image: "/images/accounts/fox.png",
      title: "FOX",
      link: "",
    },
  ];

  return (
    <section className="py-[30px] mb-20 bg-it-gray">
      <div className="theme-container mx-auto w-full">
        {/* <h1 className="px-5 bg-main-gray border border-it-blue/20 text-it-blue font-medium rounded-[30px] w-fit mx-auto">
          Our Testimonials
        </h1> */}
        {/* <h2 className="max-w-[847px] font-semibold text-24 sm:text-48 text-main-black text-center mx-auto my-4 md:my-8">
          Customer Say About Our Services
        </h2> */}

        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={window.innerWidth < 768 ? 1 : 4}
          navigation={window.innerWidth < 768 ? false : true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {reviews?.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center relative pt-[52px] pb-10 px-10 bg-white rounded-2xl ">
                <img
                  src={review.image}
                  alt={review.title}
                  className="mx-auto w-64 rounded-3xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
