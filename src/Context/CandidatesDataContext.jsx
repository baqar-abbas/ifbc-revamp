import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
// import { addAllCandidates } from "src/Redux/listingReducer";
export const MyCandContext = createContext();

const CandidatesDataContext = ({ children }) => {
  //const reduxCands = useSelector((state) => state.counter.candidates);
  //const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.counter.token);
  const userDetails = useSelector((state) => state.counter.userDetails);
  const [cands, setCands] = useState([]);
  // const [loadingError, setLoadingError] = useState(false);

  const role =
    userDetails && typeof userDetails === "object"
      ? userDetails.userType
      : null;
  //const dispatch = useDispatch();

  const url = `https://backend.ifbc.co/api/candidates`;
  const { data, isLoading, error } = useQuery("CANDIDATES", () => {
    if (role && role !== "N") {
      return axios.get(url);
    }
    return;
  });

  useEffect(() => {
    if (!isLoading && data) {
      const filtered = data?.data?.filter(
        (cand) => cand?.agentUserId === userDetails?.docId
      );
      setCands(filtered);
    }
    // Make a GET request to fetch the data
  }, [data, isLoading]); // Empty dependency array to run once on component mount

  // const getAllCandidates = async () => {
  //   setLoading(true);

  //   const url = `https://backend.ifbc.co/api/candidates`;

  //   // Make a GET request to fetch the data
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       // Handle successful response
  //       if (response.data.length > 0 && response.status === 200) {
  //         dispatch(addAllCandidates(response.data));
  //         setCands(response.data);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       setLoadingError(error);
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // useEffect(() => {
  //   if (reduxCands && reduxCands.length > 0) {
  //     setCands(reduxCands);
  //   } else {
  //     getAllCandidates();
  //   }
  // }, [reduxCands]);

  return (
    <MyCandContext.Provider
      value={{
        role,
        cands,
        loading: isLoading,
        loadingError: error,
        userDetails,
        token,
      }}
    >
      {children}
    </MyCandContext.Provider>
  );
};

export default CandidatesDataContext;
