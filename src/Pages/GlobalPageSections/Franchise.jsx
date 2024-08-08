import React from "react";

const Franchise = () => {
  return (
    <div className=" bg-white rounded-lg shadow-md p-6 grid grid-cols-4 ">
      <form className="flex flex-col">
        <h2 className="text-2xl font-bold text-custom-heading-color mb-4">
          Franchise Request List
        </h2>
        <input
          type="text"
          className="candidate-input"
          placeholder="Full Name"
        />
        <input type="email" className="candidate-input" placeholder="Email" />
        <input
          type="number"
          className="candidate-input"
          placeholder="Phone Number"
        />
        <input
          type="text"
          className="candidate-input"
          placeholder="Company Name"
        />
        <input
          type="text"
          className="candidate-input"
          placeholder="Job Title"
        />
        <input
          type="date"
          className="candidate-input"
          placeholder="Date of Birth"
        />
        <textarea
          name="message"
          className="candidate-input"
          placeholder="Message"
          defaultValue={""}
        />
        <button type="submit" className="candidate-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Franchise;
