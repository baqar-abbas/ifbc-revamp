import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { jwtDecode } from "jwt-decode";

// Function to verify token expiry
const verifyTokenExpiry = (token) => {
  if (token) {
    try {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Check if the token expiry time is greater than the current time
      const isTokenValid = decodedToken.exp > Date.now() / 1000;
      // Return true if the token is not expired, false otherwise
      return isTokenValid;
    } catch (error) {
      // If there's an error decoding the token, consider it as expired
      return false;
    }
  } else {
    return false;
  }
};

const token = localStorage.getItem("token");

const initialState = {
  value: JSON.parse(localStorage.getItem("cartListings"))?.length || 0,
  candidates: null,
  listings: [],
  registrations: null,
  cartListings: JSON.parse(localStorage.getItem("cartListings")) || [],
  uuid: localStorage.getItem("uuid") || null,
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || null,
  role:
    JSON.parse(localStorage.getItem("userDetails")) &&
    typeof JSON.parse(localStorage.getItem("userDetails")) === "object"
      ? JSON.parse(localStorage.getItem("userDetails"))?.userType
      : "N",
  activeListings: JSON.parse(localStorage.getItem("activeListings")) || [],
  token: token && token !== "" && verifyTokenExpiry(token),
  // redux may state ko save krwadeta kunke masle ye hora jab hum back jaate to api dobara call hojati ya to hum ek or kaam krskte
};

export const listingReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addAllListings: (state, action) => {
      state.listings = action.payload;
    },
    addAllCandidates: (state, action) => {
      state.candidates = action.payload;
    },
    addAllRegistrations: (state, action) => {
      state.registrations = action.payload;
    },
    incrementByListing: (state, action) => {
      if (!state.cartListings.find((listing) => listing === action.payload)) {
        state.value += 1;
        state.cartListings.push(action.payload);
        localStorage.setItem(
          "cartListings",
          JSON.stringify(state.cartListings)
        );
      }
    },
    decrementByListing: (state, action) => {
      // Find the index of the listing to be removed
      const index = state.cartListings.findIndex(
        (listing) => listing === action.payload
      );

      // If the listing is found, proceed to remove it
      if (index !== -1) {
        state.value -= 1; // Decrement the value
        state.cartListings = state.cartListings.filter(
          (listing) => listing !== action.payload
        ); // Remove the listing
        localStorage.setItem(
          "cartListings",
          JSON.stringify(state.cartListings)
        );
      }
    },
    generateUuid: (state) => {
      if (!state.uuid) {
        const newUuid = uuidv4();
        localStorage.setItem("uuid", newUuid);
        state.uuid = newUuid;
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      if (action.payload) {
        state.userDetails = action.payload;
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
      } else {
        state.userDetails = null;
        localStorage.removeItem("userDetails");
      }
    },
    incrementActiveListing: (state, action) => {
      if (!state.activeListings.find((listing) => listing === action.payload)) {
        state.activeListings.push(action.payload);
        localStorage.setItem(
          "activeListings",
          JSON.stringify(state.activeListings)
        );
      }
    },
    decrementActiveListing: (state, action) => {
      // Find the index of the listing to be removed
      const index = state.activeListings.findIndex(
        (listingid) => listingid === action.payload
      );

      // If the listing is found, proceed to remove it
      if (index !== -1) {
        state.activeListings = state.activeListings.filter(
          (listingid) => listingid !== action.payload
        ); // Remove the listing
        localStorage.setItem(
          "activeListings",
          JSON.stringify(state.activeListings)
        );
      }
    },
    decrementAllActiveListing: (state) => {
      state.activeListings = [];
      localStorage.setItem(
        "activeListings",
        JSON.stringify(state.activeListings)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByListing,
  generateUuid,
  decrementByListing,
  setUserDetails,
  incrementActiveListing,
  decrementActiveListing,
  decrementAllActiveListing,
  addAllListings,
  addAllCandidates,
  addAllRegistrations,
  setToken,
} = listingReducer.actions;

export default listingReducer.reducer;
