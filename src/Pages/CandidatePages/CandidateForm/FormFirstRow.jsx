import React from "react";

const FormFirstRow = ({
  handleInputChange,
  formErrors,
  formFields,
  candDetails,
  candNames,
  selectedDocId,
  setSelectedDocId,
  selectedDetails,
}) => {
  const relationships = ["Business Partner", "Spouse", "Family Member"];
  return (
    <div id="first-row" className={`${candDetails ? "" : ""} py-5 w-full`}>
      <h1 className="candidate-sub-heading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        Primary Candidate Information
      </h1>

      <div id="first-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label">First Name*</p>

          {candNames && candNames.length > 0 ? (
            <select
              name="firstName"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.firstName ? "red" : undefined,
              }}
              onChange={(e) => {
                setSelectedDocId(e.target.value);
              }}
            >
              {!selectedDocId && <option value="">Choose any Candidate</option>}
              {candNames &&
                candNames.map((cand) => (
                  <option key={cand.docId} value={cand.docId}>
                    {cand.name}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type="text"
              onChange={handleInputChange}
              name="firstName"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.firstName ? "red" : undefined,
              }}
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.firstName }
                  : { defaultValue: candDetails?.firstName }
                : { value: formFields?.firstName })}
            />
          )}

          {formErrors.firstName && formErrors.firstName === "invalid" && (
            <p className=" text-red-600 py-2 flex justify-between">
              Invalid username. It should be 3-16 characters long and can
              include letters, numbers, underscores, and spaces.
            </p>
          )}
        </div>
        <div className="candidate-sub-childs">
          <p className="candidate-label">Last Name*</p>
          <input
            onChange={handleInputChange}
            type="text"
            name="lastName"
            className="candidate-input w-full"
            style={{
              borderColor: formErrors.lastName ? "red" : undefined,
            }}
            required
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.lastName }
                : { defaultValue: candDetails?.lastName }
              : { value: formFields?.lastName })}
          />
          {formErrors.lastName && formErrors.lastName === "invalid" && (
            <p className=" text-red-600 py-2 flex justify-between">
              Invalid username. It should be 3-16 characters long and can
              include letters, numbers, underscores, and spaces.
            </p>
          )}
        </div>
      </div>
      <div id="second-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label">Phone Number*</p>

          <input
            type="tel"
            name="phone"
            className="candidate-input w-full"
            style={{
              borderColor: formErrors.phone ? "red" : undefined,
            }}
            onChange={handleInputChange}
            required
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.phone }
                : { defaultValue: candDetails?.phone }
              : { value: formFields?.phone })}
          />
          {formErrors.phone && formErrors.phone === "invalid" && (
            <p className=" text-red-600 py-2 flex justify-between">
              Invalid phone number. It should be 11 digits long.
            </p>
          )}
        </div>
        <div className="candidate-sub-childs">
          <p className="candidate-label">Email*</p>
          <input
            type="email"
            name="email"
            className="candidate-input w-full"
            style={{
              borderColor: formErrors.email ? "red" : undefined,
            }}
            required
            onChange={handleInputChange}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.email }
                : { defaultValue: candDetails?.email }
              : { value: formFields?.email })}
          />

          {formErrors.email && formErrors.email === "invalid" && (
            <p className=" text-red-600 py-2 flex justify-between">
              Invalid Email (john@example.com)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                />
              </svg>
            </p>
          )}
        </div>
      </div>

      <div id="first-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label">Candidate First Name</p>
          <input
            onChange={handleInputChange}
            type="text"
            name={`additionalFirstName`}
            className="candidate-input"
            style={{
              borderColor: formErrors?.additionalFirstName ? "red" : undefined,
            }}
            // defaultValue={contact ? contact.firstName : ""}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.additionalFirstName }
                : { defaultValue: candDetails?.additionalFirstName }
              : { value: formFields?.additionalFirstName })}
          />
        </div>
        <div className="candidate-sub-childs">
          <p className="candidate-label">Candidate Last Name</p>
          <input
            onChange={handleInputChange}
            type="text"
            name={`additionalLastName`}
            className="candidate-input"
            style={{
              borderColor: formErrors?.additionalLastName ? "red" : undefined,
            }}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.additionalLastName }
                : { defaultValue: candDetails?.additionalLastName }
              : { value: formFields?.additionalLastName })}
            // defaultValue={contact ? contact.lastName : ""}
          />
        </div>
      </div>
      <div id="second-sub-row" className="candidate-two-col">
        <div className="candidate-sub-childs">
          <p className="candidate-label">Candidate Phone Number</p>
          <input
            onChange={handleInputChange}
            type="tel"
            name={`additionalPhone`}
            className="candidate-input"
            style={{
              borderColor: formErrors?.additionalPhone ? "red" : undefined,
            }}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.additionalPhone }
                : { defaultValue: candDetails?.additionalPhone }
              : { value: formFields?.additionalPhone })}
            // defaultValue={contact ? contact.phone : ""}
          />
        </div>
        <div className="candidate-sub-childs">
          <p className="candidate-label">Candidate Email</p>
          <input
            onChange={handleInputChange}
            type="email"
            name={`additionalEmail`}
            className="candidate-input"
            style={{
              borderColor: formErrors?.additionalEmail ? "red" : undefined,
            }}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.additionalEmail }
                : { defaultValue: candDetails?.additionalEmail }
              : { value: formFields?.additionalEmail })}
            // defaultValue={contact ? contact.email : ""}
          />
        </div>
      </div>
      <div className="candidate-sub-childs">
        <p className="candidate-label">Relationship</p>
        <select
          onChange={handleInputChange}
          className="candidate-input w-full"
          style={{
            borderColor: formErrors?.additionalRelationship ? "red" : undefined,
          }}
          name={`additionalRelationship`}
        >
          <option value="">Select One</option>
          {relationships.map((relationship, idx) => (
            <option
              key={idx}
              value={relationship}
              selected={formFields?.additionalRelationship === relationship}
              // selected={
              //   contact ? contact.relationShip === relationship : false
              // }
            >
              {relationship}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormFirstRow;
