import React from "react";
import PageTransition from "src/Animations/PageTransition";
import PageTitle from "src/Globals/PageTitle";

const FranchiseOwner = () => {
  const steps = [
    {
      id: 1,
      title: "Determine your life’s goals and objectives",
      content: `Franchising is a great way to get into business ownership and establish yourself as an entrepreneur. You get many of the benefits without having to start from ground zero. But is this what you want? To buy into an already established brand, where you get to call the shots, but only to a point? There are pros and cons to consider, and the clearer your goals the easier your research phase will be.`,
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Establish a relationship with your broker",
      content: `Franchise brokers are experts in the industry. They know the right questions to ask, which franchises will fit your specific criteria, and how to get in touch with the right people to move you forward. To get in touch with a broker, please call us at (800)927-0203 so we can begin your pre-qualification process.`,
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      title: "Look at your finances",
      content: `How much are you willing to spend on yourself and in your future franchise? Investment ranges vary drastically – with most brands requiring a minimum of 50K and others asking for up to a million or more. This is the time to assess your savings, business relationships, and loan options so your broker can present brands that reflect your budget.`,
      bgColor: "bg-blue-200",
    },
    {
      id: 4,
      title:
        "Discover the available franchises in the areas you’re willing to set up shop",
      content: `Are you willing to move and/or commute to where your potential franchise has open units? Or are you looking for availability where you currently live? The reality is there is a finite number of units for most franchises. So it’s important to know where your base will be so you can get the application started before the franchisor runs out of units to grant.`,
      bgColor: "bg-blue-300",
    },
    {
      id: null,
      title: "Now that your research phase is complete:",
      bgColor: "bg-blue-400",
    },
    {
      id: 5,
      title: "Check criteria for franchise ownership",
      content: `Every brand is different, and they’re all looking for their own levels of business experience, personalities, industry knowledge and more. This is where you get on the phone with franchisors and get a first-hand account of who their perfect candidate is – or if they’re your perfect brand, too.`,
      bgColor: "bg-blue-500",
    },
    {
      id: 6,
      title: "Review the Franchise Disclosure Document (FDD)",
      content: `Doing your due diligence means deep diving into the good and the bad of the brand. The purpose of the FDD is to disclose information about the organization so the potential franchisee can get a full scope on the investment. During this process, it’s important to know if the brand is facing any legal battles and what the financials look like at the average owner and corporation level.`,
      bgColor: "bg-blue-600",
    },
    {
      id: 7,
      title: "Conduct market research for your area",
      content: `Before deciding you’re “all in,” check out the potential location of your business. Is the market ready to receive you? Who are your competitors and what makes them successful? Usually the franchisors choose available units based on metrics like this. However, this could be your new business… go see what the area is like.`,
      bgColor: "bg-blue-700",
    },
    {
      id: 8,
      title: "Secure funds",
      content: `Securing your LLC or C-Corp, finalizing any loans, and ensuring your business bank account is set up is one of the last steps to becoming a franchise owner.`,
      bgColor: "bg-blue-800",
    },
    {
      id: 9,
      title: "Finalize contracts",
      content: `It’s always a good idea to work with an attorney when signing contracts and business agreements – know what you’re signing and negotiate your terms.`,
      bgColor: "bg-blue-900",
    },
    {
      id: 10,
      title: "Sign and become a franchise owner",
      content: `Congratulations, you’ve made it to franchise ownership! This is such a wonderful accomplishment and the start of a lucrative journey in business and beyond. From here, the franchise you were granted will start you on their training program to get you set up with all the tools you need to succeed.`,
      bgColor: "bg-blue-950",
    },
  ];

  return (
    <PageTransition>
      <div id="wrapper">
        <div id="steps-container" className="theme-container my-10 mx-auto">
          <p className="mb-3">
            Regardless of which sector of the industry you’re looking to pursue,
            the process toward ownership takes anywhere from 3 months to a year
            – and the steps across the industry go something like this:
          </p>
          {steps.map((step, index) => (
            <div
              key={step.id}
              id={`step-${step.id}`}
              className={`p-5 flex flex-col gap-3 ${step.bgColor}`}
            >
              <div id="step-div" className="flex gap-2 items-center">
                {step.id && (
                  <span
                    className={`border rounded-full flex justify-center items-center size-8 font-bold ${
                      index < 4
                        ? "text-custom-heading-color border-custom-heading-color"
                        : "text-white border-white"
                    }`}
                  >
                    {step.id}
                  </span>
                )}
                <h1
                  className={`${
                    step.id ? "text-xl" : "text-2xl"
                  } font-bold capitalize ${
                    index < 4 ? "text-custom-heading-color" : "text-white "
                  }`}
                >
                  {step.title}
                </h1>
              </div>
              {step.id && (
                <p
                  className={`${
                    index < 4
                      ? "text-custom-heading-color border-custom-heading-color"
                      : "text-white "
                  }`}
                >
                  {step.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default FranchiseOwner;
