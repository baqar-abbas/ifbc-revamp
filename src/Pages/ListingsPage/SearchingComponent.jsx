import { useEffect, useRef, useState } from "react";

const SearchingComponent = ({ setFilters, filters }) => {
  const ref = useRef();

  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    if (!filters?.search || filters?.search === "") {
      setSearchKeyword("");
    }
  }, [filters]);

  // Function to handle changes in the search input field
  const handleSearchInputChange = (e) => {
    e.preventDefault();
    const keyword = ref.current.value;
    setSearchKeyword(keyword);

    if (keyword !== "") {
      // Update the filters state with the search keyword
      setFilters((prev) => ({
        ...prev,
        search: [keyword],
      }));
    } else {
      // Update the filters state and delete the search key if keyword is empty
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.search;
        return newFilters;
      });
    }
  };

  return (
    <form className="relative" onSubmit={handleSearchInputChange}>
      <input
        type="search"
        id="search-field"
        placeholder="Search Any Listing"
        value={searchKeyword}
        ref={ref}
        onChange={handleSearchInputChange}
        className="block w-full p-2.5 text-sm text-black pr-10 outline-none bg-white rounded border-gray-700 border"
      />

      <button className=" absolute right-2.5 top-3   w-4 h-4" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 487.95 487.95"
        >
          <path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
        </svg>
      </button>
    </form>
  );
};
export default SearchingComponent;
