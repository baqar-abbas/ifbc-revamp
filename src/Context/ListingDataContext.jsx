/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
// import { addAllListings } from "src/Redux/listingReducer";

// Step 1: Create a new context
export const MyContext = createContext();

// Step 3: Define a context provider component
const ListingDataContext = ({ children }) => {
  const [showActiveListings, setShowActiveListings] = useState(false);
  const [filters, setFilters] = useState(null);
  const activeListings = useSelector((state) => state.counter.activeListings);
  const [paginationListings, setPaginationListings] = useState();
  const userDetails = useSelector((state) => state.counter.userDetails);
  const token = useSelector((state) => state.counter.token);
  const role =
    userDetails && typeof userDetails === "object"
      ? userDetails.userType
      : null;
  const [showCart, setShowCart] = useState(false);

  //const reduxListings = useSelector((state) => state.counter.listings);
  //const [listings, setListings] = useState([]);
  //const [loading, setLoading] = useState();
  // const [loadingError, setLoadingError] = useState();

  const url = `https://backend.ifbc.co/api/listingsmstr`;
  const { data, isLoading, error, isFetching } = useQuery(
    "FRANCHISE",
    () => {
      return axios.get(url);
    },
    {
      staleTime: 86400 * 30,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      select: (data) => {
        if (!role || role === "N") {
          return data?.data.map((d) => ({
            docId: d.docId,
            name: d.name,
            imgUrl: d.imgUrl,
            yearEstablished: d.yearEstablished,
            category: d.category,
            investmentRange: d.investmentRange,
            shortdescription: d.shortdescription,
          }));
        } else {
          const normalFLS = data?.data?.filter(
            (data) => data.listingMemberships !== ""
          );
          return normalFLS;
        }
      },
    }
  );

  // const dispatch = useDispatch();

  // const getAllListings = async () => {
  //   setLoading(true);

  //   const url = `https://backend.ifbc.co/api/listingsmstr`;
  //   const responseData = await axios
  //     .get(url)
  //     .then(async (response) => {
  //       // Handle successful response
  //       if (response.data.length > 0) {
  //         setLoading(false);
  //         return response.data;
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       setLoadingError(true);
  //       console.error("Error fetching data:", error);
  //     });
  //   return responseData;
  // };

  // useEffect(() => {
  //   const GetData = async () => {
  //     if (reduxListings && reduxListings.length > 0) {
  //       setListings(reduxListings);
  //     } else {
  //       const listings = await getAllListings();
  //       if (listings && listings.length > 0) {
  //         const normalFLS = await listings.filter(
  //           (data) => data.listingMemberships !== ""
  //         );
  //         dispatch(addAllListings(normalFLS));
  //         setListings(normalFLS);
  //       }
  //     }
  //   };
  //   GetData();

  //   // Make a GET request to fetch the data
  // }, [listings]); // Empty dependency array to run once on component mount
  return (
    <MyContext.Provider
      value={{
        userDetails,
        listings: data || [],
        loading: isLoading,
        loadingError: error,
        activeListings,
        filters,
        setFilters,
        showActiveListings,
        setShowActiveListings,
        paginationListings,
        setPaginationListings,
        token,
        role,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ListingDataContext;
