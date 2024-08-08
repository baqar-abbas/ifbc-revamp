import AllListings from "./AllListings";
import ListingsFilter from "./ListingsFilter";
import PageTransition from "src/Animations/PageTransition";
import RelatedListings from "src/Globals/RelatedListings";

const MainListings = ({ setShow, setRegistrationType }) => {
  return (
    <PageTransition>
      <main
        className="	   grid grid-cols-12 md:gap-6  relative md:px-10 max-md:px-5 py-5 my-5"
        id="main"
      >
        <div
          id="left-sidebar"
          className="md:col-span-3  sm:col-span-6 col-span-12 md:my-5 bg-white relative"
        >
          <ListingsFilter />
        </div>

        <div
          id="right-sidebar"
          className="md:col-span-9 sm:col-span-6 col-span-12 my-5"
        >
          <AllListings
            setShow={setShow}
            setRegistrationType={setRegistrationType}
          />
        </div>
      </main>

      <RelatedListings />
    </PageTransition>
  );
};

export default MainListings;
