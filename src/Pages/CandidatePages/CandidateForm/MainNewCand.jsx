import PageTransition from "src/Animations/PageTransition";
import Form from "./Form";
import { Helmet } from "react-helmet";

const MainNewCand = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Apply Now | International Franchise Business Consultant</title>
        <meta
          name="description"
          content="Apply now to start your journey with International Franchise Business Consultants. Discover franchise opportunities and get professional consulting to help you succeed in the franchise business."
        />
      </Helmet>

      <section className="flex flex-col w-full " id="main">
        <div
          id="rows-container"
          className="relative  place-items-center gap-5 px-5 md:px-0 "
        >
          <Form />
        </div>
      </section>
    </PageTransition>
  );
};

export default MainNewCand;
