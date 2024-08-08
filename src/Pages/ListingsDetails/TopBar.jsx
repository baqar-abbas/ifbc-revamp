import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ReportIssue from "src/Popups/ReportIssue";

const TopBar = ({ listingContent, setShow, setRegistrationType }) => {
  const data = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6h.008v.008H6V6Z"
          />
        </svg>
      ),
      text: listingContent?.category,
      isLink: null,
    },

    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
      text: listingContent?.updatedInfo,
      isLink: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      ),
      text: listingContent?.fddYearInfo,
      isLink: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      text: "Avg Response Time: " + listingContent?.avgResponseTime,
      isLink: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      text: listingContent?.username,
      isLink: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
      text: listingContent?.email,
      isLink: `mailto:${listingContent?.email}`,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
      text: listingContent?.phone,
      isLink: `tel:${listingContent?.phone}`,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
      text: listingContent?.website,
      isLink: listingContent?.website,
    },
  ];
  const role = useSelector((state) => state.counter.role);
  const [showReport, setShowReport] = useState(false);
  const [showListingDetails, setShowListingDetails] = useState(false);
  // ye states pass hongy
  const handleOpenRegistration = (type) => {
    setRegistrationType(type);
    setShow(true);
  };

  const ShowListing = () => {
    setShowReport(true);
  };

  // Determine if we should show listing details
  useEffect(() => {
    const hasValidListings = data.some((listingLi, index) => {
      const indexLimitListing = role === "A" ? index < 3 : index === 0;
      return indexLimitListing && listingLi.text;
    });

    setShowListingDetails(hasValidListings);
  }, [data, role]);
  return (
    <section className="flex flex-col w-full justify-between items-center border-b border-custom-dark-blue/10 mb-4 mt-4 ">
      <div className="lg:mb-2 flex justify-between flex-col items-center ">
        <img
          width={300}
          height={300}
          src={"/" + listingContent?.imgUrl}
          className="attachment-medium size-medium wp-post-image entered lazyloaded"
          alt
          decoding="async"
          fetchpriority="high"
        />

        <ul className=" flex-col gap-4 h-full max-md:items-center">
          {/* <h2 className="candidate-small-heading">User Details</h2> */}
          {data.map((listingLi, index) => {
            const indexLimit = role === "A" ? 2 : 6;
            if (index > indexLimit) {
              return (
                <li
                  key={index}
                  className="flex items-center gap-1 max-md:justify-center max-md:w-full"
                >
                  {listingLi.icon}
                  <a target="blank" href={listingLi.isLink}>
                    {listingLi.text}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div
        id="content-container"
        className="gap-6  mt-8 justify-between  w-full"
      >
        <div
          id="buttons-container"
          className="flex gap-3 w-full  justify-start items-center mb-2 max-md:flex-col"
        >
          <ReportIssue showReport={showReport} setShowReport={setShowReport} />
          <select className="candidate-select w-full">
            <option value>Concept Actions</option>
            <option value="email">Send an Email</option>
            <option value="info-sheet">Candidate Info Sheet</option>
            <option value="2-min">Download 2-Min Drill Packet </option>
            <option value="one-sheet">Download One Sheet Packets </option>
          </select>
          <button
            className="candidate-btn w-full"
            value="tc"
            onClick={() => handleOpenRegistration("TC")}
          >
            Territory Check
          </button>
          <button
            className="candidate-btn w-full"
            value="formal-registration"
            onClick={() => handleOpenRegistration("FR")}
          >
            Formal Registration
          </button>
          <button onClick={ShowListing} className="candidate-btn w-full ">
            Report an issue with this Listing
          </button>
        </div>

        <div
          className={`col-span-12 ${showListingDetails ? "md:col-span-4" : "hidden"}`}
        >
          <ul className="flex flex-col gap-4  items-start h-full ">
            {showListingDetails && (
              <h2 className="candidate-small-heading">Listing Details</h2>
            )}
            {data.map((listingLi, index) => {
              const indexLimitListing = role === "A" ? index < 3 : index === 0;
              if (indexLimitListing && listingLi.text) {
                return (
                  <li
                    key={index}
                    className="flex items-center gap-1 max-md:w-full max-md:justify-center"
                  >
                    {listingLi.icon}
                    {listingLi.text}
                  </li>
                );
              }
            })}
          </ul>
        </div>

        {/* <div className="col-span-12 md:col-span-4"></div> */}
      </div>
    </section>
  );
};

export default TopBar;
