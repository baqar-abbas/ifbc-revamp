import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageTransition from "src/Animations/PageTransition";

const Inbox = ({ handleInputChange, userDetails }) => {
  const [editorHtml, setEditorHtml] = useState("");
  const handleChange = (html) => {
    setEditorHtml(html);
  };
  const territoryAvailability = [
    { value: "pending", label: "Pending" },
    { value: "available", label: "Available" },
    { value: "alternate", label: "Alternate Territory" },
    { value: "not-available", label: "NOT Available" },
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <PageTransition>
      <div
        id="top-text"
        className="p-10  relative flex flex-col gap-2 justify-center items-center before:absolute before:content-[''] before:top-0 before:w-full before:h-full before:bg-custom-heading-color/60 md:min-h-[400px] before:z-10"
        style={{
          background: "url(/images/banners/inbox.jpg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="max-md:text-4xl md:text-7xl text-white z-20text-white font-bold text-center z-20">
          Inbox
        </h1>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col gap-5 max-md:my-10 md:my-20">
        <h2 className="text-custom-heading-color font-bold text-5xl text-center">
          Territory Check for Nick Hart & Smash My Trash sent by Harjeet Tiwana
        </h2>
        <div className="candidate-sub-childs">
          <h2 className="text-custom-heading-color font-bold text-xl capitalize">
            Territory Availability
          </h2>
          <select
            onChange={handleInputChange}
            id="Availability"
            className="candidate-input p-3"
            name="territoryavailability"
            defaultValue={userDetails?.territoryavailability}
          >
            {territoryAvailability.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="candidate-sub-childs">
          <h2 className="text-custom-heading-color font-bold text-xl capitalize">
            Write a message
          </h2>
          <div>
            <ReactQuill
              theme="snow" // pass 'snow' or 'bubble' for rich text editor theme
              value={editorHtml}
              onChange={handleChange}
              modules={modules}
            />
          </div>
        </div>

        <div className="flex justify-between gap-10 border-t-2 py-5">
          <div className="flex flex-col  items-start gap-2">
            <img
              src="https://ifbcreact.s3.us-east-1.amazonaws.com/images/accounts/harjeet.jpeg"
              className="rounded-full"
              width={80}
              height={80}
              alt="Logo"
            />
            <h2>
              Harjeet Tiwana <br />
              June 15, 2024 at 10:01AM
            </h2>
          </div>
          <div className="flex flex-col w-full gap-5">
            <h2 className="text-custom-heading-color font-bold text-xl">
              Territory Check
            </h2>

            <div className="overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left text-blue-100 ">
                <thead className="text-xs text-white uppercase bg-blue-600 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Candidate Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nick Hart
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Territory
                    </th>
                    <td className="px-6 py-4">Fresno CA, 93711</td>
                  </tr>
                  <tr className="bg-blue-600 border-b border-blue-400">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Franchise
                    </th>
                    <td className="px-6 py-4">Smash My Trash</td>
                  </tr>
                  <tr className="bg-blue-500 border-b border-blue-400">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Franchise Email
                    </th>
                    <td className="px-6 py-4">
                      franchiseinquiry@smashmytrash.com
                    </td>
                  </tr>
                  <tr className="bg-blue-600 border-b border-blue-400">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Franchise Contact
                    </th>
                    <td className="px-6 py-4">David Curnich</td>
                  </tr>
                  <tr className="bg-blue-500 border-blue-40">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Broker Email
                    </th>
                    <td className="px-6 py-4">ht@ifbc.co</td>
                  </tr>

                  <tr className="bg-blue-600 border-b border-blue-400">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Broker Name
                    </th>
                    <td className="px-6 py-4">Harjeet Tiwana</td>
                  </tr>
                  <tr className="bg-blue-500 border-blue-40">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap "
                    >
                      Broker Company
                    </th>
                    <td className="px-6 py-4">IFBC.CO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Inbox;
