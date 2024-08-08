import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { addAllRegistrations } from "src/Redux/listingReducer";
export const MyTCFRContext = createContext();

const TCFRDataContext = ({ children }) => {
  const [filters, setFilters] = useState(null);
  const userDetails = useSelector((state) => state.counter.userDetails);
  // const [tcs, setTcs] = useState([]);
  // const [frs, setFrs] = useState([]);
  // const [all, setAll] = useState([]);
  // const reduxRegistrations = useSelector(
  //   (state) => state.counter.registrations
  // );
  // const [loadingTCFR, setLoading] = useState();
  // const [loadingError, setLoadingError] = useState(false);
  // const [newData, setNewData] = useState();
  // const dispatch = useDispatch();
  // const [candIds, setCandIds] = useState([]);

  const role =
    userDetails && typeof userDetails === "object"
      ? userDetails.userType
      : null;

  const url = `https://backend.ifbc.co/api`;

  const { data, isLoading, error } = useQuery(
    "MESSAGES",
    () => {
      if (role && role !== "N") {
        return axios.get(`${url}/registrations`);
      }
      return;
    },
    {
      cacheTime: 86400,
      select: (data) => {
        const allData = data?.data?.filter(
          (msg) => msg?.agentId === userDetails?.docId
        );
        return allData;
      },
    }
  );

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const sanitizelistingsIds = (listingsIds) => {
  //       // Remove any non-numeric and non-comma characters
  //       const sanitized = listingsIds.replace(/[^0-9,]/g, "");
  //       return sanitized.split(",").filter((id) => id.trim() !== "");
  //     };

  //     const transformedData = data.flatMap((item) => {
  //       const listingsIdsArray = sanitizelistingsIds(item.listingsIds);

  //       return listingsIdsArray.map((listingId, index) => ({
  //         ...item,
  //         listingsIds: listingId,
  //         serialNumber: index + 1, // Add serial number starting from 1
  //       }));
  //     });

  //     dispatch(addAllRegistrations(transformedData));
  //     setNewData(transformedData);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (all && all.length > 0) {
  //     const sanitizelistingsIds = (listingsIds) => {
  //       // Remove any non-numeric and non-comma characters
  //       const sanitized = listingsIds.replace(/[^0-9,]/g, "");
  //       return sanitized.split(",").filter((id) => id.trim() !== "");
  //     };
  //     const transformedData = all.flatMap((item) => {
  //       const listingsIdsArray = sanitizelistingsIds(item.listingsIds);

  //       return listingsIdsArray.map((listingId) => ({
  //         ...item,
  //         listingsIds: listingId,
  //       }));
  //     });
  //     setNewData(transformedData);
  //   }
  // }, [all]);

  // const getAllRegistrations = async () => {
  //   setLoading(true);
  //   const url = "https://backend.ifbc.co/api/registrations";

  //   // Make a GET request to fetch the data
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       // Handle successful response
  //       if (response.data.length > 0) {
  //         const TC = response.data.filter((data) => data.docType === "TC");
  //         const FR = response.data.filter((data) => data.docType === "FR");
  //         dispatch(addAllRegistrations(response.data));
  //         setAll(response.data);
  //         setTcs(TC);
  //         setFrs(FR);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       setLoadingError(true);
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // useEffect(() => {
  //   if (reduxRegistrations && reduxRegistrations.length > 0) {
  //     setNewData(reduxRegistrations);
  //   } else {
  //     getAllRegistrations();
  //   }
  // }, [reduxRegistrations]); // Empty dependency array to run once on component mount

  // const fetchCandidatesByIds = async (candidateIds) => {
  //   const promises = candidateIds.map((id) =>
  //     axios.get(`${url}/candidates/${id}`)
  //   );
  //   const results = await Promise.all(promises);
  //   return results.map((result) => result.data);
  // };

  // useEffect(() => {
  //   if (newData && newData.length > 0) {
  //     const ids = newData.map((data) => data.candidateId);
  //     const uniqueIds = [...new Set(ids)];
  //     setCandIds(uniqueIds);
  //   }
  // }, [newData]);

  // const { data: newDataNames, isLoading: isLoadingNames } = useQuery(
  //   ["candidates", candIds],
  //   () => fetchCandidatesByIds(candIds),
  //   {
  //     enabled: candIds.length > 0,
  //     cacheTime: 86400 * 3,
  //     select: (data) => {
  //       return data.map((cand) => ({
  //         name: cand.firstName + " " + cand.lastName,
  //         value: cand.docId,
  //       }));
  //     },
  //   }
  // );

  return (
    <MyTCFRContext.Provider
      value={{
        newData: data || [],
        loadingError: error,
        loadingTCFR: isLoading,
        //newDataNames,
        //isLoadingNames,
        filters,
        setFilters,
      }}
    >
      {children}
    </MyTCFRContext.Provider>
  );
};

export default TCFRDataContext;
