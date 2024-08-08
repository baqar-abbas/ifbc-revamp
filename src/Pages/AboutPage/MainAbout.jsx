import React, { useState, useRef } from "react";
import About from "../GlobalPageSections/About";
import About2 from "../GlobalPageSections/About2";

import Testimonials from "../GlobalPageSections/Testimonials";
import PreFooter from "src/Globals/PreFooter";
import PageTransition from "src/Animations/PageTransition";
import { rangeRight } from "lodash";

const MainAbout = () => {
  return (
    <PageTransition>
      <div id="smooth-wrapper" className="md:mx-10">
        <div id="smooth-content">
          <main className="w-full">
            <About />
            <ServicesGrid />
            <AboutHarjeet />
            <Testimonials />
            <PreFooter />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

// ye alag component banadya mene
// abhi jo mene changes ki he wo ai h imse?
// dikh nhi isme nhi ayi tumhe kaha tha na rukjao pull krwana pehle phr krlena acha sahi he
const AboutHarjeet = () => {
  // ek state banegy pehle banao show setshow
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);
  const extraTextRef = useRef(null);

  const ShowMoreText = () => {
    setShow(!show);

    if (!show && buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="max-md:mx-5 my-20">
      <div className="max-md:flex-col flex gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold md:text-4xl max-md:text-2xl text-custom-heading-color">
            About IFBC-President & CEO
          </h1>
          <p className="text-xl  font-bold text-custom-heading-color ">
            H.S.Tiwana: Navigating Diverse Entrepreneurial Horizons with
            Expertise
          </p>
          <p>
            Welcome to a world where your business aspirations take flight. H.S.
            Tiwana, a seasoned entrepreneur and franchise expert, invites you to
            embark on a journey through the dynamic realm of business, marked by
            rich experiences and proven success across various industries.
          </p>
          <p className="text-xl  font-bold text-custom-heading-color ">
            Educational and Professional Pillars
          </p>
          <p>
            H.S.Tiwana melds the academic and practical, fortified by an MBA in
            Sales and Marketing Operations. His educational foundation serves as
            the bedrock upon which his practical experiences across varied
            business ventures are built, offering a holistic and well-rounded
            approach to business consultancy and franchise advice.
          </p>
          <p className="text-xl  font-bold text-custom-heading-color">
            A Spectrum of Entrepreneurial Ventures
          </p>
          <p>
            From restaurants and coffee shops to grocery stores and gas
            stations, H.S.Tiwana’s entrepreneurial journey has woven through
            various industries, each offering its own unique insights and
            challenges. His successful ownership and operation of various
            enterprises across different sectors stand testament to his
            versatile and pragmatic approach to business.
          </p>
          <p className="text-xl  font-bold text-custom-heading-color">
            In the Realm of Real Estate and Finance
          </p>
          <p>
            H.S.Tiwana’s ventures are not confined to the tangible aspects of
            business but extend into the realms of property and finance. His
            experience as a Realtor provides him a deep understanding of market
            dynamics and property valuation, while his tenure as a Loan Officer
            equips him with the financial acumen to navigate the complex
            financial landscapes of mortgages and loans.
          </p>

          <p className="text-xl  font-bold text-custom-heading-color">
            Guidance Through Retail and Management
          </p>
          <p>
            Recognized for his skills in retail and merchandising, Harjeet
            unveils a treasure trove of knowledge in retail operations. His
            insights into customer engagement, inventory management, and
            operational efficiency are pivotal for steering a franchise towards
            success and sustainability.
          </p>

          <button
            ref={buttonRef}
            className="candidate-btn w-[50%] max-md:w-full mr-auto"
            onClick={ShowMoreText}
          >
            {show ? "Read Less" : "Read More Harjeet Tirwana"}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <img
            decoding="async"
            height={2000}
            src="https://s30012.pcdn.co/wp-content/uploads/sites/194/2023/09/broker.jpg"
            className="attachment-full size-full object-cover rounded-3xl"
            alt
          />
          <h1 className="text-2xl  font-bold text-custom-heading-color text-center">
            H.S. Tiwana – MBA
          </h1>
          <h1 className="text-xl  font-bold text-custom-heading-color text-center">
            IFBC - President & CEO
          </h1>
        </div>
      </div>

      <ExtraText show={show} ref={extraTextRef} />
    </div>
  );
};

// may ek alag component banara extra text ka
const ExtraText = ({ show }) => {
  return (
    <div
      className={`flex flex-col gap-3 my-5 transition-all duration-500 ${show ? "" : "h-0 overflow-hidden"}`}
    >
      <p className="text-xl  font-bold text-custom-heading-color">
        A Companion on Your Business Journey
      </p>
      <p>
        Harjeet is more than a consultant; he’s a companion and mentor on your
        entrepreneurial journey. His diverse experiences, from hands-on
        management to business ownership, afford him a profound understanding of
        the challenges and opportunities encountered at every stage of the
        business lifecycle.
      </p>

      <p className="text-xl  font-bold text-custom-heading-color">
        Investing in People and Opportunities
      </p>
      <p>
        Owning a staffing company and being an active investor, Harjeet
        demonstrates his capability to understand various industry dynamics and
        showcases his belief in investing in people and opportunities alike.
      </p>

      <p className="text-xl  font-bold text-custom-heading-color">
        Book a Consultation with H.S.Tiwana
      </p>
      <p>
        Unlock a world of opportunities and expert advice. Schedule a
        consultation with H.S.Tiwana and take the first step towards realizing
        your business dreams. From insightful advice on franchising to strategic
        planning for your business ventures, H.S.Tiwana is here to guide you at
        every step.
      </p>
    </div>
  );
};

const ServicesGrid = () => {
  const values = [
    {
      title: "Transparency",
      text: "We foster an environment of open communication and clear processes, ensuring every action we take is understandable and transparent to our clients and partners.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
          />
        </svg>
      ),
    },
    {
      title: "Integrity",
      text: "We uphold the highest ethical standards in all our interactions, fostering trust and ensuring transparency with our clients, consultants, and partners.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Excellence",
      text: "We are dedicated to delivering premier franchise opportunities and consultancy, consistently striving for superior quality and exceptional results in every endeavor.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
          />
        </svg>
      ),
    },
    {
      title: "Empowerment",
      text: "We believe in the potential of every individual. Through our services and support, we strive to empower both aspiring entrepreneurs and our consultant team to reach their full potential.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
      ),
    },
    {
      title: "Inclusivity",
      text: "We embrace a global perspective, providing opportunities and support to individuals and businesses worldwide, ensuring our network is diverse, inclusive, and accessible.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      ),
    },
    {
      title: "Collaboration",
      text: "We value the power of teamwork and partnership. Together, we believe we can achieve greater heights and transform dreams into tangible realities.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Innovation",
      text: "We continuously seek innovative solutions and opportunities to provide enhanced services and to navigate through the evolving franchising landscape effectively.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
      ),
    },
    {
      title: "Customer-Centric",
      text: "We place our clients’ aspirations at the heart of our operations, ensuring our approaches and solutions are always aligned with their goals and needs.",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <section className="py-[10px] bg-white mb-20">
      <div className="theme-container mx-auto w-full">
        {/* <h2 className="max-w-[747px] font-semibold text-24 sm:text-48 text-main-black text-center mx-auto mt-5">
          Our Vision
        </h2>
        <p className="text-center text-xl mt-4">
          IFBC’s Vision “To revolutionize the franchising landscape by creating
          direct, transparent, and empowering pathways for entrepreneurs,
          setting a global standard for integrity, opportunity, and excellence
          in franchise consultation.”
        </p> */}
        <h2 className="font-bold md:text-4xl max-md:text-2xl text-custom-heading-color text-center mx-auto mt-5">
          Our Values at IFBC
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12  gap-[30px] mt-[20px]">
          {values.map((value) => (
            <div className="col-span-3 flex items-center h-full">
              <div className="group border border-it-blue/10 p-[20px] min-h-[250px] rounded-2xl bg-white -right-0  transition-all duration-300 hover:bg-it-gray overflow-hidden h5-story_slider_active_card">
                <div className="flex justify-center">{value.svg}</div>
                <h1 className="text-xl text-center font-semibold text-custom-dark-blue mt-5 mb-2.5">
                  {value.title}
                </h1>
                <p className="text-sm text-center">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainAbout;
