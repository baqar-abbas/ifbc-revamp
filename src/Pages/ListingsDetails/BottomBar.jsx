import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import BarLoader from "src/Animations/BarLoader";

const BottomBar = ({ listingContent }) => {
  const role = useSelector((state) => state.counter.role);

  const fetchData = async (listingContentName) => {
    const url = `https://backend.ifbc.co/api/listingscontent/${listingContentName}`;
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ["listingsContent", listingContent.name],
    () => fetchData(listingContent.name),
    {
      staleTime: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    }
  );

  const replaceWords = (text) => {
    if (!text) return text;
    return text.replace(/fba/g, "ifbc").replace(/FBA/g, "IFBC");
  };

  const checkLinkStatus = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.status !== 404 || response.status !== 403;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const document = window.document;
    if (typeof window !== "undefined" && !isLoading && data) {
      const entryDirectChild = document.querySelector(".entry-content>div");
      entryDirectChild?.classList.add("flex", "items-start", "gap-5");
      const tabsList = document.querySelector(".entry-content ul.tabs");
      tabsList?.classList.add(
        "flex-col",
        "divide-y-2",
        "divide-custom-dark-blue"
      );
      tabsList?.classList.remove("justify-center");

      const replaceTextContent = (node) => {
        if (node.nodeType === 3) {
          // Text node
          node.textContent = replaceWords(node.textContent);
        } else if (node.nodeType === 1) {
          // Element node
          node.childNodes.forEach(replaceTextContent);
        }
      };

      // Replace text in the entry-content
      const entryContent = document.querySelector(".entry-content");
      if (entryContent) {
        replaceTextContent(entryContent);
      }

      const tabs = document.querySelectorAll(".entry-content ul.tabs li");
      const tabContents = {
        overview: document.querySelector(".entry-content ul.tabs")
          ?.nextElementSibling,
        history: document.querySelector(".entry-content ul.tabs")
          ?.nextElementSibling?.nextElementSibling,
        territories: document.querySelector(".entry-content ul.tabs")
          ?.nextElementSibling?.nextElementSibling?.nextElementSibling,
        financials: document.querySelector(".entry-content ul.tabs")
          ?.nextElementSibling?.nextElementSibling?.nextElementSibling
          ?.nextElementSibling,
        resources: document.querySelector(".entry-content ul.tabs")
          ?.nextElementSibling?.nextElementSibling?.nextElementSibling
          ?.nextElementSibling?.nextElementSibling,
        reviewsnotes: document.querySelector(".entry-content ul.tabs")
          ?.nextElementSibling?.nextElementSibling?.nextElementSibling
          ?.nextElementSibling?.nextElementSibling?.nextElementSibling,
      };

      if (tabs.length > 0) {
        tabs[0].classList.add("activeTab");
        tabContents["overview"].style.display = "block";
        tabContents["overview"].classList.add(
          "bg-custom-heading-color/10",
          "px-10",
          "py-5"
        );
        tabs.forEach((tab) => {
          tab.addEventListener("click", (e) => {
            const clickedTab = e.target;
            const clickedTabText = e.target?.textContent?.trim()?.toLowerCase();
            tabs.forEach((otherTab) => {
              if (otherTab !== clickedTab) {
                otherTab.classList.remove("activeTab");
              }
            });
            clickedTab.classList.add("activeTab");

            for (const content in tabContents) {
              if (tabContents[content]) {
                tabContents[content].style.display = "none";
              }
            }

            if (tabContents[clickedTabText]) {
              tabContents[clickedTabText].style.display = "block";
              tabContents[clickedTabText].classList.add(
                "bg-custom-heading-color/10",
                "px-10",
                "py-5"
              );
            }
          });
        });
      }

      //accordion btns
      const accordianButtons = document.querySelectorAll(".accordion button");
      accordianButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const clickedBtnDiv = e.target.nextElementSibling;
          if (clickedBtnDiv.style.display === "none") {
            clickedBtnDiv.style.display = "block";
          } else {
            clickedBtnDiv.style.display = "none";
          }
        });
      });

      //hide fdd summaries
      const fddCustomReports = document.querySelector(".fdd-custom-reports");
      if (fddCustomReports) {
        fddCustomReports.style.display = "none";
        fddCustomReports.previousElementSibling.previousElementSibling.style.display =
          "none";
      }

      //map
      const mapPaths = document.querySelectorAll("#vmapusa svg path");
      mapPaths.forEach((path) => {
        const fillColor = path.getAttribute("fill");
        if (fillColor === "#30917F") {
          path.setAttribute("fill", "#304891");
        } else if (fillColor === "#c0ded8") {
          path.setAttribute("fill", "#bac7db");
        }
      });

      //map guide dots
      const vmapusa = document.querySelector("#vmapusa");
      if (vmapusa) {
        const two =
          vmapusa.nextElementSibling.nextElementSibling.nextElementSibling;
        const three =
          vmapusa.nextElementSibling.nextElementSibling.nextElementSibling
            .nextElementSibling;
        if (two && three) {
          two.children[0].style.background = "#bac7db";
          three.children[0].style.background = "#304891";
        }
      }

      const resourceTable = document.querySelectorAll("table.w-full");
      if (resourceTable.length > 0) {
        resourceTable[0].style.display = "none";
      } else if (resourceTable[1]) {
        resourceTable[1].style.display = "none";
      }

      // Function to handle button href and visibility
      const handleButtons = async () => {
        const itemButtons = document.querySelectorAll(
          ".button.tertiary-button"
        );
        for (const btn of itemButtons) {
          if (!role || role !== "C") {
            btn.style.display = "none";
          }
          const url = btn.getAttribute("href");
          if (url && url.includes("s26232.pcdn.co")) {
            const filename = url.split("/").pop().split("?")[0];
            const newUrl = `https://ifbcreact.s3.us-east-1.amazonaws.com/${filename}`;
            const isValid = await checkLinkStatus(newUrl);

            if (!isValid) {
              btn.style.display = "none";
              if (
                btn.parentElement.tagName === "TD" &&
                btn.parentElement.parentElement.tagName === "TR"
              ) {
                btn.parentElement.parentElement.style.display = "none";
              }
            } else {
              btn.setAttribute("href", newUrl);
            }
          }
        }
      };

      handleButtons();

      const AllTabsContainer = document.querySelectorAll(
        ".entry-content>div>div"
      );
      if (AllTabsContainer[3]) {
        const headings = AllTabsContainer[3].querySelectorAll("h2");
        headings.forEach((heading) => {
          if (
            heading.textContent === "Commission" &&
            (role === "C" || role === "N")
          ) {
            heading.style.display = "none";
            if (heading?.nextElementSibling.children[0]?.tagName !== "EM") {
              heading.nextElementSibling.style.display = "none";
            }
            if (
              heading?.nextElementSibling?.nextElementSibling?.children[0]
                ?.tagName !== "EM"
            ) {
              heading.nextElementSibling.nextElementSibling.style.display =
                "none";
            }
            if (
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.children[0]?.tagName !== "EM"
            ) {
              heading.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
                "none";
            }

            if (
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.nextElementSibling &&
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.nextElementSibling?.children[0]
                ?.tagName !== "EM"
            ) {
              heading.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
                "none";
            }

            if (
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.nextElementSibling?.nextElementSibling &&
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.nextElementSibling?.nextElementSibling
                ?.children[0]?.tagName !== "EM"
            ) {
              heading.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
                "none";
            }

            if (
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling &&
              heading?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling?.nextElementSibling?.nextElementSibling
                ?.nextElementSibling.children[0]?.tagName !== "EM"
            ) {
              heading.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
                "none";
            }
          }
        });
      }

      const articles = document.querySelectorAll("h2");
      articles.forEach((heading) => {
        if (heading.textContent === "Articles") {
          heading.style.display = "none";
          if (heading.nextElementSibling) {
            heading.nextElementSibling.style.display = "none";
          }
        }
      });

      if (tabs[5]) {
        tabs[5].style.display = "none";
      }
    }
  }, [isLoading, data]);

  return (
    <article
      id="post-599099"
      className="mt-10 md:col-span-2 lg:col-span-3 post-599099 fba-franchise type-fba-franchise status-publish has-post-thumbnail hentry concept_categories-business-services concept_categories-home-improvement"
    >
      <h3 className="text-4xl font-bold text-custom-heading-color uppercase mb-0 text-center">
        {listingContent.name}
      </h3>

      {data ? (
        <div
          className="post post-599099 fba-franchise type-fba-franchise status-publish has-post-thumbnail hentry concept_categories-business-services concept_categories-home-improvement"
          id="post-599099"
        >
          <div className="mb-8">
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="post post-599099 fba-franchise type-fba-franchise status-publish has-post-thumbnail hentry concept_categories-business-services concept_categories-home-improvement"
              id="post-599099"
            ></div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center p-10">
          <BarLoader bgcolor={"rgb(0, 17, 54)"} />
        </div>
      )}
    </article>
  );
};

export default BottomBar;
