import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import BarLoader from "src/Animations/BarLoader";
import PageTransition from "src/Animations/PageTransition";
import { formatCurrency } from "src/Utils/SanitizeInput";

const FundingResult = () => {
  const [data, setData] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState();
  const { docId } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend.ifbc.co/api/fundcalculator/${docId}`
      );
      if (response.status === 200) {
        setData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [docId]);

  useEffect(() => {
    const debtResult = Math.floor(
      (data.debtPayments / (data.houseHold / 12)) * 100
    );
    setResult(debtResult);
  }, [data, loading]);

  return (
    <PageTransition>
      <div className="bg-white p-10">
        <h1 className="text-3xl text-left">
          <span className="font-bold">Results</span>
        </h1>
        {!loading && Object.values(data).length > 0 ? (
          <p className="text-xl text-left text-custom-heading-color mt-5">
            Your net worth is: {formatCurrency(data?.totalNet)} <br />
            Your debt to income ratio is: {result}%
            {result <= 35 ? (
              <>
                <br />
                <br />
                Low - Your debt to income ratio is what lending institutions
                prefer to see. Great job!
                <br />
                <br />
                Your maximum total investment is{" "}
                {formatCurrency(data?.downPayment)}. Look for franchises below
                this number in initial investment.
                <br />
                <br />
                Congratulations! It appears as though you have some good
                options, BUT there is a delicate order to follow regarding
                franchise funding and franchise selection. Schedule a free
                consultation with a franchise expert to understand the most
                strategic paths forward and what to avoid as you begin the
                journey to franchise ownership.
                <br />
                <br />
                You have some good options, BUT you have to carefully proceed.
                Schedule a free consultation with a funding expert to understand
                the most strategic paths forward. The order in which you act
                next changes your ability to get approved so learn the proper
                order by talking to an expert now.
                <br />
                <br />
                If you would like to learn how you may qualify in the future you
                may reach out to{" "}
                <a className="underline" href="tel:(800) 927-0203">
                  91-HELP-IFBC
                </a>{" "}
                or book a meeting with a specialist{" "}
                <a className="underline" href="https://calendly.com/info-ifbc">
                  here
                </a>
                .
                <br /> For the mean time you can indulge yourself in searching
                some franchises <br /> <br></br>
                <NavLink
                  to="/search-franchises"
                  className="candidate-btn w-[50%]"
                >
                  Search Franchises
                </NavLink>
              </>
            ) : (
              <>
                <br />
                <br />
                Your debt to income ratio is High!
                <br />
                <br />
                Your maximum total investment is{" "}
                {formatCurrency(data?.downPayment)}. Look for franchises below
                this number in initial investment.
                <br />
                <br />
                Funding your franchise may have some complications based on the
                answers provided. There still may be good options but more
                details will need to be provided to see which apply. Follow
                these steps:
                <br />
                <br />
                "Take free credit soft pull and receive a pre-screening report".
                Receive your report with 24-48 hours. This credit report will
                not affect your credit because it is a soft pull. This report is
                evaluated by our 3rd party financial strategists and the results
                are based on the current lending conditions as well as past
                results from lenders with profiles similar to yours.
                <br />
                <br />
                If you would like to learn how you may qualify in the future you
                may reach out to{" "}
                <a className="underline" href="tel:(800) 927-0203">
                  91-HELP-IFBC
                </a>{" "}
                or book a meeting with a specialist{" "}
                <a className="underline" href="https://calendly.com/info-ifbc">
                  here
                </a>
                .
                <br /> For the mean time you can indulge yourself in searching
                some franchises <br />
                <br />
                <NavLink
                  to="/search-franchises"
                  className="candidate-btn w-[50%]"
                >
                  Search Franchises
                </NavLink>
              </>
            )}
          </p>
        ) : (
          <BarLoader bgcolor={"blue"} />
        )}
      </div>
    </PageTransition>
  );
};

export default FundingResult;
