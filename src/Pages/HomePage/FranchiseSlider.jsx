import React, { useContext } from "react";

import { MyContext } from "src/Context/ListingDataContext";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FranchiseSlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const { listings } = useContext(MyContext);
  return (
    <section className="pt-10 flex flex-col gap-3 max-w-[1000px] mx-auto mb-20">
      <h1 className="w-full text-center font-medium uppercase text-3xl text-custom-heading-color">
        We REPRESENT
        <span className="text-custom-blue font-bold">
          {" "}
          HUNDREDS OF FRANCHISES
        </span>
      </h1>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        centerMode={true}
        infinite={true}
        autoPlay={window.innerWidth > 768 ? true : false}
        autoPlaySpeed={2000}
        transitionDuration={500}
      >
        {listings?.map(
          (listing, index) =>
            index < 15 &&
            listing.imgUrl !==
              "images/ShoppersDrapesandBlinds.png" && (
              <img
                src={"/" + listing.imgUrl}
                alt=""
                className="w-32 h-32 object-cover rounded-3xl"
              />
            )
        )}
      </Carousel>
    </section>
  );
};

export default FranchiseSlider;
