import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "src/Globals/Header";
import Footer from "src/Globals/Footer";
import MobileNav from "src/Globals/MobileNav";
import ListingDataContext from "src/Context/ListingDataContext";
import CandidatesDataContext from "./Context/CandidatesDataContext";
import CandidateSideBar from "./Pages/GlobalPageSections/CandidateSideBar";
import { useDispatch, useSelector } from "react-redux";
import { generateUuid } from "./Redux/listingReducer";
import RouteRenderer from "./RouteRenderer";
import TCFRDataContext from "./Context/TCFRDataContext";
import RegisterationPopup from "./Popups/RegistrationPopup";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import ShoppingCartPopup from "./Popups/ShoppingCartPopup";
import { HelmetProvider } from "react-helmet-async";
const App = () => {
  const dispatch = useDispatch();
  const [mobileActive, setMobileActive] = useState(false);
  const token = useSelector((state) => state.counter.token);
  const role = useSelector((state) => state.counter.role);
  const [show, setShow] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const loc = useLocation();
  const [active, setActive] = useState(false);
  const [selectedCandName, setSelectedCandName] = useState({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(generateUuid());
    dispatch;
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token]);

  useEffect(() => {
    setMobileActive(false);
    setShowCart(false);
    document
      .querySelector("#app")
      .classList.add("flex", "flex-col", "justify-between", "min-h-screen");
  }, [loc.pathname]);

  //const queryClient = new QueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24 * 3, // 5 days
      },
    },
  });

  const sessionStoragePersistor = createWebStoragePersistor({
    storage: window.sessionStorage,
  });

  persistQueryClient({
    queryClient,
    persistor: sessionStoragePersistor,
  });

  return (
    <QueryClientProvider client={queryClient}>
      {mobileActive && (
        <MobileNav
          setMobileActive={setMobileActive}
          active={active}
          setActive={setActive}
          selectedCandName={selectedCandName}
          setShow={setShowCart}
        />
      )}
      <AnimatePresence mode="wait">
        <Header
          mobileActive={mobileActive}
          setMobileActive={setMobileActive}
          active={active}
          setActive={setActive}
          selectedCandName={selectedCandName}
          setShow={setShowCart}
        />
        <HelmetProvider>
          <RouteRenderer
            isAuthenticated={token}
            setShow={setShow}
            setRegistrationType={setRegistrationType}
          />
        </HelmetProvider>
        {/* <CartIcon setShow={setShowCart} /> */}

        <ListingDataContext>
          <CandidatesDataContext>
            <TCFRDataContext>
              <RegisterationPopup
                setShow={setShow}
                show={show}
                registrationType={registrationType}
              />
              {/* <ShoppingCartPopup setShow={setShowCart} show={showCart} /> */}
            </TCFRDataContext>
          </CandidatesDataContext>
        </ListingDataContext>

        <TCFRDataContext>
          {token && role && role === "C" && (
            <CandidateSideBar
              active={active}
              setActive={setActive}
              setSelectedCandName={setSelectedCandName}
            />
          )}
        </TCFRDataContext>
        <Footer />
      </AnimatePresence>
    </QueryClientProvider>
  );
};

const CartIcon = ({ setShow }) => {
  const count = useSelector((state) => state.counter.value);

  return (
    <button
      onClick={() => setShow(true)}
      className=" z-[999] bg-custom-dark-blue rounded-custom-shape w-6 h-10 md:flex items-center justify-center max-md:hidden fixed top-1/2 right-0 border border-black/20 "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="white"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
};
export default App;
