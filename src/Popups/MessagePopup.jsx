import React, { useState } from "react";
import DialogBox from "./DialogBox";

const MessagePopup = ({ setShow }) => {
  const data = [
    { label: "Candidate Name", value: "Lovedeip Singh" },
    { label: "Territory", value: "AVON IN, 46123" },
    { label: "Franchise", value: "Teriyaki Madness" },
    { label: "Franchise Email", value: "infoifbc.com" },
    { label: "Franchise Contact", value: "Patrick Pounders" },
    { label: "Broker Email", value: "ht@ifbc.co" },
    { label: "Broker Name", value: "Harjeet Tiwana" },
    { label: "Broker Company", value: "IFBC.CO" },
  ];
  return (
    <section
      id="popup-container"
      className=" bg-white shadow-lg rounded-md flex flex-col gap-5 p-10"
    >
      <button
        className="absolute top-5 right-10"
        onClick={() => setShow(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      <div id="heading" className="flex justify-center items-center">
        <h1 className="text-3xl text-center font-bold text-custom-heading-color">
          Messages
        </h1>
      </div>
      <div id="message-box " className="">
        <form>
          <error className="font-semibold">All Fields are required.</error>
          <div id="comment-box" className="mt-3 mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-400-500 focus:border-slate--500 sm:text-sm"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <div id="send-btn" className="flex justify-center w-full">
            <button className="candidate-btn w-64">SEND</button>
          </div>
        </form>
        <div
          id="heading-formal-registration"
          className="flex justify-center items-center mt-8"
        >
          <h2 className=" md:text-2xl text-xl font-bold text-custom-heading-color border-b-2 border-gray-300 pb-2">
            Formal Registration
          </h2>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-400 rounded-lg overflow-hidden">
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-50 even:bg-white sm:flex sm:flex-col md:table-row lg:table-row"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900  border-r-0 md:border-r border-gray-300">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MessagePopup;
