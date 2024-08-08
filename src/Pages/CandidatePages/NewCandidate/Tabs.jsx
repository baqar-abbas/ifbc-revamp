import { useState } from "react";

const Tabs = ({
  handleInputChange,
  candDetails,
  candNames,
  selectedDetails,
}) => {
  // const [activeTab, setActiveTab] = useState("initial qualifying");
  return (
    <div className="md:flex mt-6">
      {/* Tabs list  */}
      <TabsList activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Fist tab description */}

      {/* 2nd Tab Description */}
      <Zoracle
        activeTab={activeTab}
        handleInputChange={handleInputChange}
        candDetails={candDetails}
        candNames={candNames}
        selectedDetails={selectedDetails}
      />

      {/* 5th Tab Description */}
      <Wants
        activeTab={activeTab}
        handleInputChange={handleInputChange}
        candDetails={candDetails}
        candNames={candNames}
        selectedDetails={selectedDetails}
      />
    </div>
  );
};

export default Tabs;

const TabsList = ({ activeTab, setActiveTab }) => {
  const tabItems = [
    { text: "INITIAL QUALIFYING" },
    { text: "ZORAKLE SPOTON!" },
    { text: "ELIGIBILITY" },
    { text: "EXPERIENCE" },
    { text: "WANTS" },
  ];

  return (
    <ul
      id="tab-list"
      className="flex-column space-y space-y-4 text-sm font-medium text-gray-500  md:me-4 mb-4 md:mb-0"
    >
      {tabItems.map((item, index) => (
        <li key={index}>
          <a
            onClick={() => setActiveTab(item.text.toLowerCase())}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer ${
              activeTab.toLowerCase() === item.text.toLowerCase()
                ? "text-white bg-custom-heading-color "
                : "bg-gray-100"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Zoracle = ({
  activeTab,
  handleInputChange,
  candDetails,
  candNames,
  selectedDetails,
}) => {
  const competencyOptions1 = [
    { value: "", label: "Select one" },
    { value: "Leadership-Vision", label: "Leadership & Vision" },
    { value: "Sales-Channel-Planning", label: "Sales & Channel Planning" },
    {
      value: "Marketing-Public-Relations",
      label: "Marketing & Public Relations",
    },
    { value: "Executive-Management", label: "Executive & Management" },
    { value: "Human-Resources-Training", label: "Human Resources & Training" },
    { value: "Admin-Customer-Service", label: "Admin & Customer Service" },
    { value: "Finance-Operations", label: "Finance & Operations" },
    { value: "R-D-Technical", label: "R&D & Technical" },
  ];
  const competencyOptions2 = [
    { value: "", label: "Select one" },
    { value: "Leadership-Vision", label: "Leadership & Vision" },
    { value: "Sales-Channel-Planning", label: "Sales & Channel Planning" },
    {
      value: "Marketing-Public-Relations",
      label: "Marketing & Public Relations",
    },
    { value: "Executive-Management", label: "Executive & Management" },
    { value: "Human-Resources-Training", label: "Human Resources & Training" },
    { value: "Admin-Customer-Service", label: "Admin & Customer Service" },
    { value: "Finance-Operations", label: "Finance & Operations" },
    { value: "R-D-Technical", label: "R&D & Technical" },
  ];
  const competencyOptions3 = [
    { value: "", label: "Select one" },
    { value: "Leadership-Vision", label: "Leadership & Vision" },
    { value: "Sales-Channel-Planning", label: "Sales & Channel Planning" },
    {
      value: "Marketing-Public-Relations",
      label: "Marketing & Public Relations",
    },
    { value: "Executive-Management", label: "Executive & Management" },
    { value: "Human-Resources-Training", label: "Human Resources & Training" },
    { value: "Admin-Customer-Service", label: "Admin & Customer Service" },
    { value: "Finance-Operations", label: "Finance & Operations" },
    { value: "R-D-Technical", label: "R&D & Technical" },
  ];
  const growth = [
    { value: "", label: "Select Stage" },
    {
      value: "Emerging / Entrepreneur(1-19)",
      label: "Emerging / Entrepreneur(1-19)",
    },
    { value: "Partner(20-99)", label: "Partner(20-99)" },
    { value: "Plug and Play(100-499)", label: "Plug and Play(100-499)" },
    { value: "Empire(1,000+)", label: "Empire(1,000+)" },
    { value: "Hybrid", label: "Hybrid" },
  ];
  const valueOptions = [
    { value: "", label: "Select one" },
    { value: "Emulator", label: "Emulator" },
    { value: "Belonger", label: "Belonger" },
    { value: "Achiever", label: "Achiever" },
    { value: "Societal", label: "Societal" },
  ];
  return (
    <div
      id="zorakle-spoton!"
      className={`candidate-tabs-content ${
        activeTab.toLowerCase() === "zorakle spoton!" ? "" : "hidden"
      }`}
    >
      <div>
        <div>
          <p className="candidate-questions">Competency 1?</p>
        </div>
        <select
          onChange={handleInputChange}
          name="Competency1"
          id="competency1"
          className="candidate-select w-full"
        >
          {competencyOptions1.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={
                candNames && candNames.length > 0
                  ? selectedDetails?.competency1
                  : candDetails?.competency1
              }
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <p className="candidate-questions">Competency 2?</p>
        </div>
        <select
          onChange={handleInputChange}
          name="Competency2"
          id="competency2"
          className="candidate-select w-full"
        >
          {competencyOptions2.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={
                candNames && candNames.length > 0
                  ? selectedDetails?.competency2
                  : candDetails?.competency2
              }
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <p className="candidate-questions">Competency 3?</p>
        </div>
        <select
          onChange={handleInputChange}
          name="Competency3"
          id="competency3"
          className="candidate-select w-full"
        >
          {competencyOptions3.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={
                candNames && candNames.length > 0
                  ? selectedDetails?.competency3
                  : candDetails?.competency3
              }
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <p className="candidate-questions">Stage of Growth</p>
        </div>
        <select
          onChange={handleInputChange}
          name="StageofGrowth"
          id="stage-of-growth"
          className="candidate-select w-full"
        >
          {growth.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={
                candNames && candNames.length > 0
                  ? selectedDetails?.stageOfGrowth
                  : candDetails?.stageOfGrowth
              }
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <p className="candidate-questions">Value</p>
        </div>
        <select
          onChange={handleInputChange}
          name="Value"
          id="value"
          className="candidate-select w-full"
        >
          {valueOptions.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={
                candNames && candNames.length > 0
                  ? selectedDetails?.value
                  : candDetails?.value
              }
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="candidate-questions">
          Emulator - Motivated by an insatiable desire for success, they are
          driven to do whatever it takes to conquer a challenge. Recognition and
          money defines success for Emulators. They prefer prestigious,
          progressive concepts that offer heroic, innovative solutions for their
          clients. They are independent thinkers and require a high degree of
          flexibility. Belonger - Hands-on business builder focused on long-term
          relationships and customer satisfaction. Motivated by a deeply rooted
          moral code they are hardworking and committed to providing for and
          protecting their loved ones. Family and security defines success for
          the Belonger. They favor proven, practical service or solution-based
          businesses. Achiever - A tenacious business builder, never satisfied
          until they dominate the market. Motivated by accomplishment, they have
          a goal-oriented lifestyles and a deep commitment to success. Results,
          respect and control define success for the Achiever. They prefer
          unique, scalable, quality service and business-to-business or
          solution-oriented concepts. Societal - A visionary business builder
          committed to edify, inspire and change the world. Motivated to have an
          impact on others using their expertise, experience and education.
          Contribution and freedom defines success for the Societal. They prefer
          innovative, change, or cause-based concepts that promote others'
          growth and success.
        </p>
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          What work activities do you enjoy?
        </p>
        <input
          onChange={handleInputChange}
          name="Activities"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.activities }
            : { defaultValue: candDetails?.activities })}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          Are you comfortable attending networking functions to promote your new
          business?
        </p>
        <input
          onChange={handleInputChange}
          name="AttendingNetworkFunction"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.attendingNetworkFunction }
            : { defaultValue: candDetails?.attendingNetworkFunction })}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          Are you interested in Multiple-Unit Operation or Masters?
        </p>
        <input
          onChange={handleInputChange}
          name="MultiUnitOps"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.multiUnitOps }
            : { defaultValue: candDetails?.multiUnitOps })}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          Are you planning on having a partner in the business?
        </p>
        <input
          onChange={handleInputChange}
          name="BusinessPartner"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.businessPartner }
            : { defaultValue: candDetails?.businessPartner })}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          How does your family feel about your interest in this?
        </p>
        <input
          onChange={handleInputChange}
          name="FamilyFeel"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.familyFeel }
            : { defaultValue: candDetails?.familyFeel })}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          What types of employees would you prefer to work with (if any)?
        </p>
        <input
          onChange={handleInputChange}
          name="EmployeesPrefer"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.employeesPrefer }
            : { defaultValue: candDetails?.employeesPrefer })}
        />
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-questions">
          What size staff are you comfortable with?
        </p>
        <input
          onChange={handleInputChange}
          name="StaffSize"
          type="text"
          className="candidate-input"
          required
          {...(candNames && candNames.length > 0
            ? { value: selectedDetails?.staffSize }
            : { defaultValue: candDetails?.staffSize })}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="candidate-questions">
          Summary / Notes
        </label>
        <textarea
          onChange={handleInputChange}
          name="ZorakleNotes"
          id="message"
          rows={10}
          className="candidate-input"
          defaultValue={candDetails?.ZorakleNotes}
        />
      </div>
    </div>
  );
};
