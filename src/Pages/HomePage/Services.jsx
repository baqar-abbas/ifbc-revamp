import React from "react";

const Services = () => {
  return (
    <section className="bg-white my-10">
      <div className="theme-container mx-auto grid grid-cols-6 lg:grid-cols-12 gap-[30px]">
        <div className="col-span-6 flex flex-col">
          <div id="text-container" className="order-2 md:order-1">
            <h2 className="font-bold md:text-4xl max-md:text-2xl text-custom-heading-color mt-5">
              Reasons to Choose a Franchise Business Model for Your Next Venture
            </h2>
            <p className="mt-5">
              Opening a franchise business is a popular choice for many
              entrepreneurs due to several appealing advantages it offers. Here
              are some of the primary reasons why someone might choose to open a
              franchise
            </p>
          </div>
          <div className="w-full relative mt-[40px] order-1 md:order-2">
            {/* <img
              src="/images/home-seven/process-1.png"
              alt="Services 1"
              className="w-full"
            /> */}

            <video
              className="w-full h-[1150px] object-cover rounded-3xl"
              controls={true}
              muted={true}
              loop={true}
            >
              <source src="/video/videoplayback.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <Steps />
      </div>
    </section>
  );
};

const Steps = () => {
  const processSteps = [
    {
      imgSrc: "/images/home-seven/process-2.png",
      stepNumber: "01",
      title: "Proven Business Model",
      description:
        "Ease of Replication: Franchises offer established business models which have been successful and can be easily replicated by new entrepreneurs, reducing the risks associated with start-ups.",
    },
    {
      imgSrc: "/images/home-seven/process-3.png",
      stepNumber: "02",
      title: "Brand Recognition",
      description:
        "Immediate Trust: Engaging with a brand that is already recognized and trusted by consumers can offer immediate market penetration and customer loyalty without having to build a reputation from scratch.",
    },
    {
      imgSrc: "/images/home-seven/process-4.png",
      stepNumber: "03",
      title: "Support and Training",
      description:
        "Guided Start: Franchisees often receive extensive training and ongoing support from the franchisor, making it an attractive option for those who may be new to business ownership.",
    },
    {
      imgSrc: "/images/home-seven/process-5.png",
      stepNumber: "04",
      title: "Easier Access to Financing",
      description:
        "Lender Confidence: Lenders are often more confident in financing franchise ventures due to their established success and lower risk compared to new business ventures.",
    },
  ];

  const isMobile = window.innerWidth < 768 ? true : false;

  return (
    <div className="col-span-6 flex flex-col gap-[30px]">
      {processSteps.map((step, index) => (
        <div
          key={index}
          className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-12"
        >
          <div className="col-span-6">
            <img
              src={step.imgSrc}
              alt={`Process ${step.stepNumber}`}
              className="w-full"
            />
          </div>
          <div className="col-span-6">
            <div className="flex h-full flex-col justify-center">
              {!isMobile && (
                <div className="w-10 aspect-square rounded-full border border-custom-dark-blue flex items-center justify-center">
                  <h1 className="font-semibold text-custom-dark-blue">
                    {step.stepNumber}
                  </h1>
                </div>
              )}
              <h1 className="text-18 font-semibold text-custom-heading-color mt-4 mb-3">
                {step.title}
              </h1>
              <p className="text-paragraph">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
