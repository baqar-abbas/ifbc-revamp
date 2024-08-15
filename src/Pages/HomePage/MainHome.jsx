import React from "react";
import HomeBanner from "./HomeBanner";
import About from "../GlobalPageSections/About";
import About2 from "../GlobalPageSections/About2";
import Services from "./Services";
import Testimonials from "../GlobalPageSections/Testimonials";
import PreFooter from "src/Globals/PreFooter";
import PageTransition from "src/Animations/PageTransition";
import RelatedListings from "src/Globals/RelatedListings";
import { Helmet } from "react-helmet";

const MainHome = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Home | International Franchise Business Consultant</title>
        <meta
          name="description"
          content="Welcome to International Franchise Business Consultants. Your trusted partner in franchise opportunities, providing expert guidance and support to help you succeed in the world of franchising."
        />
      </Helmet>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full">
            <HomeBanner />
            <About />
            <About2 />
            <Services />
            <Testimonials />
            <RelatedListings />
            <PreFooter />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default MainHome;
