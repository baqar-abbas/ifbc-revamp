import React from "react"; // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
  const reviews = [
    // {
    //   image: "/images/accounts/ndtv.png",
    //   title: "NDTV",
    //   link: "",
    // },
    {
      image: "/images/accounts/abc.png",
      title: "ABC",
      link: "https://abcnewsnow.uk/business/international-franchise-business-consultant-explains-why-more-franchisees-are-going-global-out-of-the-gate/",
    },
    {
      image: "/images/accounts/medium.png",
      title: "Medium",
      link: "https://medium.com/@imperiummgroupp/ifbc-explains-how-to-choose-the-right-franchise-for-yourself-b017c573869c",
    },
    {
      image: "/images/accounts/NY.png",
      title: "NY",
      link: "https://thenewyorkentrepreneur.com/2023/11/ready-to-have-your-own-franchise-ifbc-explains-how-to-make-the-process-smoother/",
    },
    {
      image: "/images/accounts/LA.png",
      title: "LA",
      link: "https://thelosangelesentrepreneur.com/2023/11/29/ifbc-gives-4-reasons-why-having-a-franchise-is-easier-than-starting-a-business-from-scratch/",
    },
    // {
    //   image: "/images/accounts/fox.png",
    //   title: "FOX",
    //   link: "",
    // },
  ];

  return (
    <section className="py-[30px] mb-20 bg-it-gray">
      <div className="theme-container mx-auto w-full">
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
              <div className="flex flex-col items-center relative pt-[52px] pb-10 px-10 bg-white rounded-2xl">
                <a
                  href={review.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={review.image}
                    alt={review.title}
                    className="mx-auto w-64 rounded-3xl"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
