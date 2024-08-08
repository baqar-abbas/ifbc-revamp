import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import TopBar from "./TopBar";
import { useParams } from "react-router-dom";
import BottomBar from "./BottomBar";
import PageTransition from "src/Animations/PageTransition";
import { useQuery } from "react-query";
import axios from "axios";
import BarLoader from "src/Animations/BarLoader";

const MainDetails = ({ setShow, show, setRegistrationType }) => {
  const url = useParams();
  const pName = url.name;

  const urlApi = `https://backend.ifbc.co/api/listingsOwner`;

  const { data: listingContent, isLoading } = useQuery(
    "FRANCHISEOWNER",
    () => {
      return axios.get(urlApi);
    },
    {
      staleTime: 86400 * 30,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      select: (data) => {
        const filtered = data?.data.filter(
          (owner) =>
            owner.name.toLowerCase() ===
            pName.toLowerCase().split("-").join(" ")
        );
        return filtered[0];
      },
    }
  );

  return (
    <PageTransition>
      <main
        id="main"
        role="main"
        tabIndex={-1}
        className="md:max-w-7xl px-6 mx-auto  max-md:w-full max-md:overflow-hidden"
      >
        {!isLoading ? (
          listingContent && (
            <>
              <TopBar
                listingContent={listingContent}
                setShow={setShow}
                show={show}
                setRegistrationType={setRegistrationType}
              />
              <BottomBar listingContent={listingContent} />
            </>
          )
        ) : (
          <div className="grid place-items-center min-h-screen">
            <BarLoader bgcolor={"blue"} />
          </div>
        )}
      </main>
    </PageTransition>
  );
};

export default MainDetails;
