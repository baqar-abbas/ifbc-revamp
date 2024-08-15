import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "src/Context/ListingDataContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/themes/lara-light-teal/theme.css";

const categories = [
  { name: "Advertising", code: "Advertising" },
  { name: "Automotive", code: "Automotive" },
  { name: "BeautySpa", code: "Beauty & Spa" },
  {
    name: "BusinessManagementCoaching",
    code: "Business Management & Coaching",
  },
  { name: "BusinessServices", code: "Business Services" },
  {
    name: "ChildEducationStemTutoring",
    code: "Child Education, STEM & Tutoring",
  },
  { name: "ChildServicesProducts", code: "Child Services & Products" },
  {
    name: "CleaningResidentialCommercial",
    code: "Cleaning: Residential & Commercial",
  },
  { name: "ComputerTechnology", code: "Computer Technology" },
  {
    name: "DistributionServices",
    code: "Select a rating Distribution Services",
  },
  { name: "DryCleaningLaundry", code: "Dry Cleaning-Laundry" },
  { name: "FinancialServices", code: "Financial Services" },
  { name: "Fitness", code: "Fitness" },
  {
    name: "FoodBeverageRestaurantQSR",
    code: "Food & Beverage: Restaurant/QSR/Catering",
  },
  {
    name: "FoodCoffeeTeaSmoothiesSweets",
    code: "Food: Coffee/Tea/Smoothies/Sweets",
  },
  { name: "FoodStoresCatering", code: "Food: Stores & Catering" },
  { name: "HealthMedical", code: "Health/Medical" },
  { name: "HealthWellness", code: "Health/Wellness" },
  { name: "HomeImprovement", code: "Home Improvement" },
  { name: "InteriorExteriorDesign", code: "Interior/Exterior Design" },
  { name: "MaintenanceRepair", code: "Maintenance & Repair" },
  {
    name: "MovingStorageJunkRemoval",
    code: "Moving, Storage & Junk Removal",
  },
  { name: "Painting", code: "Painting" },
  { name: "PestControl", code: "Pest Control" },
  { name: "PetCareGrooming", code: "Pet Care & Grooming" },
  { name: "PrintCopyMailing", code: "Print, Copy & Mailing" },
  { name: "RealState", code: "Real Estate" },
  { name: "Restoration", code: "Restoration" },
  { name: "Retail", code: "Retail" },
  { name: "Security", code: "Security" },
  {
    name: "SeniorCareMedicalNonMedical",
    code: "Senior Care: Medical/Non-Medical",
  },

  { name: "Signs", code: "Signs" },
  { name: "SpecialEventPlanning", code: "Special Event Planning" },
  { name: "SportsRecreation", code: "Sports & Recreation" },
  { name: "Staffing", code: "Staffing" },
  { name: "TravelPlanning", code: "Travel Planning" },
  { name: "Vending", code: "Vending" },
];

const HomeBanner = () => {
  const listingBoxes = [
    {
      id: "Popular",
      // bgcolor: "#002880",
      bgcolor: "white",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
      ),
      min: 5,
      max: 10,
    },
    {
      id: "Recent",
      // bgcolor: "#00184d",
      bgcolor: "white",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      ),
      min: 1,
      max: 6,
    },
    {
      id: "Trending",
      // bgcolor: "#00081a",
      bgcolor: "white",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
          />
        </svg>
      ),
      min: 10,
      max: 15,
    },
  ];
  const slidesData = [
    {
      image: "/images/accounts/background.png",
      text: "Discover Amazing Business Ventures Today!",
    },
    {
      image: "/images/accounts/background.png",
      text: "Unlock Your Potential with Our Franchises!",
    },

    {
      image: "/images/accounts/background.png",
      text: "Start Your Journey to Business Success!",
    },
  ];

  return (
    <>
      <section
        id="homebanner"
        className="w-full min-h-[500px] relative flex flex-col  items-center "
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          spaceBetween={30}
          effect="fade"
          loop
          speed="1000"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            stopOnLastSlide: false,
          }}
          className="w-full swiperslidehomebannermain  min-h-[500px] flex h-full flex-col  z-10 relative"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="swiperslidehomebanner w-full  md:px-32 min-h-[600px]  flex flex-col justify-start max-md:pt-16 md:max-xl:pt-32 xl:pt-40  items-center"
                style={{
                  background: `url(${slide.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1
                  className="max-md:text-xl  z-50 relative  md:text-5xl max-md:px-5  text-center text-white"
                  style={{
                    lineHeight: window.innerWidth > 768 ? "3rem" : "40px",
                    textShadow: "1px 1px 10px black",
                  }}
                >
                  {slide.text}
                </h1>
              </div>
            </SwiperSlide>
          ))}
          {/* swiper end */}
        </Swiper>
        <div className="absolute bg-transparent max-md:top-44 md:top-60 w-full mx-auto flex flex-col gap-10 z-20 md:px-32 max-md:px-4 ">
          <SearchingSection />
        </div>
      </section>

      <div id="popular-cats" className="w-full grid grid-cols-12 z-50">
        {listingBoxes.map((box, index) => (
          <ListingBox
            key={index}
            id={box.id}
            bgcolor={box.bgcolor}
            svg={box.svg}
            min={box.min}
            max={box.max}
          />
        ))}
      </div>
    </>
  );
};

const SearchingSection = () => {
  const ref = useRef();
  const { setFilters } = useContext(MyContext);
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedInvest, setSelectedInvest] = useState("");
  const [activeDD, setActiveDD] = useState(false);
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDD("");
    }
  };

  useEffect(() => {
    if (activeDD) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeDD]);
  const history = useNavigate();
  const filterDataa = [
    {
      anotherText: "Select Investment Range",
      normalText: "Investment Range",
      property: "investmentRange",
    },
  ];

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    const searchValue = ref.current.value;
    const selectedValues = selectedCats.map((cats) => cats.code);
    if (selectedValues.length > 0) {
      setFilters((prev) => ({ ...prev, category: selectedValues }));
    }
    if (selectedInvest !== "") {
      setFilters((prev) => ({ ...prev, ...selectedInvest }));
    }
    if (searchValue !== "") {
      setFilters((prev) => ({ ...prev, search: [searchValue] }));
    }
    history("/search-franchises");
  };

  return (
    <form
      id="searching-contianer"
      className="grid grid-cols-12 gap-2   p-5"
      ref={dropdownRef}
      onSubmit={handleSearchInputChange}
    >
      <div className="relative col-span-12 md:col-span-4  flex items-center">
        <input
          type="search"
          id="search-field"
          placeholder="Search Any Listing"
          ref={ref}
          className="block w-full px-2 h-12 text-sm rounded-lg  text-black pr-10  outline-none bg-white"
        />

        <button className=" absolute right-2.5 top-5.5 w-4 h-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 487.95 487.95"
          >
            <path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
          </svg>
        </button>
      </div>

      <MultiSelect
        value={selectedCats}
        onChange={(e) => setSelectedCats(e.value)}
        options={categories}
        optionLabel="code"
        filter
        display="chip"
        placeholder="Select Categories"
        // maxSelectedLabels={3}
        className="max-md:col-span-12 md:col-span-3 bg-[#e3e4e6] "
      />

      {filterDataa.map((config, index) => (
        <SearchDropdown
          key={index}
          config={config}
          setSelectedCats={setSelectedInvest}
          selectedCats={selectedInvest}
          activeDD={activeDD}
          setActiveDD={setActiveDD}
        />
      ))}
      <button
        type="submit"
        className="max-md:col-span-12 md:col-span-2 w-full  overflow-hidden font-medium transition-all duration-500 bg-[#1256c4] h-12 text-center text-white rounded-lg"
      >
        Search
      </button>
    </form>
  );
};

const SearchDropdown = ({
  config,
  setSelectedCats,
  selectedCats,
  setActiveDD,
  activeDD,
}) => {
  const { property, anotherText } = config;

  let uniqueItems = [
    { value: "", text: "Cash to Invest" },
    { value: "$25000", text: "Up to $25,000" },
    { value: "$50000", text: "Up to $50,000", selected: true },
    { value: "$100000", text: "Up to $100,000" },
    { value: "$250000", text: "Up to $250,000" },
    { value: "$500000", text: "Up to $500,000" },
    { value: "$1000000", text: "Up to $1,000,000" },
    { value: "$5000000", text: "Up to $5,000,000" },
  ];
  const handleDropdown = (property) => {
    if (activeDD === property) {
      setActiveDD("");
    } else {
      setActiveDD(property);
    }
  };

  return (
    <div
      className="relative w-full group flex flex-col gap-2 col-span-12 md:col-span-3 h-12 rounded-lg "
      style={{ background: "#e3e4e6 " }}
    >
      <button
        className={`h-full px-4 text-sm w-full capitalize text-[#000000]  transition-all duration-250  focus:outline-none focus:ring-0 peer flex items-center justify-between   ${
          selectedCats &&
          selectedCats[property] &&
          selectedCats[property] !== ""
            ? "text-xs"
            : ""
        }`}
        onClick={() => handleDropdown(property)}
        type="button"
      >
        {selectedCats && Object.keys(selectedCats)[0] === property ? (
          <>
            {selectedCats[property]}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="rgb(107, 114, 128)"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </>
        ) : (
          <>
            {anotherText !== "" && anotherText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="rgb(107, 114, 128)"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </>
        )}
      </button>
      <div
        className={`absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] shadow-lg w-full rounded-lg mt-1 ${
          activeDD === property ? "max-h-[300px]" : "h-0 opacity-0"
        } duration-200 bg-white border border-dimmed text-sm md:text-sm  overflow-y-auto ]`}
      >
        {uniqueItems &&
          uniqueItems.map((item, index) => (
            <div className="flex justify-between items-center" key={index}>
              <div
                onClick={() => {
                  setActiveDD("");
                  setSelectedCats({ [property]: [item.value] });
                }}
                className="text-black w-full block cursor-pointer hover:text-link px-3 
              py-2 hover:bg-slate-200"
              >
                <span>{item.text}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const ListingBox = ({ id, bgcolor, svg, min, max }) => {
  const uniqueFranchisedCats = [
    "Advertising",
    "Automotive",
    "Beauty & Spa",
    "Business Management & Coaching",
    "Business Services",
    "Child Education",
    "Child Services & Products",
    "Cleaning: Residential & Commercial",
    "Computer Technology",
    "Copy & Mailing",
    "Distribution Services",
    "Dry Cleaning-Laundry",
    "Financial Services",
    "Fitness",
    "Food & Beverage: Restaurant/QSR/Catering",
    "Food: Coffee/Tea/Smoothies/Sweets",
    "Food: Stores & Catering",
    "Health/Medical",
    "Health/Wellness",
    "Home Improvement",
    "Interior/Exterior Design",
    "Maintenance & Repair",
    "Pet Care & Grooming",
    "Print",
    "Real Estate",
    "Restoration",
    "Retail",
    "Senior Care: Medical/Non-Medical Option",
    "Signs",
    "Special Event Planning",
    "Sports & Recreation",
    "Staffing",
    "STEM & Tutoring",
  ];

  const { setFilters } = useContext(MyContext);
  const history = useNavigate();
  const handleSearchInputChange = (cat) => {
    setFilters({ category: [cat] });

    history("/search-franchises");
  };
  return (
    <div
      id={id}
      className={` w-full col-span-12 md:col-span-4 p-5`}
      style={{ backgroundColor: `${bgcolor}` }}
    >
      <h3 className="text-lg font-bold text-black flex items-center gap-1 ">
        {svg}
        {id} Franchises
      </h3>
      <ul id="list-container " className="ml-7 mt-3 flex flex-col gap-2">
        {uniqueFranchisedCats.map((listing, index) => {
          if (index > min && index < max) {
            return (
              <li key={listing.name} className="text-sm text-black list-disc ">
                <button
                  onClick={() => handleSearchInputChange(listing)}
                  to="/search-franchises"
                  className="group relative text-left"
                >
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full group-hover:transition-all"></span>
                  {listing}
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default HomeBanner;
