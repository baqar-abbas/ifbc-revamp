import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "src/Context/ListingDataContext";
import SearchingComponent from "./SearchingComponent";

import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-teal/theme.css";
const categories = [
  { code: "Advertising" },
  { code: "Automotive" },
  { code: "Beauty & Spa" },
  {
    code: "Business Management & Coaching",
  },
  { code: "Business Services" },
  {
    code: "Child Education, STEM & Tutoring",
  },
  { code: "Child Services & Products" },
  {
    code: "Cleaning: Residential & Commercial",
  },
  { code: "Computer Technology" },
  {
    code: "Select a rating Distribution Services",
  },
  { code: "Dry Cleaning-Laundry" },
  { code: "Financial Services" },
  { code: "Fitness" },
  {
    code: "Food & Beverage: Restaurant/QSR/Catering",
  },
  {
    code: "Food: Coffee/Tea/Smoothies/Sweets",
  },
  { code: "Food: Stores & Catering" },
  { code: "Health/Medical" },
  { code: "Health/Wellness" },
  { code: "Home Improvement" },
  { code: "Interior/Exterior Design" },
  { code: "Maintenance & Repair" },
  {
    code: "Moving, Storage & Junk Removal",
  },
  { code: "Painting" },
  { code: "Pest Control" },
  { code: "Pet Care & Grooming" },
  { code: "Print, Copy & Mailing" },
  { code: "Real Estate" },
  { code: "Restoration" },
  { code: "Retail" },
  { name: "Security", code: "Security" },
  {
    code: "Senior Care: Medical/Non-Medical",
  },

  { code: "Signs" },
  { code: "Special Event Planning" },
  { code: "Sports & Recreation" },
  { code: "Staffing" },
  { code: "Travel Planning" },
  { code: "Vending" },
];
const ListingsFilter = () => {
  const { filters, setFilters, role, token } = useContext(MyContext);
  const [filterData, setFilterData] = useState([]);
  const [activeDD, setActiveDD] = useState(false);
  const dropdownRef = useRef(null);
  const roleCheck = (!role || role === "N") && !token;
  const [selectedCats, setSelectedCats] = useState([]);
  useEffect(() => {
    if (filters?.category) {
      let cats = filters?.category.map((cat) => ({
        code: cat,
      }));
      setSelectedCats(cats);
    }
  }, []);

  useEffect(() => {
    if (roleCheck) {
      const filterDataa = [
        // {
        //   anotherText: "Select Category",
        //   normalText: "Category",
        //   property: "category",
        // },

        {
          anotherText: "Select Investment Range",
          normalText: "Investment Range",
          property: "investmentRange",
        },
        // {
        //   anotherText: "Select Territories",
        //   normalText: "Territories",
        //   property: "territories",
        // },
        {
          anotherText: "Select Year Established",
          normalText: "Year Established",
          property: "yearEstablished",
        },
      ];
      setFilterData(filterDataa);
    } else {
      const filterDataa = [
        // {
        //   anotherText: "Select Category",
        //   normalText: "Category",
        //   property: "category",
        // },
        {
          anotherText: "Select Franchise Fee",
          normalText: "Franchise Fee",
          property: "franchiseFee",
        },
        {
          anotherText: "Select Investment Range",
          normalText: "Investment Range",
          property: "investmentRange",
        },

        {
          anotherText: "Select Owned Units",
          normalText: "Owned Units",
          property: "ownedUnits",
        },
        {
          anotherText: "Select Projected New Units",
          normalText: "Projected New Units",
          property: "projectedNewUnits",
        },

        {
          anotherText: "Select Month Cash",
          normalText: "Month Cash",
          property: "monthCash",
        },

        {
          anotherText: "Select Liquidity",
          normalText: "Liquidity",
          property: "liquidity",
        },

        {
          anotherText: "Select Year Established",
          normalText: "Year Established",
          property: "yearEstablished",
        },
        {
          anotherText: "Select Territories",
          normalText: "Territories",
          property: "territories",
        },
      ];
      setFilterData(filterDataa);
    }
  }, [role]);

  // Check if any filters are not empty
  const hasActiveFilters =
    filters &&
    Object.values(filters).some((filterArray) => filterArray.length > 0);
  // Extract active filters
  const activeFilters =
    filters &&
    Object.entries(filters)?.filter(([key, value]) => value.length > 0);

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

  const handleRemoveFilter = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: prevFilters[key].filter((filterValue) => filterValue !== value),
    }));
    if (key === "category") {
      setSelectedCats((prevCats) => {
        return prevCats.filter((filterValue) => filterValue.code !== value);
      });
    }
  };

  const handleSelectCats = (e) => {
    const selectedCats = e.target.value;
    setSelectedCats(selectedCats);
    const selectedValues = selectedCats.map((cats) => cats.code);
    setFilters((prev) => ({ ...prev, category: selectedValues }));
  };

  return (
    <div
      id="main-filter-container"
      ref={dropdownRef}
      className="p-8 bg-[#2176ff]/30 rounded-3xl mt-20"
    >
      {hasActiveFilters && (
        <div className="mb-4">
          <button
            onClick={() => setFilters({})}
            className=" cursor-pointer rounded-xl   transition flex items-center gap-1 bg-red-800 px-3 justify-between w-full outline-none capitalize text-sm py-1 text-white"
          >
            Clear All Filters{" "}
            <span className="text-red">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
          <div className="mt-2">
            <h3>Active Filters:</h3>
            <ul className="divide-y-2">
              {activeFilters?.map(([key, values]) =>
                values.map((value) => (
                  <li
                    key={`${key}-${value}`}
                    className="bg-gray-700 flex items-center capitalize justify-between my-2 py-2  text-xs border border-gray-700 px-3 rounded-xl"
                  >
                    <span className="text-white">
                      {key?.replace(/([A-Z])/g, " $1").trim()} :{" "}
                      {value?.replace(/^.*?:/, "").trim()}
                      {/* {key} : {value} */}
                    </span>

                    <button
                      className="ml-2 text-red-600  cursor-pointer"
                      onClick={() => handleRemoveFilter(key, value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
      {roleCheck && (
        <div className="w-full my-5">
          <SearchingComponent setFilters={setFilters} />
        </div>
      )}
      <MultiSelect
        value={selectedCats}
        onChange={handleSelectCats}
        options={categories}
        optionLabel="code"
        //filter
        placeholder="Select Categories"
        // maxSelectedLabels={3}
        className=" w-full md:text-xs  transition-all duration-300 bg-white border border-gray-700 focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded  mb-5"
      />
      {filterData.map((filter, index) => (
        <CategorySearch
          key={index}
          anotherText={filter.anotherText}
          normalText={filter.normalText}
          property={filter.property}
          activeDD={activeDD}
          setActiveDD={setActiveDD}
        />
      ))}
    </div>
  );
};

const CategorySearch = ({
  property,
  anotherText,
  normalText,
  activeDD,
  setActiveDD,
}) => {
  const { listings, filters, setFilters } = useContext(MyContext);
  const [selectedCats, setSelectedCats] = useState(
    (filters && filters[property]) || []
  );

  const handleCatSelection = (cat, property) => {
    const catLower = cat.toLowerCase();
    let newSelCats = [];
    const isCatSelected = selectedCats.includes(catLower);
    if (isCatSelected) {
      newSelCats = selectedCats.filter((item) => item !== catLower);
    } else {
      newSelCats = [catLower];
    }
    setActiveDD(false);
    setSelectedCats(newSelCats);
    setFilters((prev) => ({ ...prev, [property]: newSelCats }));
  };

  const generateRangeArray = (start, end, step, check) => {
    let rangeArray = [];
    for (let i = start; i < end; i += step) {
      let rangeEnd = i + step;
      if (rangeEnd > end) rangeEnd = end; // Ensure the final range does not exceed 'end'

      if (check) {
        rangeArray.push(
          `$${i.toLocaleString()} - $${rangeEnd.toLocaleString()}`
        );
      } else {
        rangeArray.push(`${i} - ${rangeEnd}`);
      }
    }
    if (check) {
      rangeArray.push(`> $${end}`);
    } else {
      rangeArray.push(`> ${end}`);
    }
    return rangeArray;
  };

  const handleDropdown = (property) => {
    if (activeDD === property) {
      setActiveDD("");
    } else {
      setActiveDD(property);
    }
  };

  const franchiseFee = generateRangeArray(1000, 150000, 10000, true);

  const franchisedUnits = generateRangeArray(0, 1000, 100, false);

  const investmentRange = generateRangeArray(10000, 1000000, 100000, true);

  const ownedUnits = generateRangeArray(0, 200, 50, false);

  const projectedNewUnits = generateRangeArray(0, 200, 50, false);
  const liquidity = generateRangeArray(10000, 300000, 10000, true);
  const yearEstablished = generateRangeArray(1950, 2020, 5, false);
  const monthCash = generateRangeArray(5000, 150000, 20000, true);

  const categories = [
    "Advertising",
    "Automotive",
    "Beauty & Spa",
    "Business Management & Coaching",
    "Business Services",
    "Child Education, STEM & Tutoring",
    "Child Services & Products",
    "Cleaning: Residential & Commercial",
    "Computer Technology",
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
    "Moving, Storage & Junk Removal",
    "Painting",
    "Pet Care & Grooming",
    "Pest Control",
    "Print, Copy & Mailing",
    "Real Estate",
    "Restoration",
    "Retail",
    "Security",
    "Senior Care: Medical/Non-Medical Option",
    "Signs",
    "Special Event Planning",
    "Sports & Recreation",
    "Staffing",
    "Travel Planning",
    "Vending",
  ];

  const territories = [
    "United States",
    "Canada: Willing To Register",
    "International",
    "Canada: Registered",
  ];

  let uniqueFranchisedCats = [];
  if (property === "franchiseFee") {
    uniqueFranchisedCats = franchiseFee;
  } else if (property === "franchisedUnits") {
    uniqueFranchisedCats = franchisedUnits;
  } else if (property === "investmentRange") {
    uniqueFranchisedCats = investmentRange;
  } else if (property === "category") {
    uniqueFranchisedCats = categories;
  } else if (property === "ownedUnits") {
    uniqueFranchisedCats = ownedUnits;
  } else if (property === "projectedNewUnits") {
    uniqueFranchisedCats = projectedNewUnits;
  } else if (property === "liquidity") {
    uniqueFranchisedCats = liquidity;
  } else if (property === "yearEstablished") {
    uniqueFranchisedCats = yearEstablished;
  } else if (property === "monthCash") {
    uniqueFranchisedCats = monthCash;
  } else if (property === "territories") {
    uniqueFranchisedCats = territories;
  }

  return (
    <div className="relative w-full group flex flex-col gap-2 mb-5">
      <button
        className="py-2.5 px-3 w-full md:text-sm text-site transition-all duration-300 bg-white border border-gray-700 focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded "
        onClick={() => handleDropdown(property)}
      >
        {selectedCats.length > 0 ? anotherText : normalText}
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
      </button>
      <div
        className={`absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] shadow-lg w-full ${
          activeDD === property ? "h-48" : "h-0 opacity-0"
        } duration-200 bg-white  border border-dimmed text-sm md:text-sm overflow-auto`}
      >
        {uniqueFranchisedCats.map((cat, index) => {
          const length = listings.filter(
            (listing) => listing[property] === cat
          ).length;
          return (
            <div className="flex justify-between items-center" key={index}>
              <div
                onClick={() => handleCatSelection(cat, property)}
                className={`text-black w-full block cursor-pointer hover:bg-slate-300 hover:text-link px-3 py-2`}
              >
                <span>{cat}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListingsFilter;
